import { VariableResponseItem } from '../types/variable.type';

export class VariableController {
  getAllVariable(): VariableResponseItem[] {
    return [
      {
        id: '1',
        name: 'X1.1',
        column: 0,
      },
      {
        id: '1',
        name: 'X1.2',
        column: 1,
      },
      {
        id: '1',
        name: 'X1.3',
        column: 2,
      },
    ];
  }
}
