import { handleError } from './utils';
import { fileService } from './services/file.service';

function main() {
  try {
    const args = process.argv.slice(2);
    const [inputFilePath] = args;
    fileService.process(inputFilePath);
  } catch (err) {
    handleError(err);
  }
}

main();
