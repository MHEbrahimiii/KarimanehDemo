"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "motion/react";
import { useSidebar } from "./sidebar-context";
import Link from "next/link";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
}) => {
  const { open, animate } = useSidebar();

  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center group/sidebar py-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer",
        open ? "justify-start gap-3 px-3" : "justify-center px-0",
        className
      )}
      {...props}
    >
      {link.icon}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
          width: animate ? (open ? "auto" : "0") : "auto",
        }}
        className="text-white text-sm group-hover/sidebar:translate-x-[-4px] transition duration-150 whitespace-pre inline-block !p-0 !m-0 font-medium overflow-hidden"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};

export default SidebarLink;
