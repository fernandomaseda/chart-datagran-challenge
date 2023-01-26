import { useState, ChangeEvent, useEffect } from 'react';
import { GeneralLayout } from '@layout';
import clsx from 'clsx';
import { Table, CheckedItem } from '@components';

const Posts = () => {
  type dataType = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  };

  type stateType = {
    data: dataType[] | null;
    colSelected: string;
    dataSelected: Partial<dataType>[];
  };

  const initialState = {
    data: null,
    colSelected: '',
    dataSelected: [],
  };

  const [state, setState] = useState<stateType>(initialState);

  const { data, dataSelected, colSelected } = state;

  useEffect(() => {
    const callApi = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        if (response.ok && 'userId' in data[0]) setState({ ...state, data: [...data.slice(0, 5)] });
      } catch (error) {
        alert('Could not fetch data');
      }
    };

    callApi();
  }, []);

  const handleCellClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
    const target = e.target as HTMLTableCellElement;
    const cells = (target.parentElement as HTMLTableRowElement)?.cells;
    const cellIndex = target.cellIndex;

    const colSelected = cells[cellIndex].innerText;
    const dataSelected = data?.map((item) => {
      return {
        [cells[cellIndex].innerText]: (
          <>
            {/* for /todos */}
            {/* <CheckedItem checked={item.completed}>{item[cells[cellIndex].innerText]}</CheckedItem> */}

            {/* for /posts */}
            {item[cells[cellIndex].innerText]}
          </>
        ),
      };
    });

    setState({ ...state, colSelected, dataSelected });
  };

  return (
    <GeneralLayout className="md:p-10 w-full">
      {data && (
        <Table
          data={data as Record<string, any>[]}
          handleCellClick={handleCellClick}
          className="[&_th:focus]:bg-primary-purple-3-10 [&_th]:cursor-pointer"
        />
      )}

      {state.colSelected && (
        <div className="pt-8 space-y-4 w-full">
          <h2 className="text-2xl font-bold">Selected column: {colSelected}</h2>
          <Table data={dataSelected as Record<string, any>[]} className="md:!w-auto" />
        </div>
      )}
    </GeneralLayout>
  );
};

export default Posts;
