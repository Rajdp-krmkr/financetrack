"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Home, PiggyBank, Receipt, Target } from "lucide-react";
import { cn } from "@/lib/utils";

// Navigation items with corresponding icons and links
const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Transactions", href: "/transactions", icon: Receipt },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Dashboard", href: "/dashboard", icon: PiggyBank },
  { name: "Budget", href: "/budget", icon: Target },
];

export default function Navbar() {
  const pathname = usePathname(); // Get current route path
  const [userName, setUserName] = useState("");

  // Retrieve username from local storage on component mount
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Branding */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <PiggyBank className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">FinanceTrack</span>
            </Link>
          </div>

          {/* Navigation Links - Visible on larger screens */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "inline-flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground" // Active link styling
                        : "hover:bg-muted" // Hover effect for inactive links
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Display username if available */}
          {userName && (
            <div className="text-sm font-medium">Welcome, {userName}</div>
          )}
        </div>
      </div>
    </nav>
  );
}
