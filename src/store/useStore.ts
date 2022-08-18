import create from 'zustand';
import { CreateUserSlice, UserSlice } from './slices/User';

const useStore = create<UserSlice>()((...a) => ({
  ...CreateUserSlice(...a),
}));

export default useStore;
