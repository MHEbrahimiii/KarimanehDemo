'use client';

import { AnimatePresence, motion } from 'framer-motion';

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({
  open,
  onClose,
  onConfirm,
}: LogoutModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          dir="rtl"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div className="mb-4 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-500 text-xl">
                ⎋
              </div>
            </div>

            {/* Title */}
            <h2 className="mb-2 text-center text-xl font-bold text-gray-800">
              خروج از حساب کاربری
            </h2>

            {/* Description */}
            <p className="mb-6 text-center text-gray-500">
              آیا از خروج از حساب کاربری اطمینان دارید؟
            </p>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={onConfirm}
                className="flex-1 rounded-xl bg-red-500 py-3 text-white hover:bg-red-600 transition"
              >
                خروج
              </button>

              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-gray-300 py-3 text-gray-700 hover:bg-gray-100 transition"
              >
                انصراف
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
