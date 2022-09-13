import {createMemoryDatabase} from './database';
import {parseRequest} from './parser';
import {processCommand} from './processor';

const userId = 'U2147483697';

const requests = [
  'default wfh',
  '21st sep tileyard',
  'next friday HQ',
  '@MyBuddy',
  'subscribe @MyBuddy',
  "who's in 8th October Tileyard",
];

const database = createMemoryDatabase();

requests.forEach(async (request) => {
  const command = parseRequest(request, userId);
  if (command) {
    const response = await processCommand(command, database);
    console.log(`${request} => ${response}`);
  }
});
