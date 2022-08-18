import useToggleModal from '@/hooks/UI/useToggleModal';
import useStore from '@/store/useStore';
import { Popover } from '@headlessui/react';
import { MenuIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import { SignIn, SignUp } from '@/components/Modals';

import MobileNav from './MobileNav';

export const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
];
const Nav = () => {
  const loginModal = useToggleModal();
  const signUpModal = useToggleModal();
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const logOut = useStore((state) => state.signOut);
  useStore();
  return (
    <Popover as="header" className="relative">
      <div className="bg-transparent py-4">
        <nav
          className="relative max-w-full mx-auto flex items-center justify-between px-4 sm:px-6"
          aria-label="Global"
        >
          <div className="flex items-center flex-1">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link href="/">
                <a>
                  <span className="sr-only">CASINO</span>
                  <Image
                    className="h-8 w-auto sm:h-10"
                    src="/images/logo.svg"
                    width={32}
                    height={32}
                    alt="nav"
                  />
                </a>
              </Link>
              <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="hidden space-x-8 md:flex md:ml-10">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-white hover:text-gray-400"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            <button
              onClick={() => {
                if (isLoggedIn) {
                  logOut();
                } else {
                  loginModal.onToggle();
                }
              }}
              type="button"
              className="text-base font-medium text-white hover:text-gray-300"
            >
              {isLoggedIn ? 'Log-out' : 'Log-in'}
            </button>
            {!isLoggedIn && (
              <button
                onClick={() => signUpModal.onToggle()}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
              >
                Sign Up
              </button>
            )}
          </div>
        </nav>
      </div>
      <MobileNav />
      <SignIn signIn={loginModal} />
      <SignUp signUp={signUpModal} />
    </Popover>
  );
};

export default Nav;
