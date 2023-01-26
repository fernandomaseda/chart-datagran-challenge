import { FC, ReactNode } from 'react';
import clsx from 'clsx';

export interface GeneralLayoutProps {
  children: ReactNode;
  className?: string;
}

export const GeneralLayout: FC<GeneralLayoutProps> = ({ children, className }) => {
  return (
    <main
      id="content"
      role="main"
      className={clsx(
        'absolute w-[90%] h-[90%] md:w-[80%] md:max-w-[1200px] md:h-[80%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-card rounded-lg md:rounded-[5%] p-6 space-y-8 md:space-y-0 overflow-y-auto',
        className
      )}
    >
      {children}
    </main>
  );
};
