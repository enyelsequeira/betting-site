import { useState } from 'react';

const useTogglePassword = (initialValue: boolean) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(initialValue);
  const togglePassword = () => setIsPasswordVisible(!isPasswordVisible);
  return { isPasswordVisible, togglePassword };
};

export default useTogglePassword;
