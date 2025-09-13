'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Container, Text, Stack } from '@mantine/core';

// ===== Mock Data untuk Histogram =====
// Residual yang udah dibinning (misal dari -3 s/d 3)
const histogramData = [
  { bin: '-3', freq: 2 },
  { bin: '-2', freq: 5 },
  { bin: '-1', freq: 12 },
  { bin: '0', freq: 20 },
  { bin: '1', freq: 14 },
  { bin: '2', freq: 6 },
  { bin: '3', freq: 1 },
];

// ===== Mock Data untuk P-P Plot =====
// Expected vs Observed cumulative probability
const ppPlotData = [
  { expected: 0.05, observed: 0.04 },
  { expected: 0.15, observed: 0.14 },
  { expected: 0.25, observed: 0.26 },
  { expected: 0.35, observed: 0.36 },
  { expected: 0.45, observed: 0.47 },
  { expected: 0.55, observed: 0.56 },
  { expected: 0.65, observed: 0.64 },
  { expected: 0.75, observed: 0.76 },
  { expected: 0.85, observed: 0.87 },
  { expected: 0.95, observed: 0.96 },
];

const NormalityCharts = () => {
  return (
    <Container py={16} fluid>
      <Stack>
        {/* Histogram */}
        <Text fw="bold">Histogram (Mock Data)</Text>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={histogramData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="bin" label={{ value: 'Residual Bin', position: 'insideBottom', dy: 10 }} />
            <YAxis label={{ value: 'Frequency', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="freq" fill="#c6b26a" />
          </BarChart>
        </ResponsiveContainer>

        {/* P-P Plot */}
        <Text fw="bold" mt={32}>
          P-P Plot (Mock Data)
        </Text>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={ppPlotData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="expected"
              domain={[0, 1]}
              label={{ value: 'Expected Cum Prob', position: 'insideBottom', dy: 10 }}
            />
            <YAxis
              type="number"
              domain={[0, 1]}
              label={{ value: 'Observed Cum Prob', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip />
            {/* Garis diagonal y=x */}
            <Line
              data={[
                { expected: 0, observed: 0 },
                { expected: 1, observed: 1 },
              ]}
              type="linear"
              dataKey="observed"
              stroke="#888"
              strokeDasharray="3 3"
              dot={false}
              isAnimationActive={false}
            />
            {/* Titik hasil data */}
            <Line type="monotone" dataKey="observed" stroke="#82ca9d" dot />
          </LineChart>
        </ResponsiveContainer>
      </Stack>
    </Container>
  );
};

export default NormalityCharts;
