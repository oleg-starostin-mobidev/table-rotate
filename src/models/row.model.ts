import { CsvRowInput } from '../types/csv-row-input.type';

export class RowModel {
  id: string;
  json: string[];
  is_valid = true;
  constructor(data: CsvRowInput) {
    this.id = data.id;
    try {
      this.json = JSON.parse(data.json);
    } catch (e) {
      this.json = [];
      this.is_valid = false;
    }
  }
}
