import { CorrelationResponseItem } from '../types/correlation.type';

export class CorrelationController {
  getAllCorrelation(): CorrelationResponseItem[] {
    return [
      {
        id: 'c1',
        name: 'Correlation X1',
        variables: [
          'X1.1',
          'X1.2',
          'X1.3',
          'X1.4',
          'X1.5',
          'X1.6',
          'X1.7',
          'X1.8',
          'X1.9',
          'X1.10',
          'X1.11',
          'X1.12',
          'X1.13',
          'X1.14',
          'X1.15',
          'X1.16',
          'X1.17',
          'X1.18',
          'X1.19',
          'X1.20',
          'X1.21',
          'X1.22',
          'X1',
        ],
      },
      {
        id: 'c2',
        name: 'Correlation X2',
        variables: [
          'X2.1',
          'X2.2',
          'X2.3',
          'X2.4',
          'X2.5',
          'X2.6',
          'X2.7',
          'X2.8',
          'X2.9',
          'X2.10',
          'X2.11',
          'X2.12',
          'X2.13',
          'X2',
        ],
      },
      {
        id: 'c3',
        name: 'Correlation Y',
        variables: ['Y.1', 'Y.2', 'Y.3', 'Y.4', 'Y.5', 'Y.6', 'Y.7', 'Y.8', 'Y.9', 'Y.10', 'Y.11', 'Y.12', 'Y'],
      },
    ];
  }
}
