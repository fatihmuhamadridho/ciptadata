import Copyright from '@/components/Copyright';
import DataTable, { tableHeadersProps } from '@/components/DataTable';
import NormalityCharts from '@/components/NormalityCharts';
import { CorrelationController } from '@/core/domains/controllers/correlation.controller';
import { DatasetController } from '@/core/domains/controllers/dataset.controller';
import { ReliabilityController } from '@/core/domains/controllers/reliability.controller';
import { VariableController } from '@/core/domains/controllers/variable.controller';
import { Correlation } from '@/core/domains/models/correlation.model';
import { Dataset } from '@/core/domains/models/dataset.model';
import { Reliability } from '@/core/domains/models/reliability.model';
import { Container, Text } from '@mantine/core';
import React from 'react';

const HomePage = () => {
  const variableController = new VariableController();
  const datasetController = new DatasetController();
  const correlationController = new CorrelationController();
  const reliabilityController = new ReliabilityController();

  const variableData = variableController.getAllVariable();
  const datasetData = datasetController.getAllDataset();
  const correlationSettingData = correlationController.getAllCorrelation();
  const reliabilitySettingData = reliabilityController.getAllReliability();

  const matrixDataset = Dataset.toMatrix(datasetData, variableData);
  const dataView = matrixDataset.map((row, rowIndex) => {
    const rowObj: Record<string, number | string> = {
      index: rowIndex + 1,
    };

    variableData.forEach((variable) => {
      rowObj[variable.name] = row[variable.column];
    });

    return rowObj;
  });

  const correlationResults = correlationSettingData.map((setting) => {
    const selectedVariables = variableData.filter((v) => setting.variables.includes(v.name));
    const table = Correlation.buildTable(matrixDataset, selectedVariables);
    return { name: setting.name, table };
  });

  const reliabilityResults = reliabilitySettingData.map((setting) => {
    const selectedVariables = variableData.filter((v) => setting.variables.includes(v.name));
    const alpha = Reliability.cronbachAlpha(
      matrixDataset,
      selectedVariables.map((v) => v.column!),
    );
    return { name: setting.name, alpha: alpha.toFixed(3) };
  });

  const dataViewHeader: tableHeadersProps[] = [
    {
      label: '',
      key: 'index',
    },
    ...variableData.map((item) => ({
      label: item.name,
      key: item.name,
    })),
  ];

  return (
    <Container py={16} maw={900} fluid>
      <Text fw={'bold'}>Data View</Text>
      <DataTable mah={'85vh'} header={dataViewHeader} data={dataView} />

      {correlationResults.map((result, i) => {
        const header: tableHeadersProps[] = [
          { label: 'Variable', key: 'variable' },
          ...(result.table.length > 0
            ? Object.keys(result.table[0])
                .filter((k) => k !== 'variable')
                .map((k) => ({ label: k, key: k }))
            : []),
        ];

        return (
          <React.Fragment key={i}>
            <Text fw={'bold'} mt={32}>
              {correlationSettingData[i].name}
            </Text>
            <DataTable mah={'85vh'} header={header} data={result.table} />
          </React.Fragment>
        );
      })}

      {reliabilityResults.map((result, i) => (
        <React.Fragment key={i}>
          <Text fw={'bold'} mt={32}>
            {result.name}
          </Text>
          <DataTable
            mah={'200px'}
            header={[
              { label: 'Construct', key: 'name' },
              { label: 'Cronbach Alpha', key: 'alpha' },
            ]}
            data={[result]}
          />
        </React.Fragment>
      ))}
      <NormalityCharts />
      <Copyright />
    </Container>
  );
};

export default HomePage;
