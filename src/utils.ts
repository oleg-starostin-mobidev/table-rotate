import chalk from 'chalk';

export const handleError = (message: string | unknown) => {
  console.error(chalk.red(`Error - ${message}`));
  process.exit(1);
};
export const isValidJson = (jsonStr: string) => {
  try {
    JSON.parse(jsonStr);
  } catch (e) {
    return false;
  }
  return true;
};
