export class TableModel {
  is_valid = true;
  constructor(private readonly table: string[] | number[]) {
    const isSquareTable = Math.sqrt(this.table.length) % 1 === 0;
    if (!isSquareTable || !this.table.length) {
      this.table = [];
      this.is_valid = false;
    }
  }

  private get size() {
    return Math.sqrt(this.table.length);
  }

  private get depth() {
    return Math.ceil(this.size / 2);
  }

  private getInsideTableSize(depth: number): number {
    return this.size - 2 * depth;
  }

  private getTopElementIndex(depth: number, col: number): number {
    return depth * this.size + col + depth;
  }

  private getRightElementIndex(depth: number, row: number): number {
    const size = this.size;
    const currentTableSize = this.getInsideTableSize(depth);
    return depth * size + depth + currentTableSize - 1 + row * size;
  }

  private getBottomElementIndex(depth: number, col: number): number {
    const size = this.size;
    return size * size - 1 - (depth * size + col + depth);
  }

  private getLeftElementIndex(depth: number, row: number): number {
    const size = this.size;
    const currentTableSize = this.getInsideTableSize(depth);
    return size * size - 1 - (depth * size + depth + currentTableSize - 1 + row * size);
  }

  public rotateTable(): (string | number)[] {
    const transformedJson = [];

    for (let i = 0; i < this.depth; i++) {
      const currentTableSize = this.getInsideTableSize(i);

      // go through top and bottom rows
      for (let j = 0; j < currentTableSize; j++) {
        const topIndex = this.getTopElementIndex(i, j);
        let topShiftedIndex = this.getTopElementIndex(i, j + 1);
        const bottomIndex = this.getBottomElementIndex(i, j);
        let bottomShiftedIndex = this.getBottomElementIndex(i, j + 1);

        // check top right and bottom left elements, as they move different
        if (j === currentTableSize - 1) {
          topShiftedIndex = this.getRightElementIndex(i, 1);
          bottomShiftedIndex = this.getLeftElementIndex(i, 1);
        }

        // do nothing with array from 1 element
        if (currentTableSize === 1) {
          topShiftedIndex = topIndex;
          bottomShiftedIndex = bottomIndex;
        }

        transformedJson[topShiftedIndex] = this.table[topIndex];
        transformedJson[bottomShiftedIndex] = this.table[bottomIndex];
      }

      // go through right and left columns
      for (let j = 1; j < currentTableSize - 1; j++) {
        const rightIndex = this.getRightElementIndex(i, j);
        const rightShiftedIndex = this.getRightElementIndex(i, j + 1);
        const leftIndex = this.getLeftElementIndex(i, j);
        const leftShiftedIndex = this.getLeftElementIndex(i, j + 1);

        transformedJson[rightShiftedIndex] = this.table[rightIndex];
        transformedJson[leftShiftedIndex] = this.table[leftIndex];
      }
    }

    return transformedJson;
  }
}
