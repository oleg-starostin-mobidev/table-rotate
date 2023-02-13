import { parse } from '@fast-csv/parse';
import { format } from '@fast-csv/format';
import { createReadStream } from 'fs';
import {
  FormatterOptionsArgs,
  ParserOptionsArgs,
  ParserRow,
  FormatterRow,
  CsvParserStream,
  CsvFormatterStream,
} from 'fast-csv';

class CsvService {
  public createReadStream(filePath: string, options: ParserOptionsArgs): CsvParserStream<ParserRow, ParserRow> {
    const parseCsvStream = parse(options);
    const readFileStream = createReadStream(filePath);
    return readFileStream.pipe(parseCsvStream);
  }

  public createWriteStream(
    options: FormatterOptionsArgs<FormatterRow, FormatterRow>,
  ): CsvFormatterStream<FormatterRow, FormatterRow> {
    return format(options);
  }
}

export const csvService = new CsvService();
