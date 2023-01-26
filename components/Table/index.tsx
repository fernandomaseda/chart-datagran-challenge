import { FC } from 'react';
import clsx from 'clsx';

export interface TableProps {
  className?: string;
  data: Record<string, any>[];
  handleCellClick?: (e: React.MouseEvent<HTMLTableCellElement>) => void;
}

const renderItem = (text) => (typeof text === 'boolean' ? <CheckedItem checked={text} /> : text);

export const Table: FC<TableProps> = ({ className, data, handleCellClick }) => {
  const arrHead = Object.keys(data?.[0] ?? {});
  const arrBody = (i: number) => Object.values(data?.[i] ?? {});

  return (
    <table
      className={clsx(
        'w-[inherit] md:min-w-[400px] border-spacing-0 border border-solid border-primary-purple-1',
        '[&_th]:border [&_th]:border-solid [&_th]:border-primary-purple-1 [&_th]:px-3',
        '[&_td]:border [&_td]:border-solid [&_td]:border-primary-purple-1 [&_td]:px-4',
        className
      )}
    >
      <thead>
        <tr>
          {arrHead.map((text) => (
            <th key={text}>{text}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((elem, i) => (
          <tr key={`${elem}-${i}`}>
            {arrBody(i).map((text, i) => (
              <td key={`${text}-${i}`} onClick={(e) => handleCellClick?.(e)} tabIndex={0}>
                {renderItem(text)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const CheckedItem = ({ children, checked }: { children?: string; checked: boolean }) => {
  return (
    <>
      {children && typeof children !== 'boolean' && <span className="mr-4">{children}</span>}

      <span className={clsx({ 'text-tertiary-green': checked }, { 'text-tertiary-red': !checked })}>
        {checked ? <span>&#10003;</span> : <span>&#10799;</span>}
      </span>
    </>
  );
};
