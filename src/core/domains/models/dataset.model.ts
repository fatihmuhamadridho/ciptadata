import { DatasetResponseItem } from '../types/dataset.type';

export class Dataset {
  static toMatrix(data: DatasetResponseItem[]): number[][] {
    const matrix: number[][] = [];

    data.forEach((item) => {
      const [col, row] = item.cell;

      if (!matrix[col]) {
        matrix[col] = [];
      }

      matrix[col][row] = item.value;
    });

    return matrix;
  }
}
