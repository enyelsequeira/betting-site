import { useCallback, useState } from 'react';

export type DisclosureOptions = {
  /**
   * @default false
   */
  defaultIsOpen?: boolean;
};

const DEFAULT_OPTIONS: DisclosureOptions = {
  defaultIsOpen: false,
};

/**
 * this provides a method to control the state of a `toggle` component
 * and its current toggle state
 *
 * @param options { DisclosureOptions } - custom Options
 * @returns `{isOpen, onOpen, onClose, onToggle }`
 */

function useToggleModal(options: DisclosureOptions = DEFAULT_OPTIONS) {
  const [isOpenState, setIsOpen] = useState(options.defaultIsOpen);

  const onClose = useCallback(() => setIsOpen(false), []);
  const onOpen = useCallback(() => setIsOpen(true), []);
  const onToggle = useCallback(() => {
    const action = isOpenState ? onClose : onOpen;

    action();
  }, [isOpenState, onClose, onOpen]);

  return { isOpen: !!isOpenState, onOpen, onClose, onToggle };
}
export default useToggleModal;
