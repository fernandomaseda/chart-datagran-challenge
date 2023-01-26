import { useState, ChangeEvent, useEffect } from 'react';
import { GeneralLayout } from '@layout';
import clsx from 'clsx';
import { Table, CheckedItem } from '@components';
import { isArray } from 'util';

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
    cellSelected: string;
    dataSelected: Record<string, any>[];
  };

  const initialState = {
    data: null,
    colSelected: '',
    cellSelected: '',
    dataSelected: [],
  };

  const [state, setState] = useState<stateType>(initialState);

  const { data, dataSelected, colSelected, cellSelected } = state;

  useEffect(() => {
    const callApi = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/posts');
        const data = await response.json();
        if (response.ok && 'userId' in data[0]) setState({ ...state, data: [...data.slice(0, 5)] });
      } catch (error) {
        alert('Could not fetch data');
      }
    };

    callApi();
  }, []);

  const fetchSelected = async (endpoint) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint);
      const data = await response.json();
      if (response.ok)
        setState((prevState) => {
          return { ...prevState, dataSelected: Array.isArray(data) ? [...data] : [data] };
        });
    } catch (error) {
      alert('Could not fetch data');
    }
  };

  const handleCellClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
    const target = e.target as HTMLTableCellElement;
    const rowIndex = (target.parentElement as HTMLTableRowElement).rowIndex;
    const colls = Object.keys(data[0]);

    const cellIndex = target.cellIndex;

    const colSelected = colls[cellIndex];
    const cellSelected = data[rowIndex - 1][colSelected];

    if (colSelected === 'userId') {
      fetchSelected('/posts/' + cellSelected);
    } else if (colSelected === 'id') {
      fetchSelected('/posts/' + cellSelected + '/comments');
    } else {
      setState((prevState) => {
        return { ...prevState, dataSelected: [] };
      });
    }

    setState((prevState) => {
      return { ...prevState, colSelected, cellSelected };
    });
  };

  return (
    <>
      {data && (
        <Table
          data={data as Record<string, any>[]}
          handleCellClick={handleCellClick}
          className="[&_td:focus]:bg-primary-purple-3-10 [&_td]:cursor-pointer"
        />
      )}

      {colSelected && dataSelected?.length > 0 && (
        <div className="pt-8 space-y-4 w-full">
          <span className="text-2xl font-bold">Selected col: {colSelected}</span>
          <br />
          <span className="text-2xl font-bold">Selected cell: {cellSelected}</span>
          <Table data={dataSelected} className="md:!w-auto" />
        </div>
      )}
    </>
  );
};

Posts.getLayout = function getLayout(page) {
  return <GeneralLayout className="md:p-10 w-full">{page}</GeneralLayout>;
};

export default Posts;
