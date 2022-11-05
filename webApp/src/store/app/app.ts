import create from 'zustand';
import type { AppStore, Notification } from './app.types';
import { AxiosError } from 'axios';

const useApp = create<AppStore>((set) => ({
  notification: null,
  setNotification: (notification) => set({ notification }),

  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),

  handleErrors: (error) => {
    set({ isLoading: false });

    const notificationObject = (message: string): Notification => {
      return {
        message,
        options: {
          variant: 'error',
        },
      };
    };

    if (error instanceof AxiosError) {
      if (error.response?.data?.error) {
        set((state) => ({
          ...state,
          notification: notificationObject(error.response?.data.error),
        }));
      } else {
        set((state) => ({
          ...state,
          notification: notificationObject(error.message),
        }));
      }
    } else {
      set((state) => ({
        ...state,
        notification: notificationObject('Ocorreu um erro inesperado'),
      }));
    }
  },
}));

export { useApp };
