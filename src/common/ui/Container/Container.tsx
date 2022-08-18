import {
  ComponentPropsWithRef,
  ComponentType,
  forwardRef,
  HTMLAttributes,
  JSXElementConstructor,
} from 'react';
import { ctl } from '../../../helpers';

export interface IContainer extends ComponentPropsWithRef<'div'> {
  as?: string | JSXElementConstructor<any>;
  component?: string | JSXElementConstructor<any>;
  maxW?: boolean;
  wrapper?: boolean;
}

const Container = forwardRef<HTMLDivElement, IContainer>((props, ref): JSX.Element => {
  const {
    as,
    component = 'div',
    className,
    children,

    maxW,
    wrapper = false,
    ...rest
  } = props;

  const Element = (as || component) as ComponentType<HTMLAttributes<HTMLDivElement>>;

  const rootClass = ctl(`
    ${maxW && 'w-full'}
    ${wrapper && ' w-full mx-auto'}
    ${className}
   `);

  return (
    <Element ref={ref} className={rootClass} {...rest}>
      {children}
    </Element>
  );
});

export default Container;
