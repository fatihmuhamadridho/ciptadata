import { DatasetResponseItem } from '../types/dataset.type';
import { VariableResponseItem } from '../types/variable.type';

export class Dataset {
  static toMatrix(data: DatasetResponseItem[], variables: VariableResponseItem[]): number[][] {
    const matrix: number[][] = [];

    // 1. isi matrix sesuai cell [col, row]
    data.forEach((item) => {
      const [col, row] = item.cell;
      if (!matrix[col]) matrix[col] = [];
      matrix[col][row] = item.value;
    });

    // 2. mapping variable atomic
    const varMap = Object.fromEntries(
      variables.filter((v) => v.column !== undefined && !v.expression).map((v) => [v.name, v.column!]),
    );

    // 3. compute variable kalau ada expression
    variables
      .filter((v) => v.expression)
      .forEach((v) => {
        matrix.forEach((row) => {
          let exp = v.expression!;
          for (const [name, col] of Object.entries(varMap)) {
            exp = exp.replaceAll(name, row[col].toString());
          }
          row[v.column ?? row.length] = Function(`"use strict"; return (${exp});`)();
        });
      });

    return matrix;
  }
}
