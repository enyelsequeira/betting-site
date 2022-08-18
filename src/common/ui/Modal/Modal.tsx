import { Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/outline';
import Image from 'next/image';

interface Props {
  title?: string;
  children: ReactNode;
  open: boolean;
  closeModal: any;

  modalClasses?: string;
  subtitleClass?: string;
}

const Modal = ({
  children,
  open,
  closeModal,
  title,
  modalClasses,
  subtitleClass,
}: Props) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        static
        as="div"
        className="fixed z-30 inset-0 overflow-y-auto "
        onClose={() => null}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/80 bg-opacity-100 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={`inline-block bg-[#212130] rounded-m-round px-3 md:px-[36px] py-[30px] text-left  shadow-xl transform transition-all align-middle ${modalClasses}`}
            >
              <div
                className={`flex justify-between items-center mb-[30px] ${subtitleClass}`}
              >
                <Dialog.Title className="font-bold text-3xl  flex gap-x-2 text-white">
                  <div className="mx-auto h-10 w-auto">
                    <Image src="/images/logo.svg" alt="logo" width={40} height={40} />
                  </div>

                  {title || ''}
                </Dialog.Title>
                <XCircleIcon
                  width="24"
                  height="24"
                  className="cursor-pointer fill-white"
                  onClick={closeModal}
                />
              </div>

              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
