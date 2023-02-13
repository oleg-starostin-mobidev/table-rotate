import { RowModel } from '../src/models/row.model';

describe('test row validation', () => {
  it('should be a valid row', () => {
    const inputRow = { id: '1', json: '[1]' };
    const outputRow = { id: '1', json: [1], is_valid: true };
    const row = new RowModel(inputRow);
    expect(row).toMatchObject(outputRow);
  });
  it('should be an invalid row', () => {
    const inputRow = { id: '1', json: '[1,]' };
    const outputRow = { id: '1', json: [], is_valid: false };
    const row = new RowModel(inputRow);
    expect(row).toMatchObject(outputRow);
  });
});
