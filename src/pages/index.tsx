import Copyright from '@/components/Copyright';
import DataTable, { tableHeadersProps } from '@/components/DataTable';
import { CorrelationController } from '@/core/domains/controllers/correlation.controller';
import { DatasetController } from '@/core/domains/controllers/dataset.controller';
import { ReliabilityController } from '@/core/domains/controllers/reliability.controller';
import { VariableController } from '@/core/domains/controllers/variable.controller';
import { Correlation } from '@/core/domains/models/correlation.model';
import { Dataset } from '@/core/domains/models/dataset.model';
import { Regression } from '@/core/domains/models/regression.model';
import { Reliability } from '@/core/domains/models/reliability.model';
import { Container, Text } from '@mantine/core';
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

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

  function erf(x: number): number {
    // approx
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);

    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  }

  const colX1 = variableData.find((v) => v.name === 'X1')!.column!;
  const colX2 = variableData.find((v) => v.name === 'X2')!.column!;
  const colY = variableData.find((v) => v.name === 'Y')!.column!;

  const regression = Regression.fit(matrixDataset, [colX1, colX2], colY);

  const meanRes = regression.residuals.reduce((a, b) => a + b, 0) / regression.residuals.length;
  const stdRes = Math.sqrt(
    regression.residuals.reduce((s, e) => s + (e - meanRes) ** 2, 0) / (regression.residuals.length - 1),
  );
  const standardizedResiduals = regression.residuals.map((e) => (e - meanRes) / stdRes);

  // ===== Histogram residuals =====
  const binSize = 0.5;
  const bins: Record<string, number> = {};
  standardizedResiduals.forEach((r) => {
    const bin = Math.round(r / binSize) * binSize;
    const key = bin.toFixed(1);
    bins[key] = (bins[key] || 0) + 1;
  });

  const histogramData = Object.entries(bins)
    .map(([bin, freq]) => ({ bin: parseFloat(bin), freq }))
    .sort((a, b) => a.bin - b.bin);

  // Hitung PDF normal (fit dengan mean=0, std=1)
  const normalCurve = Array.from({ length: 61 }, (_, i) => {
    const x = -3 + (i * 6) / 60; // range -3 sampai 3
    const y = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-(x ** 2) / 2);
    return { x: x.toFixed(2), pdf: y };
  });

  // scale pdf agar tinggi kurva sebanding dengan histogram
  const maxFreq = Math.max(...histogramData.map((d) => d.freq));
  const scale = maxFreq / Math.max(...normalCurve.map((d) => d.pdf));
  const normalCurveScaled = normalCurve.map((d) => ({ bin: d.x, freq: d.pdf * scale }));

  // ===== P-P Plot =====
  const sorted = [...regression.residuals].sort((a, b) => a - b);
  const n = sorted.length;
  const ppPlotData = sorted.map((val, i) => {
    const expected = (i + 1) / (n + 1); // expected cum prob
    // observed pakai distribusi normal standar
    const observed = (1 + erf(val / Math.sqrt(2))) / 2;
    return { expected, observed };
  });

  console.log({ variableData, colX1, colX2, colY, regression });

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

      {/* Histogram */}
      <Text fw="bold">Histogram of Residuals</Text>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={histogramData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="bin"
            domain={[-3, 3]} // range residual standardized
            tickCount={13}
            label={{ value: 'Regression Standardized Residual', position: 'insideBottom', dy: 10 }}
          />
          <YAxis label={{ value: 'Frequency', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Bar dataKey="freq" fill="#3498db" />
          {/* Normal curve fit */}
          <Line type="monotone" dataKey="freq" data={normalCurveScaled} stroke="black" dot={false} />
        </BarChart>
      </ResponsiveContainer>

      {/* P-P Plot */}
      <Text fw="bold" mt={32}>
        P-P Plot
      </Text>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="expected" domain={[0, 1]} label={{ value: 'Expected Cum Prob', dy: 10 }} />
          <YAxis
            type="number"
            dataKey="observed"
            domain={[0, 1]}
            label={{ value: 'Observed Cum Prob', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <ReferenceLine
            stroke="#888"
            strokeDasharray="3 3"
            segment={[
              { x: 0, y: 0 },
              { x: 1, y: 1 },
            ]}
          />
          <Scatter data={ppPlotData} fill="#27ae60" />
        </ScatterChart>
      </ResponsiveContainer>
      <Copyright />
    </Container>
  );
};

export default HomePage;
