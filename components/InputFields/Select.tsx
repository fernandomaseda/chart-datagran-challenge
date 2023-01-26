import React, {
  FC,
  useState,
  ReactElement,
  useRef,
  useCallback,
  useMemo,
  MouseEventHandler,
  ReactNode,
} from 'react';
import clsx from 'clsx';
import { inputClassName, labelClassName } from './constants';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useOnClickOutside } from 'usehooks-ts';

export interface SelectItem {
  label?: string;
  value: string;
  icon?: ReactElement;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.InputHTMLAttributes<Omit<HTMLInputElement, 'onChange' | 'type'>>, 'onChange'> {
  className?: string;
  classNameMessage?: string;
  label?: ReactNode;
  onChange: (value: string) => void;
  forcedErrorMessage?: string;
  requiredErrorMessage?: string;
  options?: SelectItem[];
}

export const Select: FC<SelectProps> = ({
  options = [],
  label,
  className = '',
  classNameMessage = '',
  forcedErrorMessage,
  requiredErrorMessage,
  onChange,
  value,
  disabled,
  ...props
}) => {
  const [requiredMessage, setRequiredMessage] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const SelectRef = useRef<HTMLDivElement>(null);
  const doubleInvalidMessage = forcedErrorMessage || requiredMessage;

  const handleClose = () => {
    if (open) {
      setOpen(false);
      handleValidity();
    }
  };

  useOnClickOutside(SelectRef, handleClose);

  const handleValidity = useCallback((): void => {
    if (!value && props.required) {
      setRequiredMessage(
        requiredErrorMessage ||
          `Please select a ${typeof label === 'string' && label?.toLowerCase()}.`
      );
    }
  }, [value, props.required, requiredErrorMessage, label]);

  const Option = (props: { item: SelectItem }): JSX.Element => {
    const { item } = props;
    const handleChange = (value: string) => {
      if (item.disabled) return;
      onChange(value);
      setOpen(false);
      setRequiredMessage('');
    };
    return (
      <li
        value={item.value}
        onClick={() => handleChange(item.value)}
        className={clsx(
          'p-4 flex flex-row items-center cursor-pointer rounded-none',
          'hover:bg-primary-purple-3-10',
          {
            'cursor-not-allowed opacity-40 hover:bg-transparent': item.disabled,
            'bg-primary-purple-3/[0.5] hover:bg-primary-purple-3/[0.5]': value === item.value,
          },
          'transition-background duration-500 ease-in-out',
          {
            'space-x-[11px]': item.icon && item.label,
            'justify-center': item.icon && !item.label,
            'justify-start': !item.icon && item.label,
          }
        )}
      >
        {item.icon}

        {item.label && (
          <span className="text-[14px] leading-[18px] font-medium text-primary-purple-1 w-full truncate">
            {item.label}
          </span>
        )}
      </li>
    );
  };

  const handleClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'UL' ||
        target.tagName === 'LI' ||
        (target.tagName === 'SPAN' && target.parentElement?.tagName === 'LI')
      )
        return;
      if (disabled) return;
      if (open) handleValidity();
      setOpen(!open);
    },
    [disabled, open, handleValidity]
  );

  const optionSelected = useMemo(
    () => options.find((item) => item.value === value),
    [options, value]
  );

  return (
    <div
      className={clsx(
        'flex flex-col w-full md:max-w-[250px] [&:hover_input]:border-primary-purple-1',
        className
      )}
      ref={SelectRef}
    >
      {label && (
        <label
          id={props.id + '-label'}
          htmlFor={props.id}
          className={clsx(labelClassName, doubleInvalidMessage && '!text-label-error !font-bold')}
        >
          {label}
        </label>
      )}
      <div className="relative flex flex-row items-center w-full" onClick={handleClick}>
        <input
          type="text"
          className={clsx(
            inputClassName,
            'flex items-center cursor-pointer space-x-2',
            'pr-8', // avoid text over the icon
            {
              '!border-2 !border-primary-purple-1 pl-[15px]': open && !doubleInvalidMessage,
            }, // focus
            { 'cursor-not-allowed bg-tertiary-light-gray': disabled }, // disabled
            {
              '!bg-tertiary-extra-light-red !border-1 !border-tertiary-red': doubleInvalidMessage,
            }, // error
            { '!border-2 !bg-white': open && doubleInvalidMessage } // error & focus
          )}
          value={!optionSelected?.icon && optionSelected?.label ? optionSelected.label : ''}
          readOnly //avoid write on select & show keyboard on mobile
          {...props}
        />

        {/* if there is no label, show the icon selected */}
        {/* if there is label and icon, show the icon and label selected */}
        {optionSelected?.icon && (
          <div
            className="absolute top-0 py-[17px] pl-4 flex w-full h-full cursor-pointer items-center"
            tabIndex={0}
          >
            {optionSelected?.icon && !optionSelected.label && optionSelected.icon}
            {optionSelected?.icon && optionSelected.label && (
              <>
                {optionSelected.icon}
                <div className="text-[14px] leading-[18px] ml-2 pr-8 font-medium text-primary-purple-1 w-full truncate">
                  {optionSelected.label}
                </div>
              </>
            )}
          </div>
        )}

        {/* arrow up/down */}
        <div
          className={clsx(
            'absolute top-0 right-[min(9%,1rem)] flex h-full cursor-pointer items-center',
            { '!cursor-not-allowed': disabled }
          )}
          tabIndex={0}
        >
          <KeyboardArrowDownIcon
            fontSize="small"
            className={clsx(
              '!transition-transform !duration-500 !ease-in-out',
              open && 'rotate-180'
            )}
          />
        </div>

        {/* options list */}
        {open && (
          <ul className="absolute z-10 top-[100%] translate-y-0.5 max-h-56 w-full overflow-y-auto overflow-x-hidden rounded-sm bg-white m-0 px-0 shadow-box ring-1 ring-black ring-opacity-5 focus:outline-none">
            {options.map((item: SelectItem) => (
              <Option item={item} key={item.value} />
            ))}
          </ul>
        )}
      </div>

      {/* error message */}
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
