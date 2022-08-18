import Text from '@/common/ui/Text/Text';
import { EyeIcon } from '@heroicons/react/outline';

type Props = {
  label: string;
  register: any;
  error: any;
  isPassword?: boolean;
  name: string;
  placeholder?: string;
  type: 'text' | 'email' | 'password' | 'date';
  value?: string;

  showPassword?: () => void;
};

const Input = ({
  error,
  label,
  name,
  register,
  type,
  isPassword,
  placeholder,
  showPassword,
  value,
  ...restProps
}: Props) => {
  return (
    <div className="flex flex-col md:flex-row w-full justify-between items-center">
      <label
        htmlFor="email"
        className="block text-base font-medium text-white capitalize"
      >
        {label}
      </label>
      <div className="w-full md:w-[300px] md:min-w-[300px]">
        <div className="flex border-red-100 w-full border-l-2 border gap-x-2 bg-transparent">
          <input
            name={name}
            autoComplete="email"
            className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm bg-transparent border-none outline-none ring-0 focus:ring-0 text-white placeholder:capitalize"
            value={value}
            id={name}
            placeholder={placeholder}
            type={type}
            {...register(label)}
            {...restProps}
          />
          {isPassword && (
            <button type="button" className="w-4 text-white mr-2" onClick={showPassword}>
              <EyeIcon />
            </button>
          )}
        </div>
        <Text as="p" className="!text-red-400">
          {error}
        </Text>
      </div>
    </div>
  );
};
export default Input;
