import {createMemoryDatabase} from './database';
import {parseRequest} from './parser';
import {processCommand} from './processor';

const userIds = ['U2147483697', 'U11111111', 'U22222222', 'U33333333'];

const requests = [
  {user: userIds[0], text: 'default wfh'},
  {user: userIds[1], text: 'default ty'},
  {user: userIds[2], text: 'default hq'},
  {user: userIds[3], text: 'default Wycombe'},
  {user: userIds[0], text: '21st sep tileyard'},
  {user: userIds[1], text: '9th march hq'},
  {user: userIds[2], text: '18th jan wfh'},
  {user: userIds[3], text: '18th february tileyard'},
  {user: userIds[0], text: '2022-10-14 hw'},
  {user: userIds[1], text: 'next friday HQ'},
  {user: userIds[2], text: '<@U837468746|Buddy>'},
  {user: userIds[3], text: '<@U837468734>'},
  {user: userIds[3], text: '<@U04241SDADB>'},
  {user: userIds[3], text: '<@U04241SDADB> <@U837468734>'},
  {user: userIds[0], text: 'subscribe <@U837468746|Buddy>'},
  {user: userIds[1], text: "who's in 8th October Tileyard"},
  {user: userIds[2], text: "who's in tileyard ???"},
];

const database = createMemoryDatabase();

requests.forEach(async (request) => {
  const command = parseRequest(request.text, request.user);
  if (command) {
    const response = await processCommand(command, database);
    console.log(`${request.text} => ${response}`);
  }
});
