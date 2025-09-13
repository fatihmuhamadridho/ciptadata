import { VariableResponseItem } from '../types/variable.type';
import variableJSON from '../../../../public/variable.controller.json';

export class VariableController {
  getAllVariable(): VariableResponseItem[] {
    const forCorrelation: VariableResponseItem[] = [
      {
        id: '1',
        name: 'X1',
        label: 'Kualitas Pelayanan',
        column: 47,
        expression:
          'X1.1 + X1.2 + X1.3 + X1.4 + X1.5 + X1.6 + X1.7 + X1.8 + X1.9 + X1.10 + X1.11 + X1.12 + X1.13 + X1.14 + X1.15 + X1.16 + X1.17 + X1.18 + X1.19 + X1.20 + X1.21 + X1.22',
      },
    ];
    return (variableJSON as VariableResponseItem[]).concat(forCorrelation);
  }
}
