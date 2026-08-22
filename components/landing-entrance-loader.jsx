"use client";

import React, { useEffect, useState } from "react";
import { FlowoidLoader } from "./flowoid-loader";

export function LandingEntranceLoader() {
  const [loading, setLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Show cinematic floating cash loader for 2.4s, then fade out smoothly
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2400);

    // Remove from DOM after transition completes
    const unmountTimer = setTimeout(() => {
      setShouldRender(false);
    }, 3100);

    return () => {
      clearTimeout(timer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 w-screen h-screen min-h-screen z-[99999] bg-[#07080D] transition-opacity duration-700 ease-out overflow-hidden ${
        loading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <FlowoidLoader text="Initializing Flowoid AI Finance Engine..." fullScreen />
    </div>
  );
}

export default LandingEntranceLoader;
