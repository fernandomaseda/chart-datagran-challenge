import React, { FC, useState, useCallback, ChangeEvent, ReactNode } from 'react';
import clsx from 'clsx';
import { inputClassName, labelClassName } from './constants';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import { useUpdateEffect } from 'usehooks-ts';
export interface TextAreaProps
  extends React.TextareaHTMLAttributes<Omit<HTMLTextAreaElement, 'onChange'>> {
  className?: string;
  classNameMessage?: string;
  validityFn?: () => string;
  label?: ReactNode;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  forcedErrorMessage?: string;
  requiredErrorMessage?: string;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

export const TextArea: FC<TextAreaProps> = ({
  label = '',
  className = '',
  classNameMessage = '',
  validityFn,
  onChange,
  value,
  forcedErrorMessage,
  requiredErrorMessage,
  required = false,
  resize = 'both',
  ...props
}) => {
  const [invalidMessage, setInvalidMessage] = useState<string>('');
  const [hasTypedAndValid, setHasTypedAndValid] = useState(false);

  const doubleInvalidMessage = forcedErrorMessage || invalidMessage;

  useUpdateEffect(() => {
    const customValid = validityFn ? validityFn() === '' : true;
    const valid = customValid && String(value).trim();
    if (valid) {
      // clean error message when is typing and valid
      return setInvalidMessage('');
      return setHasTypedAndValid(true);
    }
    return setHasTypedAndValid(false);
  }, [value]);

  const handleValidityLocal = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    if (!String(value).trim() && required) {
      // validaty for required
      return setInvalidMessage(
        requiredErrorMessage ||
          `Please enter a ${typeof label === 'string' && label?.toLowerCase()}.`
      );
    }
    if (validityFn) {
      return setInvalidMessage(validityFn()); // validaty for custom function
    }
  };

  return (
    <div className={clsx('flex flex-col w-full md:max-w-[400px]', className)}>
      {label && (
        <label
          id={props.id + '-label'}
          htmlFor={props.id}
          className={clsx(labelClassName, doubleInvalidMessage && '!text-label-error !font-bold')}
        >
          {label}
        </label>
      )}
      <div className="relative flex flex-row items-center w-full">
        <textarea
          value={value}
          className={clsx(
            inputClassName,
            'min-h-[145px] h-auto !overflow-y-auto',
            { 'resize-none': resize === 'none' },
            { 'resize-y': resize === 'vertical' },
            { 'resize-x': resize === 'horizontal' },
            { resize: resize === 'both' },
            'hover:border-primary-purple-1',
            'focus:border-2 focus:border-primary-purple-1 focus:pl-[15px]', // focus
            {
              '!bg-tertiary-extra-light-red !border-1 !border-tertiary-red focus:!bg-white focus:!border-2':
                doubleInvalidMessage,
            } // error
          )}
          onChange={(e) => {
            onChange(e);
          }}
          onBlur={handleValidityLocal}
          required={required}
          {...props}
        />
      </div>
      {doubleInvalidMessage ? (
        <div className="relative flex flex-row items-center w-full mt-2 space-x-[4px]">
          <ErrorRoundedIcon className="w-4 h-4 !fill-tertiary-red" />
          <span
            className={clsx(
              'text-[14px] leading-[18px] font-medium text-label-error',
              classNameMessage
            )}
          >
            {doubleInvalidMessage}
          </span>
        </div>
      ) : null}
    </div>
  );
};
