import { DatasetResponseItem } from '../types/dataset.type';
import datasetJSON from '../../../../public/dataset.controller.json';

export class DatasetController {
  getAllDataset(): DatasetResponseItem[] {
    return (datasetJSON as DatasetResponseItem[]).map((item) => ({
      id: '1',
      value: item.value,
      cell: [item.cell[0], item.cell[1]],
    }));
  }
}
