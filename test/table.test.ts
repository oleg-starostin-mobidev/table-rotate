import { TableModel } from '../src/models/table.model';
import { tables } from './tables';

describe('test table rotation', () => {
  it('should be an invalid table when not square', () => {
    const inputTable = [1, 2];
    const outputTable = { table: [], is_valid: false };
    const table = new TableModel(inputTable);
    expect(table).toMatchObject(outputTable);
  });
  it('should be an invalid table when empty', () => {
    const inputTable: string[] = [];
    const outputTable = { table: [], is_valid: false };
    const table = new TableModel(inputTable);
    expect(table).toMatchObject(outputTable);
  });
  it('should rotate table with size 1 correctly', () => {
    const inputTable = tables[0].initial;
    const outputTable = tables[0].rotated;
    const table = new TableModel(inputTable);
    expect(table.rotateTable()).toMatchObject(outputTable);
  });
  it('should rotate table with size 2 correctly', () => {
    const inputTable = tables[1].initial;
    const outputTable = tables[1].rotated;
    const table = new TableModel(inputTable);
    expect(table.rotateTable()).toMatchObject(outputTable);
  });
  it('should rotate table with size 3 correctly', () => {
    const inputTable = tables[2].initial;
    const outputTable = tables[2].rotated;
    const table = new TableModel(inputTable);
    expect(table.rotateTable()).toMatchObject(outputTable);
  });
  it('should rotate table with size 4 correctly', () => {
    const inputTable = tables[3].initial;
    const outputTable = tables[3].rotated;
    const table = new TableModel(inputTable);
    expect(table.rotateTable()).toMatchObject(outputTable);
  });
  it('should rotate table with size 5 correctly', () => {
    const inputTable = tables[4].initial;
    const outputTable = tables[4].rotated;
    const table = new TableModel(inputTable);
    expect(table.rotateTable()).toMatchObject(outputTable);
  });
});
