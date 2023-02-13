import { RowModel } from '../src/models/row.model';
import { tables } from './tables';

const getInputRow = (size: number) => {
  return { id: '1', json: JSON.stringify(tables[size - 1].initial) };
};

const getOutputRow = (size: number) => {
  return { id: '1', json: tables[size - 1].rotated, is_valid: true };
};

describe('test json validation', () => {
  it('should be a valid for table with size 1', () => {
    const inputRow = getInputRow(1);
    const outputRow = getOutputRow(1);
    const data = new RowModel(inputRow);
    expect(data).toMatchObject(outputRow);
  });
  it('should be a valid for table with size 2', () => {
    const inputRow = getInputRow(2);
    const outputRow = getOutputRow(2);
    const data = new RowModel(inputRow);
    expect(data).toMatchObject(outputRow);
  });
  it('should be a valid for table with size 3', () => {
    const inputRow = getInputRow(3);
    const outputRow = getOutputRow(3);
    const data = new RowModel(inputRow);
    expect(data).toMatchObject(outputRow);
  });
  it('should be a valid for table with size 4', () => {
    const inputRow = getInputRow(4);
    const outputRow = getOutputRow(4);
    const data = new RowModel(inputRow);
    expect(data).toMatchObject(outputRow);
  });
  it('should be a valid for table with size 5', () => {
    const inputRow = getInputRow(5);
    const outputRow = getOutputRow(5);
    const data = new RowModel(inputRow);
    expect(data).toMatchObject(outputRow);
  });
  it('should be an invalid for table with size 0', () => {
    const inputRow = { id: '1', json: '[]' };
    const outputRow = { id: '1', json: [], is_valid: false };
    const data = new RowModel(inputRow);
    expect(data).toMatchObject(outputRow);
  });
  it('should be an invalid for table with invalid json', () => {
    const inputRow = { id: '1', json: '[1,2,3,]' };
    const outputRow = { id: '1', json: [], is_valid: false };
    const data = new RowModel(inputRow);
    expect(data).toMatchObject(outputRow);
  });
  it('should be an invalid for table with wrong size', () => {
    const inputRow = { id: '1', json: '[1,2,3,4,5]' };
    const outputRow = { id: '1', json: [], is_valid: false };
    const data = new RowModel(inputRow);
    expect(data).toMatchObject(outputRow);
  });
});
