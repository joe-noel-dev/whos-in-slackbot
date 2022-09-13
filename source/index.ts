import {createMemoryDatabase} from './database';
import {parseRequest} from './parser';
import {processCommand} from './processor';

const userId = 'U2147483697';

const requests = [
  'default wfh',
  'default ty',
  'default hq',
  'default Wycombe',
  '21st sep tileyard',
  '9th march hq',
  '18th jan wfh',
  '18th february tileyard',
  '2022-10-14 hw',
  'next friday HQ',
  '<@U837468746|Buddy>',
  '<@U837468734>',
  'subscribe <@U837468746|Buddy>',
  "who's in 8th October Tileyard",
  "who's in tileyard ???",
];

const database = createMemoryDatabase();

requests.forEach(async (request) => {
  const command = parseRequest(request, userId);
  if (command) {
    const response = await processCommand(command, database);
    console.log(`${request} => ${response}`);
  }
});
