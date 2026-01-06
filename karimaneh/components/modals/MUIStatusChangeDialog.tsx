'use client';
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface MUIStatusChangeDialogProps {
  open: boolean;
  memberName: string;
  currentStatus: 'active' | 'inactive';
  onConfirm: () => void;
  onClose: () => void;
}

export default function MUIStatusChangeDialog({
  open,
  memberName,
  currentStatus,
  onConfirm,
  onClose,
}: MUIStatusChangeDialogProps) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<'active' | 'inactive'>('active');

  const handleConfirm = () => {
    const nextStatus = currentStatus === 'active' ? 'inactive' : 'active';
    setNewStatus(nextStatus);
    onConfirm();
    onClose();
    setTimeout(() => {
      setSnackbarOpen(true);
    }, 100);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const isActivating = currentStatus === 'inactive';
  const dialogMessage = isActivating
    ? `آیا از فعال‌سازی "${memberName}" اطمینان دارید؟`
    : `آیا از غیرفعال‌کردن "${memberName}" اطمینان دارید؟`;

  const snackbarMessage = newStatus === 'active'
    ? `کاربر "${memberName}" با موفقیت فعال شد`
    : `کاربر "${memberName}" با موفقیت غیرفعال شد`;

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            fontFamily: 'vazir',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: 'vazir',
            fontWeight: 'bold',
            fontSize: '1.25rem',
            textAlign: 'right',
            direction: 'rtl',
          }}
        >
          تایید تغییر وضعیت
        </DialogTitle>

        <DialogContent
          sx={{
            fontFamily: 'vazir',
            textAlign: 'right',
            direction: 'rtl',
            padding: '20px',
          }}
        >
          <p>{dialogMessage}</p>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: 'flex-end',
            direction: 'rtl',
            padding: '16px',
            gap: 1,
          }}
        >
          <Button
            onClick={handleConfirm}
            variant="contained"
            color={isActivating ? 'success' : 'error'}
            sx={{
              fontFamily: 'vazir',
              fontWeight: 'bold',
              minWidth: '100px',
            }}
          >
            تایید
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={newStatus === 'active' ? 'success' : 'warning'}
          variant="filled"
          sx={{
            fontFamily: 'vazir',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            direction: 'rtl',
            minWidth: '300px',
            backgroundColor: newStatus === 'active' ? '#10b981' : '#f59e0b',
          }}
          action={
            <IconButton
              size="small"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
