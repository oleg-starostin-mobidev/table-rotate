import { CsvRowInput } from '../types/csv-row-input.type';
import { isValidJson } from '../utils';

export class RowModel {
  id: string;
  json: string[];
  is_valid = true;
  constructor(data: CsvRowInput) {
    this.id = data.id;
    this.validateJson(data);
    if (!this.is_valid) {
      this.json = [];
      return;
    }
    this.json = JSON.parse(data.json);
    this.validateTable(this.json);
    if (!this.is_valid) {
      this.json = [];
      return;
    }
    this.processTable();
  }

  private validateJson(data: CsvRowInput): void {
    if (!data.json || !isValidJson(data.json)) {
      this.is_valid = false;
    }
  }

  private validateTable(json: string[]): void {
    const isSquareTable = Math.sqrt(json.length) % 1 === 0;

    if (!json.length || !isSquareTable) {
      this.is_valid = false;
    }
  }

  private getSize() {
    return Math.sqrt(this.json.length);
  }

  private getDepth() {
    return Math.ceil(this.getSize() / 2);
  }

  private getInsideTableSize(depth: number): number {
    return this.getSize() - 2 * depth;
  }

  private getTopElementIndex(depth: number, col: number): number {
    return depth * this.getSize() + col + depth;
  }

  private getRightElementIndex(depth: number, row: number): number {
    const currentTableSize = this.getInsideTableSize(depth);
    const size = this.getSize();
    return depth * size + depth + currentTableSize - 1 + row * size;
  }

  private getBottomElementIndex(depth: number, col: number): number {
    const size = this.getSize();
    return size * size - 1 - (depth * size + col + depth);
  }

  private getLeftElementIndex(depth: number, row: number): number {
    const currentTableSize = this.getInsideTableSize(depth);
    const size = this.getSize();
    return size * size - 1 - (depth * size + depth + currentTableSize - 1 + row * size);
  }

  public processTable(): void {
    const transformedJson = [];
    const tableDepth = this.getDepth();

    for (let i = 0; i < tableDepth; i++) {
      const currentTableSize = this.getInsideTableSize(i);

      for (let j = 0; j < currentTableSize; j++) {
        const topIndex = this.getTopElementIndex(i, j);
        let topShiftedIndex = this.getTopElementIndex(i, j + 1);
        const bottomIndex = this.getBottomElementIndex(i, j);
        let bottomShiftedIndex = this.getBottomElementIndex(i, j + 1);

        if (j === currentTableSize - 1) {
          topShiftedIndex = this.getRightElementIndex(i, 1);
          bottomShiftedIndex = this.getLeftElementIndex(i, 1);
        }

        if (currentTableSize === 1) {
          topShiftedIndex = topIndex;
          bottomShiftedIndex = bottomIndex;
        }

        transformedJson[topShiftedIndex] = this.json[topIndex];
        transformedJson[bottomShiftedIndex] = this.json[topIndex];
      }

      for (let j = 1; j < currentTableSize - 1; j++) {
        const rightIndex = this.getRightElementIndex(i, j);
        const rightShiftedIndex = this.getRightElementIndex(i, j + 1);
        const leftIndex = this.getLeftElementIndex(i, j);
        const leftShiftedIndex = this.getLeftElementIndex(i, j + 1);

        transformedJson[rightShiftedIndex] = this.json[rightIndex];
        transformedJson[leftShiftedIndex] = this.json[leftIndex];
      }
    }

    this.json = [...transformedJson];
  }
}
