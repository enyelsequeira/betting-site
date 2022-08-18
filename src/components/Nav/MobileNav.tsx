import { Popover, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { Fragment } from 'react';
import { navigation } from '.';

const MobileNav = () => {
  return (
    <Transition
      as={Fragment}
      enter="duration-150 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Popover.Panel
        focus
        className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top md:hidden"
      >
        <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="px-5 pt-4 flex items-center justify-between">
            <div>
              <Image
                className="h-8 w-auto sm:h-10"
                src="/images/logo.svg"
                width={32}
                height={32}
                alt="nav"
              />
            </div>
            <div className="-mr-2">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                <span className="sr-only">Close menu</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
          </div>
          <div className="pt-5 pb-6">
            <div className="px-2 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="mt-6 px-5">
              <button
                type="button"
                className="block text-center w-full py-3 px-4 rounded-md shadow bg-indigo-600 text-white font-medium hover:bg-indigo-700"
              >
                Start free trial
              </button>
            </div>
            <div className="mt-6 px-5">
              <p className="text-center text-base font-medium text-gray-500">
                Existing customer?{' '}
                <button type="button" className="text-gray-900 hover:underline">
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  );
};

export default MobileNav;
