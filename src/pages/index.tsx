import Copyright from '@/components/Copyright';
import DataTable, { tableHeadersProps } from '@/components/DataTable';
import { DatasetController } from '@/core/domains/controllers/dataset.controller';
import { VariableController } from '@/core/domains/controllers/variable.controller';
import { Correlation } from '@/core/domains/models/correlation.model';
import { Dataset } from '@/core/domains/models/dataset.model';
import { Container, Text } from '@mantine/core';
import React from 'react';

const HomePage = () => {
  const variableController = new VariableController();
  const datasetController = new DatasetController();
  const variableData = variableController.getAllVariable();
  const datasetData = datasetController.getAllDataset();
  const matrixDataset = Dataset.toMatrix(datasetData, variableData);
  const correlationTable = Correlation.buildTable(matrixDataset, variableData);

  const dataView = matrixDataset.map((row, rowIndex) => {
    const rowObj: Record<string, number | string> = {
      index: rowIndex + 1,
    };

    variableData.forEach((variable) => {
      rowObj[variable.name] = row[variable.column];
    });

    return rowObj;
  });

  console.log({ variableData, matrixDataset, dataView, correlationTable });

  const dataViewHeader: tableHeadersProps[] = [
    {
      label: '',
      key: 'index',
    },
    ...variableData.map((item) => ({
      label: item.label ?? item.name,
      key: item.name,
    })),
  ];

  const correlationHeader: tableHeadersProps[] = [
    { label: 'Variable', key: 'variable' },
    ...variableData.map((v) => ({ label: v.name, key: v.name })),
  ];

  return (
    <Container py={16} fluid>
      <Text fw={'bold'}>Data View</Text>
      <DataTable mah={'85vh'} header={dataViewHeader} data={dataView} />
      <Text fw={'bold'} mt={32}>
        Correlations
      </Text>
      <DataTable mah={'85vh'} header={correlationHeader} data={correlationTable} />
      <Copyright />
    </Container>
  );
};

export default HomePage;
