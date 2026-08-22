"use client";

import React from "react";
import {
  Wallet,
  Laptop,
  TrendingUp,
  Building,
  Home,
  Plus,
  Car,
  ShoppingCart,
  Zap,
  Film,
  UtensilsCrossed,
  ShoppingBag,
  HeartPulse,
  GraduationCap,
  Smile,
  Plane,
  Shield,
  Gift,
  Receipt,
  MoreHorizontal,
  CircleDollarSign,
  Tag,
} from "lucide-react";

const ICON_MAP = {
  Wallet,
  Laptop,
  TrendingUp,
  Building,
  Home,
  Plus,
  Car,
  Shopping: ShoppingCart,
  ShoppingCart,
  Zap,
  Film,
  UtensilsCrossed,
  ShoppingBag,
  HeartPulse,
  GraduationCap,
  Smile,
  Plane,
  Shield,
  Gift,
  Receipt,
  MoreHorizontal,
  CircleDollarSign,
  Tag,
};

export function CategoryIcon({
  iconName,
  color = "#f97316",
  className = "h-4 w-4",
  size = "md",
  showBackground = true,
}) {
  const IconComponent = ICON_MAP[iconName] || Tag;

  const sizeClasses = {
    sm: "h-6 w-6 rounded-md text-xs",
    md: "h-8 w-8 rounded-lg text-sm",
    lg: "h-10 w-10 rounded-xl text-base",
  };

  if (!showBackground) {
    return <IconComponent className={className} style={{ color }} />;
  }

  return (
    <div
      className={`inline-flex items-center justify-center flex-shrink-0 transition-transform ${sizeClasses[size] || sizeClasses.md}`}
      style={{
        backgroundColor: `${color}20`,
        color: color,
        border: `1px solid ${color}40`,
      }}
    >
      <IconComponent className={className} style={{ color }} />
    </div>
  );
}

export default CategoryIcon;
