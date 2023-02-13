import path from 'path';
import { csvService } from './services/csv.service';
import { INPUT_FILE_REQUIRED } from './errors';
import { RowModel } from './models/row.model';
import { TableModel } from './models/table.model';
import { CsvRowInput } from './types/csv-row-input.type';
import { CsvRowOutput } from './types/csv-row-output.type';

function main() {
  const args = process.argv.slice(2);
  const [inputFilePath] = args;
  if (!inputFilePath) {
    throw Error(INPUT_FILE_REQUIRED);
  }
  const filePath = path.join(process.cwd(), inputFilePath);

  const readCsvStream = csvService.createReadStream(filePath, { headers: true });
  const writeCsvStream = csvService.createWriteStream({
    headers: ['id', 'json', 'is_valid'],
    quoteColumns: { json: true },
    quoteHeaders: false,
  });
  readCsvStream.on('data', (inputRow: CsvRowInput) => {
    const row = new RowModel(inputRow);
    const table = new TableModel(row.json);
    const rotatedTable = table.rotateTable();
    const outputRow: CsvRowOutput = { ...row, is_valid: table.is_valid, json: JSON.stringify(rotatedTable) };
    writeCsvStream.write(outputRow);
  });
  writeCsvStream.pipe(process.stdout);
}

main();
