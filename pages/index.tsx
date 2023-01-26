import { SelectItem } from '@components';
import { useState, ChangeEvent } from 'react';
import { InputForm } from '../modules/InputForm';
import ReactHighcharts from 'react-highcharts';
import { GeneralLayout } from '@layout';

export type stateType = {
  CSVFileContent: string;
  xAxis: string;
  yAxis: string;
  xAxisOptions: SelectItem[];
  yAxisOptions: SelectItem[];
  xAxisData: number[] | string[];
  yAxisData: number[];
};

const Home = () => {
  const initialState = {
    CSVFileContent: `date, amount, spent\n2019-01-01, 10, 100\n2019-01-02, 20, 200`,
    xAxis: '',
    yAxis: '',
    xAxisOptions: [],
    yAxisOptions: [],
    xAxisData: [],
    yAxisData: [],
  };

  const [state, setState] = useState<stateType>(initialState);

  const { CSVFileContent, xAxis, yAxis, xAxisOptions, yAxisOptions, xAxisData, yAxisData } = state;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setState({
      ...state,
      [id]: value,
      xAxis: '',
      yAxis: '',
      xAxisOptions: [],
      yAxisOptions: [],
      yAxisData: [],
      xAxisData: [],
    });
  };

  const handleProcess = () => {
    const rows = CSVFileContent.split('\n');
    const options = rows[0].split(', ');

    const xAxisOptions = options.map((option) => {
      return { value: option, label: option };
    });

    //only numbers on Y axis
    const yAxisOptions = xAxisOptions.filter((option) => {
      const index = rows[0].split(', ').indexOf(option.value);
      return !/\D/g.test(rows[1].split(', ')[index]);
    });

    setState({ ...state, xAxisOptions, yAxisOptions });
  };

  const handleGraph = () => {
    const rows = CSVFileContent.split('\n');
    const dataRows = rows.slice(1);
    const xAxisIndex = rows[0].split(', ').indexOf(xAxis);
    const yAxisIndex = rows[0].split(', ').indexOf(yAxis);

    const xAxisData = dataRows.map((row) => {
      return row.split(', ')[xAxisIndex];
    });

    const yAxisData = dataRows.map((row) => {
      return Number(row.split(', ')[yAxisIndex]);
    });

    setState({ ...state, xAxisData, yAxisData });
  };

  return (
    <GeneralLayout>
      <InputForm
        state={state}
        setState={setState}
        handleChange={handleChange}
        handleProcess={handleProcess}
        handleGraph={handleGraph}
      />

      {yAxisData.length > 0 && xAxisData.length > 0 && (
        <ReactHighcharts
          config={{
            title: {
              text: 'Chart',
            },
            xAxis: {
              categories: xAxisData,
            },
            series: [
              {
                data: yAxisData,
              },
            ],
          }}
        />
      )}
    </GeneralLayout>
  );
};

export default Home;
