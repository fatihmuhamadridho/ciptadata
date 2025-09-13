import { DatasetResponseItem } from '../types/dataset.type';

export class DatasetController {
  getAllDataset(): DatasetResponseItem[] {
    return [
      // column 0
      {
        value: 3,
        cell: [0, 0],
      },
      {
        value: 3,
        cell: [0, 1],
      },
      {
        value: 2,
        cell: [0, 2],
      },
      // column 1
      {
        value: 3,
        cell: [1, 0],
      },
      {
        value: 3,
        cell: [1, 1],
      },
      {
        value: 2,
        cell: [1, 2],
      },
      // column 2
      {
        value: 3,
        cell: [1, 0],
      },
      {
        value: 3,
        cell: [1, 1],
      },
      {
        value: 2,
        cell: [1, 2],
      },
      // column 3
      {
        value: 3,
        cell: [2, 0],
      },
      {
        value: 3,
        cell: [2, 1],
      },
      {
        value: 3,
        cell: [2, 2],
      },
    ];
  }
}
