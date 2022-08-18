import Modal from '@/common/ui/Modal/Modal';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Text from '@/common/ui/Text/Text';
import useStore from '@/store/useStore';
import useTogglePassword from '@/hooks/UI/useTogglePassword';
import { signUpResolver, SignUpType } from '@/utils/resolver';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Social } from '@/utils/constants';
import Input from '../Input';

type Props = {
  signUp: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
  };
};

const SignUp = ({ signUp }: Props) => {
  const showPassword = useTogglePassword(false);
  const showRepeatpassword = useTogglePassword(false);

  const signUpFn = useStore((state) => state.completeSignup);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpResolver),
  });

  const handleSignup: SubmitHandler<SignUpType> = async ({
    birthday,
    password,
    username,
  }) => {
    try {
      signUpFn({
        username,
        birthday,
        password,
      });
      reset();
      signUp.onClose();
      toast.success('Signup Successful');
    } catch (error) {
      toast.error('Signup Failed');
    }
  };

  return (
    <Modal
      open={signUp.isOpen}
      closeModal={signUp.onClose}
      title="Sign Up"
      modalClasses="max-w-[540px] w-full"
    >
      <form onSubmit={handleSubmit(handleSignup)} className="gap-y-4 flex flex-col">
        <Input
          label="username"
          register={register}
          error={errors['username'] && errors['username'].message}
          name="username"
          placeholder="enter an username"
          type="text"
        />
        <Input
          isPassword
          showPassword={showPassword.togglePassword}
          label="password"
          register={register}
          error={errors['password'] && errors['password'].message}
          name="password"
          placeholder="enter a password"
          type={showPassword.isPasswordVisible ? 'text' : 'password'}
        />
        <Input
          isPassword
          showPassword={showRepeatpassword.togglePassword}
          label="repeatPassword"
          register={register}
          error={errors['repeatPassword'] && errors['repeatPassword'].message}
          name="repeatPassword"
          placeholder="Repeat password"
          type={showRepeatpassword.isPasswordVisible ? 'text' : 'password'}
        />
        <Controller
          control={control}
          name="birthday"
          render={({ field }) => (
            <>
              <div className=" flex flex-col md:flex-row w-full justify-between items-center">
                <label
                  className="block text-base font-medium text-white capitalize"
                  htmlFor="birthday"
                >
                  Birthday
                </label>
                <div className="w-full md:w-[300px] md:min-w-[300px] flex flex-col">
                  <DatePicker
                    className="border-l-2 border-white rounded text-sm  outline-none  focus:ring-0 bg-transparent  w-[300px] text-white"
                    onChange={(e) => field.onChange(e)}
                    selected={field.value}
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date()}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    isClearable
                    placeholderText="Select a date"
                    dropdownMode="select"
                  />
                  <Text as="p" className="!text-red-400">
                    {errors['birthday']?.message}
                  </Text>
                </div>
              </div>
            </>
          )}
        />
        {/* COULD BE COMBINED IN OWN COMPONENT WITH THE OTHER ONE, is it worth it, will it be used in more places?  */}
        <button
          type="submit"
          className="bg-slate-800 text-white uppercase w-fit px-16 py-2 flex mx-auto rounded-sm my-5"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 animate-spin ">
              <Image src="/images/loader.svg" width={24} height={24} />
            </div>
          ) : (
            'Sign UP'
          )}
        </button>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {Social.map((link) => {
              return (
                <div
                  key={link.name}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  {link.icon}
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SignUp;
