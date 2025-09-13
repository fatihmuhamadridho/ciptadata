import Copyright from '@/components/Copyright';
import DataTable, { tableHeadersProps } from '@/components/DataTable';
import { VariableController } from '@/core/domains/controllers/variable.controller';
import { Container, Text } from '@mantine/core';
import React from 'react';

const HomePage = () => {
  const variableController = new VariableController();
  const variableData = variableController.getAllVariable();

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

  return (
    <Container py={16} fluid>
      <Text fw={'bold'}>Data View</Text>
      <DataTable mah={'85vh'} header={dataViewHeader} data={Array.from({ length: 100 })} />
      <Copyright />
    </Container>
  );
};

export default HomePage;
