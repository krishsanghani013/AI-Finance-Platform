"use client";

import { useRef, useState, useEffect } from "react";
import {
  Camera,
  Loader2,
  Sparkles,
  Upload,
  CheckCircle2,
  X,
  FileImage,
  ScanLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { scanReceipt } from "@/actions/transaction";

export function ReceiptScanner({ onScanComplete }) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [extractedSummary, setExtractedSummary] = useState(null);

  const {
    loading: scanReceiptLoading,
    fn: scanReceiptFn,
    data: scannedData,
  } = useFetch(scanReceipt);

  const lastScannedRef = useRef(null);

  const handleReceiptScan = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, JPEG, WEBP)", {
        id: "receipt-invalid-type-toast",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB", {
        id: "receipt-size-limit-toast",
      });
      return;
    }

    lastScannedRef.current = null;
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setExtractedSummary(null);

    await scanReceiptFn(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleReceiptScan(e.dataTransfer.files[0]);
    }
  };

  const handleClear = () => {
    lastScannedRef.current = null;
    setPreviewUrl(null);
    setExtractedSummary(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (scannedData && !scanReceiptLoading && lastScannedRef.current !== scannedData) {
      lastScannedRef.current = scannedData;
      onScanComplete(scannedData);
      setExtractedSummary({
        amount: scannedData.amount,
        merchantName: scannedData.merchantName,
        category: scannedData.category,
      });
      toast.success("Receipt Analyzed Successfully", {
        id: "receipt-scan-success-toast",
        description: scannedData.merchantName
          ? `Auto-filled details for ${scannedData.merchantName}`
          : "Amount, date, and category have been populated in your form.",
        duration: 4000,
      });
    }
  }, [scanReceiptLoading, scannedData, onScanComplete]);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#12151F]/90 p-4 sm:p-5 backdrop-blur-xl shadow-xl transition-all relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleReceiptScan(file);
        }}
      />

      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-950/40">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
              AI Receipt Scanner
              <span className="text-[10px] font-medium uppercase tracking-wider text-orange-400 bg-orange-500/10 border border-orange-500/20 px-1.5 py-0.5 rounded-full">
                Gemini AI
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Drop your receipt image or bill to auto-extract amount, date & category
            </p>
          </div>
        </div>

        {previewUrl && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="h-7 px-2 text-xs text-slate-400 hover:text-white hover:bg-white/[0.08] rounded-lg"
          >
            <X className="h-3.5 w-3.5 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Dropzone / Preview Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => {
          if (!scanReceiptLoading && !previewUrl) {
            fileInputRef.current?.click();
          }
        }}
        className={`relative border-2 border-dashed rounded-xl transition-all duration-200 overflow-hidden ${
          dragActive
            ? "border-orange-500 bg-orange-500/10 scale-[0.99]"
            : "border-white/[0.12] bg-[#0A0C13]/60 hover:border-orange-500/40 hover:bg-[#0E111B]"
        } ${!previewUrl ? "cursor-pointer p-4 sm:p-6 text-center" : "p-3"}`}
      >
        {!previewUrl ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="h-11 w-11 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
              <Camera className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200">
                Click to browse or drag and drop receipt
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Supports JPG, PNG, WEBP up to 5MB
              </p>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/[0.06]">
                <FileImage className="h-3 w-3 text-orange-400" /> Auto-crop & parse
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/[0.06]">
                <ScanLine className="h-3 w-3 text-amber-400" /> Instant fill
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Image Thumbnail with Scanning Laser Animation */}
            <div className="relative h-28 w-28 sm:h-24 sm:w-24 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 bg-black/40">
              <img
                src={previewUrl}
                alt="Receipt preview"
                className="h-full w-full object-cover"
              />
              {scanReceiptLoading && (
                <div className="absolute inset-0 bg-orange-950/40 backdrop-blur-[1px] flex flex-col items-center justify-center">
                  {/* Glowing Laser Scan Bar */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 shadow-[0_0_12px_#f97316] animate-bounce" />
                  <Loader2 className="h-6 w-6 text-orange-400 animate-spin" />
                </div>
              )}
            </div>

            {/* Status & Feedback */}
            <div className="flex-1 w-full text-center sm:text-left">
              {scanReceiptLoading ? (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-sm font-semibold text-orange-400">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Analyzing receipt with Gemini Vision...</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Detecting total amount, transaction date, merchant & category...
                  </p>
                </div>
              ) : extractedSummary ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg w-fit mx-auto sm:mx-0">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Extracted & Applied to form</span>
                  </div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-slate-300">
                    {extractedSummary.amount && (
                      <span className="bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded-md font-mono font-medium text-white">
                        ${extractedSummary.amount.toFixed(2)}
                      </span>
                    )}
                    {extractedSummary.merchantName && (
                      <span className="bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded-md">
                        {extractedSummary.merchantName}
                      </span>
                    )}
                    {extractedSummary.category && (
                      <span className="bg-orange-500/10 border border-orange-500/20 text-orange-300 px-2 py-0.5 rounded-md capitalize">
                        {extractedSummary.category}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs text-orange-400 hover:text-orange-300 hover:underline cursor-pointer"
                  >
                    Scan another receipt
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-xs text-slate-300">Image selected</p>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-7 text-xs bg-white/[0.08] hover:bg-white/[0.12] text-white"
                  >
                    Change image
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReceiptScanner;