import * as React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as: 'primary' | 'secondary';
  size?: 'medium' | 'full';
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  as,
  size,
  children,
  disabled,
  className = '',
  ...props
}) => {
  const getButtonClassNames = () => {
    const classNameSize = {
      medium: 'min-w-[141px] h-[52px]',
      full: 'w-full h-[52px]',
      tile: 'min-w-[120px] h-[120px]',
    };

    const focusOutline =
      'focus:outline-2 focus:outline focus:outline-primary-purple-1 focus:outline-offset-2';

    const shadowOutlineTransition = 'transition-[shadow, outline] duration-300 ease-in-out';

    switch (as) {
      case 'primary':
        return clsx(
          ' text-center font-semibold text-tertiary-light-gray bg-primary-purple-gradient rounded-sm px-[40px] border-none',
          'hover:shadow-bt active:shadow-none disabled:opacity-50 disabled:!cursor-not-allowed',
          focusOutline,
          shadowOutlineTransition,
          classNameSize[size ?? 'medium']
        );
      case 'secondary':
        return clsx(
          'text-center font-semibold text-primary-purple-1 bg-white rounded-sm px-[40px] border-1 border-solid border-primary-purple-1',
          'hover:shadow-bt active:shadow-none disabled:opacity-50 disabled:!cursor-not-allowed',
          focusOutline,
          shadowOutlineTransition,
          classNameSize[size ?? 'medium']
        );
      default:
        return '';
    }
  };

  return (
    <button className={clsx(getButtonClassNames(), className)} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
