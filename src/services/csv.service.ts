import { parse } from '@fast-csv/parse';
import { format } from '@fast-csv/format';
import { createReadStream } from 'fs';
import { CsvParserStream, CsvFormatterStream, FormatterOptionsArgs } from 'fast-csv';

class CsvService {
  public createReadStream(filePath: string): CsvParserStream<never, never> {
    const parseCsvStream = parse({ headers: true });
    const readFileStream = createReadStream(filePath);
    return readFileStream.pipe(parseCsvStream);
  }

  public createWriteStream(options: FormatterOptionsArgs<never, never>): CsvFormatterStream<never, never> {
    return format(options);
  }
}

export const csvService = new CsvService();
