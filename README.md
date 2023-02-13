# Table Rotation in CSV

## Project Info
It is CLI tool, which perform tables transformation in CSV file.
User should pass a CSV file as input file representing a series of tables. After that program parse, verify and rotate each table.
And as a result program write everything to new CSV file

## Tech Stack
* node.js
* typescript

## Run in dev environment (watch made)
* `npm install` - install npm dependencies
* `npm start` - start watching changes in src folder

## Build CLI
* `npm install` - install npm dependencies
* `npm run build` - create build in `build` folder

## Run CLI
* `node cli.js input.csv > output.csv` - command should be run from root folder. Also `input.csv` and `output.csv` are parameters, which should be provided by user

### Notes
* Application creates build in `build` folder, but there is file in the root, called `cli.js`, which requires the source from `build` folder. 
It is done for simplicity running the cli tool.
* There is sample csv file in the root folder called `input.csv`, it could be used as an example of input file and also for testing application

