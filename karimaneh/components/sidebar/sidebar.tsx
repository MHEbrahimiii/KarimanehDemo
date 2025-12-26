'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { IconMenu2, IconX, IconLogout } from '@tabler/icons-react';
import { useAuth } from '@/context/auth-context';
import LogoutModal from '@/components/modals/LogoutModal';

/* ================= CONTEXT ================= */

interface SidebarContextProps {
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextProps | null>(null);

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error('useSidebar must be used inside SidebarProvider');
  }
  return ctx;
};

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const value = useMemo(
    () => ({ mobileOpen, setMobileOpen }),
    [mobileOpen]
  );

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};

/* ================= DESKTOP ================= */

export const DesktopSidebar = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <aside
      className={cn(
        'hidden md:flex md:flex-col h-screen w-[300px] shrink-0 bg-primary-100 border-l border-white/10',
        className
      )}
    >
      {children}
    </aside>
  );
};

/* ================= MOBILE ================= */

export const MobileSidebar = ({ children }: { children: React.ReactNode }) => {
  const { mobileOpen, setMobileOpen } = useSidebar();

  return (
    <div className="md:hidden">
      <div className="h-12 px-4 flex items-center justify-end bg-primary-100">
        <button
          type="button"
          aria-label="باز کردن منو"
          onClick={() => setMobileOpen(true)}
          className="text-white"
        >
          <IconMenu2 />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-primary-100 flex flex-col">
          <button
            type="button"
            aria-label="بستن منو"
            onClick={() => setMobileOpen(false)}
            className="absolute top-6 right-6 text-white"
          >
            <IconX />
          </button>

          <div className="p-8 flex-1 overflow-y-auto">{children}</div>
        </div>
      )}
    </div>
  );
};

/* ================= HEADER ================= */

export const SidebarHeader = ({
  logo,
  title,
}: {
  logo?: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="flex items-center gap-3 px-4 py-6 border-b border-white/10">
      {logo}
      <h2 className="text-white text-base font-bold">{title}</h2>
    </div>
  );
};

/* ================= LINKS ================= */

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  className?: string;
}

export const SidebarLink = ({
  href,
  icon,
  label,
  className,
}: SidebarLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors',
        className
      )}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

/* ================= USER + LOGOUT MODAL ================= */

interface SidebarUserProps {
  name: string;
  role: string;
  avatar?: React.ReactNode;
}

export const SidebarUser = ({
  name,
  role,
  avatar,
}: SidebarUserProps) => {
  const { logout } = useAuth();
  const { setMobileOpen } = useSidebar();
  const [open, setOpen] = useState(false);

  const handleConfirmLogout = () => {
    setOpen(false);
    setMobileOpen(false);
    logout();
  };

  return (
    <>
      <div className="mt-auto px-4 py-4 border-t border-white/10 flex items-center gap-3">
        {avatar}

        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium truncate">{name}</p>
          <p className="text-white/70 text-xs truncate">{role}</p>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="خروج"
          className="text-white/70 hover:text-white transition-colors"
        >
          <IconLogout className="w-5 h-5" />
        </button>
      </div>

      <LogoutModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default Sidebar;
