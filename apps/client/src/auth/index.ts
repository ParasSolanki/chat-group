import { create } from 'zustand';

type AuthStore = {
  loggedIn: boolean;
  user: null | {
    firstName: string;
  };
  login: (name: string) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  loggedIn: false,
  user: null,
  login: (name: string) => set(() => ({ loggedIn: true, user: { firstName: name } })),
}));
