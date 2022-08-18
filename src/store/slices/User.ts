/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
import { StateCreator } from 'zustand';

export interface User {
  username: string;
  balance: number;
  birthday: Date;
  password?: string;
}

export interface UserSlice {
  user: User | null;
  isLoggedIn: boolean;
  completeSignup(payload: {
    username: string;
    birthday: Date;
    password: string;
  }): Promise<void>;
  silentSignin(payload: {
    username: string;
    password: string;
    balance: number;
    birthday: Date;
  }): Promise<void>;
  signin(username: string, password: string): Promise<void>;
  signOut(): void;
  decreaseUserBalance(amount: number): void;
  increaseUserBalance(amount: number): void;
}

export const CreateUserSlice: StateCreator<UserSlice> = (set) => ({
  isLoggedIn: false,
  user: null,
  decreaseUserBalance(amount: number) {
    const user = JSON.parse(localStorage.getItem('user_casino') as string);
    if (!user) {
      return;
    }
    user.balance -= amount;
    localStorage.setItem('user_casino', JSON.stringify(user));
    set({ user });
  },
  increaseUserBalance(amount: number) {
    const user = JSON.parse(localStorage.getItem('user_casino') as string);
    if (!user) {
      return;
    }
    user.balance += amount;
    localStorage.setItem('user_casino', JSON.stringify(user));
    set({ user });
  },
  signOut() {
    localStorage.removeItem('user_casino');
    set(() => ({
      isLoggedIn: false,
      user: null,
    }));
  },
  signin: async (username: string, password: string) => {
    const user = JSON.parse(localStorage?.getItem('user_casino') as string);
    if (user.username === username && user.password === password) {
      set((state) => ({
        ...state,
        isLoggedIn: true,
        user: {
          username: user.username,
          balance: user.balance,
          birthday: user.birthday,
          password: user.password,
        },
      }));
    } else {
      throw new Error('Invalid username or password');
    }
  },
  silentSignin: async (payload: {
    username: string;
    password: string;
    balance: number;
    birthday: Date;
  }) => {
    set((state) => ({
      ...state,
      isLoggedIn: true,
      user: {
        username: payload.username,
        password: payload.password,
        balance: payload.balance,
        birthday: payload.birthday,
      },
    }));
  },

  completeSignup: async (payload: {
    username: string;
    birthday: Date;
    password: string;
  }) => {
    localStorage.setItem(
      'user_casino',
      JSON.stringify({
        username: payload.username,
        birthday: payload.birthday,
        password: payload.password,
        balance: 100,
      })
    );
    set((state) => ({
      ...state,
      user: {
        username: payload.username,
        balance: 100,
        birthday: payload.birthday,
        password: payload.password,
      },
    }));
  },
});
