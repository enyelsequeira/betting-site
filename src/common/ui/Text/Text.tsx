import React, { forwardRef } from 'react';
import { ctl } from '../../../helpers';

import { PolymorphicPropsWithoutRef, PolymorphicRef } from '../../types';
import Styles from './Text.module.css';

export interface TextOwnProps {
  size?: 'xs' | 'sm' | 'default' | 'leading' | 'lg' | 'xl' | 'xxl' | '3xl';
  spacing?: 'tight' | 'default' | 'wide' | 'wider' | 'widest';
  variant?:
    | 'default'
    | 'primary'
    | 'accent'
    | 'danger'
    | 'black'
    | 'shaded'
    | '30'
    | '50';
  resetStyles?: boolean;
  strong?: boolean;
}

const DEFAULT_TAG = 'p';

const Text = forwardRef(
  <C extends React.ElementType = typeof DEFAULT_TAG>(
    {
      as,
      size = 'default',
      spacing = 'default',
      variant = 'default',
      strong = false,
      resetStyles = false,
      className,
      ...otherProps
    }: PolymorphicPropsWithoutRef<TextOwnProps, C>,
    ref: PolymorphicRef<C>
  ) => {
    const Element = as ?? DEFAULT_TAG;

    let rootClasses: string;
    if (resetStyles && className) {
      rootClasses = className;
    } else {
      rootClasses = ctl(`
      ${variant && Styles[`BET-variant--${variant}`]}
      ${strong && 'font-bold'}
      ${className}
      ${resetStyles && 'text-white'}
    `);
    }

    return <Element ref={ref} className={rootClasses} {...otherProps} />;
  }
);

export default Text;
