import { create } from 'zustand';

interface ErrorState {
  message: string;
  alertIsOpen: boolean;
  alertType: 'success' | 'error';

  setMessage: (message: string) => void;
  setAlert: (alertIsOpen: boolean) => void;
  setAlertType: (alertType: 'success' | 'error') => void;
}

export const useErrorStore = create<ErrorState>()(
  (set) => ({
    message: "",
    alertIsOpen: false,
    alertType: 'success',

    setMessage: (message: string) => set({
      message,
    }),

    setAlert: (alertIsOpen: boolean) => set({
      alertIsOpen
    }),

    setAlertType: (alertType: 'success' | 'error') => set({
      alertType
    }),
  }),
);
