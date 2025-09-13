import { DatasetResponseItem } from '../types/dataset.type';
import { VariableResponseItem } from '../types/variable.type';

export class Dataset {
  static toMatrix(data: DatasetResponseItem[], variables: VariableResponseItem[]): number[][] {
    const matrix: number[][] = [];

    // 1. isi matrix sesuai cell [col, row] → row-major
    data.forEach((item) => {
      const [col, row] = item.cell;
      if (!matrix[row]) matrix[row] = [];
      matrix[row][col] = item.value;
    });

    // 2. mapping variable atomic (variabel asli tanpa expression)
    const varMap = Object.fromEntries(
      variables.filter((v) => v.column !== undefined && !v.expression).map((v) => [v.name, v.column!]),
    );

    // 3. hitung variabel dengan expression (per baris)
    variables
      .filter((v) => v.expression)
      .forEach((v) => {
        matrix.forEach((row) => {
          let exp = v.expression!;
          for (const [name, col] of Object.entries(varMap)) {
            const regex = new RegExp(`\\b${name}\\b`, 'g');
            exp = exp.replace(regex, row[col]?.toString() ?? '0');
          }
          // simpan hasil ke kolom variabel target
          row[v.column ?? row.length] = Function(`"use strict"; return (${exp});`)();
        });
      });

    return matrix;
  }
}
