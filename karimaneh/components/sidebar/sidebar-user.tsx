"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./sidebar-context";
import { useAuth } from "@/context/auth-context";
import { IconLogout } from "@tabler/icons-react";
import React from "react";

export const SidebarUser = ({
  name,
  role,
  avatar,
  onLogout,
}: {
  name: string;
  role: string;
  avatar?: React.ReactNode;
  onLogout?: () => void;
}) => {
  const { open, animate } = useSidebar();
  const { logout } = useAuth();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      logout();
    }
  };

  return (
    <motion.div
      className={cn(
        "py-4 border-t border-white/10",
        open ? "px-3" : "px-0"
      )}
      animate={{
        paddingLeft: animate ? (open ? "0.75rem" : "0") : "0.75rem",
        paddingRight: animate ? (open ? "0.75rem" : "0") : "0.75rem",
      }}
    >
      <div className={cn(
        "flex items-center",
        open ? "justify-start gap-3" : "justify-center"
      )}>
        {avatar && (
          <motion.div
            animate={{
              opacity: animate ? (open ? 1 : 1) : 1,
            }}
            className="flex-shrink-0"
          >
            {avatar}
          </motion.div>
        )}
        <motion.div
          animate={{
            display: animate ? (open ? "flex" : "none") : "flex",
            opacity: animate ? (open ? 1 : 0) : 1,
            width: animate ? (open ? "auto" : "0") : "auto",
          }}
          className="flex flex-col flex-1 min-w-0 overflow-hidden"
        >
          <span className="text-white text-sm font-medium truncate">{name}</span>
          <span className="text-white/70 text-xs truncate">{role}</span>
        </motion.div>
        <motion.button
          animate={{
            display: animate ? (open ? "inline-flex" : "none") : "inline-flex",
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          onClick={handleLogout}
          className="text-white/70 hover:text-white transition-colors p-1 flex-shrink-0"
          aria-label="خروج"
        >
          <IconLogout className="h-5 w-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SidebarUser;
