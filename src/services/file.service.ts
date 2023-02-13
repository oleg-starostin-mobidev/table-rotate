import { parse } from '@fast-csv/parse';
import { format } from '@fast-csv/format';
import { createReadStream } from 'fs';
import path from 'path';
import { handleError } from '../utils';
import { CsvRowInput } from '../types/csv-row-input.type';
import { CsvRowOutput } from '../types/csv-row-output.type';
import { RowModel } from '../models/row.model';
import { INCORRECT_FILE_FORMAT, INPUT_FILE_REQUIRED } from '../errors';

class FileService {
  private validateFile(filePath: string): void {
    if (!filePath) {
      throw Error(INPUT_FILE_REQUIRED);
    }
    if (path.extname(filePath) !== '.csv') {
      throw Error(INCORRECT_FILE_FORMAT);
    }
  }

  private formatData(row: CsvRowInput): CsvRowOutput {
    const processedRowData = new RowModel(row);
    return { ...processedRowData, json: JSON.stringify(processedRowData.json) };
  }

  public process(filePath: string): void {
    this.validateFile(filePath);
    const parseCsvStream = parse({ headers: true });
    const formatCsvStream = format({
      headers: ['id', 'json', 'is_valid'],
      quoteColumns: { json: true },
      quoteHeaders: false,
    });
    const readFileStream = createReadStream(path.join(process.cwd(), filePath));
    readFileStream
      .pipe(parseCsvStream)
      .on('data', (row: CsvRowInput) => {
        const formattedData = this.formatData(row);
        formatCsvStream.write(formattedData);
      })
      .on('error', (err: Error) => {
        handleError(err);
      });
    formatCsvStream.pipe(process.stdout);
  }
}

export const fileService = new FileService();
