import {
  BarChart3,
  Receipt,
  PieChart,
  CreditCard,
  Globe,
  Zap,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Smartphone,
} from "lucide-react";

// Stats Data
export const statsData = [
  {
    value: "50K+",
    label: "Active Users Worldwide",
    change: "+24% this quarter",
  },
  {
    value: "$2B+",
    label: "Transactions Tracked",
    change: "Real-time sync",
  },
  {
    value: "99.9%",
    label: "AI Accuracy Rate",
    change: "Automated tagging",
  },
  {
    value: "4.9/5",
    label: "User Rating",
    change: "From 12,000+ reviews",
  },
];

// Features Data
export const featuresData = [
  {
    icon: <BarChart3 className="h-6 w-6 text-orange-400" />,
    title: "AI Spending Analytics",
    description:
      "Detect hidden leaks, predict future bills, and get real-time cash trajectory insights powered by Gemini AI.",
    badge: "Smart AI",
  },
  {
    icon: <Receipt className="h-6 w-6 text-amber-400" />,
    title: "Smart Receipt Scanner",
    description:
      "Instant optical parsing extracts merchant, line items, taxes, and automatically categories receipts in seconds.",
    badge: "Instant OCR",
  },
  {
    icon: <PieChart className="h-6 w-6 text-emerald-400" />,
    title: "Intelligent Budget Caps",
    description:
      "Set dynamic category allocations with live velocity tracking and instant overspend warning alerts.",
    badge: "Automated",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-cyan-400" />,
    title: "Multi-Account Ledger",
    description:
      "Connect multiple checking, savings, and card balances in a unified central command dashboard.",
    badge: "Unified",
  },
  {
    icon: <Globe className="h-6 w-6 text-purple-400" />,
    title: "Global Multi-Currency",
    description:
      "Seamlessly log international transactions with live exchange conversions and multi-wallet balance views.",
    badge: "Global",
  },
  {
    icon: <Zap className="h-6 w-6 text-rose-400" />,
    title: "Recurring Bills Detection",
    description:
      "Automated discovery of subscriptions and scheduled recurring charges so you never miss a payment deadline.",
    badge: "Proactive",
  },
];

// How It Works Data
export const howItWorksData = [
  {
    step: "01",
    icon: <CreditCard className="h-6 w-6 text-orange-400" />,
    title: "Create Your Account",
    description:
      "Sign up in 30 seconds with Clerk security and initialize your default checking or savings wallet.",
  },
  {
    step: "02",
    icon: <BarChart3 className="h-6 w-6 text-amber-400" />,
    title: "Log & Scan Transactions",
    description:
      "Add income, log expenses, or snap receipt photos for instant automated categorizations.",
  },
  {
    step: "03",
    icon: <Sparkles className="h-6 w-6 text-emerald-400" />,
    title: "Gain Cash Flow Mastery",
    description:
      "Watch your interactive cash flow area curves and category donut breakdowns evolve with every dollar.",
  },
];

// Testimonials Data
export const testimonialsData = [
  {
    name: "Sarah Johnson",
    role: "Tech Founder & Director",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    quote:
      "Flowoid completely replaced three separate budgeting tools for me. The dark aesthetic and instant cash flow curves give me complete peace of mind.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Senior Software Architect",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    quote:
      "The receipt OCR scanner and categorization speed are unbelievably fast. Cleanest finance UI I've used in years.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Private Financial Consultant",
    image: "https://randomuser.me/api/portraits/women/74.jpg",
    quote:
      "I recommend Flowoid to all my clients. The visual breakdown between income in green and expenses in red makes budget tracking effortless.",
    rating: 5,
  },
];