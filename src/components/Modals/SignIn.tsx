import Modal from '@/common/ui/Modal/Modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { signResolver, SignType } from '@/utils/resolver';
import useStore from '@/store/useStore';
import useTogglePassword from '@/hooks/UI/useTogglePassword';
import Image from 'next/image';
import { Social } from '@/utils/constants';
import Input from '../Input';

type Props = {
  signIn: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
  };
};

const SignIn = ({ signIn }: Props) => {
  const showPassword = useTogglePassword(false);
  const signin = useStore((state) => state.signin);
  useStore();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignType>({
    resolver: zodResolver(signResolver),
  });

  const handleLogin: SubmitHandler<SignType> = async ({ username, password }) => {
    try {
      await signin(username, password);
      reset();
      signIn.onClose();
    } catch (error: any) {
      toast.error('Wrong Password or email');
    }
  };
  return (
    <Modal
      open={signIn.isOpen}
      closeModal={signIn.onClose}
      title="Sign In"
      modalClasses="max-w-[540px] w-full"
    >
      <form onSubmit={handleSubmit(handleLogin)} className="gap-y-4 flex flex-col">
        <Input
          label="username"
          register={register}
          error={errors['username'] && errors['username'].message}
          name="username"
          placeholder="enter a username"
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
            'Sign In'
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

export default SignIn;
