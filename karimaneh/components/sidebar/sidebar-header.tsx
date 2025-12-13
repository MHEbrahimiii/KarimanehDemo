"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./sidebar-context";
import React from "react";

export const SidebarHeader = ({
  logo,
  title,
}: {
  logo?: React.ReactNode;
  title: string;
}) => {
  const { open, animate } = useSidebar();

  return (
    <motion.div
      className={cn(
        "flex items-center border-b border-white/10 py-6",
        open ? "justify-start gap-3 px-3" : "justify-center px-0"
      )}
      animate={{
        justifyContent: animate ? (open ? "flex-start" : "center") : "flex-start",
      }}
    >
      {logo && (
        <motion.div
          animate={{
            opacity: animate ? (open ? 1 : 1) : 1,
          }}
          className="flex-shrink-0"
        >
          {logo}
        </motion.div>
      )}
      <motion.h2
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
          width: animate ? (open ? "auto" : "0") : "auto",
        }}
        className="text-white text-base font-bold whitespace-pre leading-tight overflow-hidden"
      >
        {title}
      </motion.h2>
    </motion.div>
  );
};

export default SidebarHeader;
