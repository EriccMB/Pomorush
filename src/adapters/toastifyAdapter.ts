import { toast } from 'react-toastify';
import { Dialog } from '../components/Dialog';

export const toastifyAdapter = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  info: (message: string) => toast.info(message),
  warning: (message: string) => toast.warning(message),
  dismiss: () => toast.dismiss(),
  confirm: (data: string, onClosing: (confirmation: boolean) => void) =>
    toast(Dialog, {
      data,
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
      onClose: confirmation => {
        if (confirmation) return onClosing(true);
        return onClosing(false);
      },
    }),
};
