import Copyright from '@/components/Copyright';
import DataTable, { tableHeadersProps } from '@/components/DataTable';
import { Container, Text } from '@mantine/core';
import React from 'react';
import dummyData3 from '../../public/dummyData.json';

const HomePage = () => {
  function pearsonCorrelation(x: number[], y: number[]): number {
    const n = x.length;
    const meanX = x.reduce((a, b) => a + b, 0) / n;
    const meanY = y.reduce((a, b) => a + b, 0) / n;

    let numerator = 0;
    let denomX = 0;
    let denomY = 0;

    for (let i = 0; i < n; i++) {
      const dx = x[i] - meanX;
      const dy = y[i] - meanY;
      numerator += dx * dy;
      denomX += dx * dx;
      denomY += dy * dy;
    }

    const denominator = Math.sqrt(denomX * denomY);
    return denominator === 0 ? 0 : numerator / denominator;
  }

  function correlationMatrix(data: number[][]): string[][] {
    const nCols = data[0].length;
    const columns = Array.from({ length: nCols }, (_, j) => data.map((row) => row[j]));
    const result: string[][] = [];

    for (let i = 0; i < nCols; i++) {
      result[i] = [];
      for (let j = 0; j < nCols; j++) {
        const r = pearsonCorrelation(columns[i], columns[j]);
        result[i][j] = formatNumber(r);
      }
    }
    return result;
  }

  function formatNumber(value: number): string {
    if (isNaN(value)) return '';
    return value.toFixed(10).replace('.', ','); // pakai koma desimal
  }

  const correlationsKeys: tableHeadersProps[] = [
    {
      label: 'X1.1',
      key: (data: any) => <Text ta={'end'}>{data ? data[1 - 1] : ''}</Text>,
    },
    {
      label: 'X1.2',
      key: (data: any) => <Text ta={'end'}>{data ? data[2 - 1] : ''}</Text>,
    },
    {
      label: 'X1.3',
      key: (data: any) => <Text ta={'end'}>{data ? data[3 - 1] : ''}</Text>,
    },
    {
      label: 'X1.4',
      key: (data: any) => <Text ta={'end'}>{data ? data[4 - 1] : ''}</Text>,
    },
    {
      label: 'X1.5',
      key: (data: any) => <Text ta={'end'}>{data ? data[5 - 1] : ''}</Text>,
    },
    {
      label: 'X1.6',
      key: (data: any) => <Text ta={'end'}>{data ? data[6 - 1] : ''}</Text>,
    },
    {
      label: 'X1.7',
      key: (data: any) => <Text ta={'end'}>{data ? data[7 - 1] : ''}</Text>,
    },
    {
      label: 'X1.8',
      key: (data: any) => <Text ta={'end'}>{data ? data[8 - 1] : ''}</Text>,
    },
    {
      label: 'X1.9',
      key: (data: any) => <Text ta={'end'}>{data ? data[9 - 1] : ''}</Text>,
    },
    {
      label: 'X1.10',
      key: (data: any) => <Text ta={'end'}>{data ? data[10 - 1] : ''}</Text>,
    },
    {
      label: 'X1.11',
      key: (data: any) => <Text ta={'end'}>{data ? data[11 - 1] : ''}</Text>,
    },
    {
      label: 'X1.12',
      key: (data: any) => <Text ta={'end'}>{data ? data[12 - 1] : ''}</Text>,
    },
    {
      label: 'X1.13',
      key: (data: any) => <Text ta={'end'}>{data ? data[13 - 1] : ''}</Text>,
    },
    {
      label: 'X1.14',
      key: (data: any) => <Text ta={'end'}>{data ? data[14 - 1] : ''}</Text>,
    },
    {
      label: 'X1.15',
      key: (data: any) => <Text ta={'end'}>{data ? data[15 - 1] : ''}</Text>,
    },
    {
      label: 'X1.16',
      key: (data: any) => <Text ta={'end'}>{data ? data[16 - 1] : ''}</Text>,
    },
    {
      label: 'X1.17',
      key: (data: any) => <Text ta={'end'}>{data ? data[17 - 1] : ''}</Text>,
    },
    {
      label: 'X1.18',
      key: (data: any) => <Text ta={'end'}>{data ? data[18 - 1] : ''}</Text>,
    },
    {
      label: 'X1.19',
      key: (data: any) => <Text ta={'end'}>{data ? data[19 - 1] : ''}</Text>,
    },
    {
      label: 'X1.20',
      key: (data: any) => <Text ta={'end'}>{data ? data[20 - 1] : ''}</Text>,
    },
    {
      label: 'X1.21',
      key: (data: any) => <Text ta={'end'}>{data ? data[21 - 1] : ''}</Text>,
    },
    {
      label: 'X1.22',
      key: (data: any) => <Text ta={'end'}>{data ? data[22 - 1] : ''}</Text>,
    },
    {
      label: 'X2.1',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
    {
      label: 'X2.2',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
    {
      label: 'X2.3',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
    {
      label: 'X2.4',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
    {
      label: 'X2.5',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
    {
      label: 'X2.6',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
    {
      label: 'X2.7',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
    {
      label: 'X2.8',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
    {
      label: 'X2.9',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
    {
      label: 'X2.10',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
    {
      label: 'X2.11',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
    {
      label: 'X2.12',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
    {
      label: 'X2.13',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
    {
      label: 'Y1.1',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
    {
      label: 'Y1.2',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
    {
      label: 'Y1.3',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
    {
      label: 'Y1.4',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
    {
      label: 'Y1.5',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
    {
      label: 'Y1.6',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
    {
      label: 'Y1.7',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
    {
      label: 'Y1.8',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
    {
      label: 'Y1.9',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
    {
      label: 'Y1.10',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
    {
      label: 'Y1.11',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
    {
      label: 'Y1.12',
      key: (data: any) => <Text ta={'end'}>{data ? data[1] : ''}</Text>,
    },
  ];

  const headers: tableHeadersProps[] = [
    {
      label: '',
      key: 'index',
    },
    ...correlationsKeys,
    {
      label: 'X1',
      key: (data: any) => {
        if (!data) return '';
        const total = data.slice(0, 22).reduce((acc: number, val: number) => acc + val, 0);
        return <Text ta="end">{total}</Text>;
      },
    },
  ];

  const dummyHeaders: tableHeadersProps[] = Array.from({ length: 50 - Number(headers.length - 1) }).map((item) => ({
    label: 'var',
    key: '',
  }));

  const dummyData = Array.from({ length: 50 - Number(dummyData3.length) - 1 });

  const headersCorrelations: tableHeadersProps[] = [
    {
      label: '',
      key: (data: any, index: number) => <Text>{correlationsKeys[index]?.label || ''}</Text>,
    },
    ...correlationsKeys,
  ];

  const corr = correlationMatrix(dummyData3);

  return (
    <Container py={16} fluid>
      <Text fw={'bold'}>Data View</Text>
      <DataTable mah={'85vh'} header={[...headers, ...dummyHeaders]} data={[...dummyData3, ...dummyData]} />
      <Text mt={72} fw={'bold'}>
        Correlations
      </Text>
      <DataTable mah={'85vh'} header={headersCorrelations} data={[...corr]} />
      <Copyright />
    </Container>
  );
};

export default HomePage;
