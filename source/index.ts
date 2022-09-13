import {createMemoryDatabase} from './database';
import {parseRequest} from './parser';
import {processCommand} from './processor';
import express from 'express';
import {WebClient} from '@slack/web-api';

const database = createMemoryDatabase();
const port = process.env.PORT ? parseInt(process.env.PORT) : 8000;
const app = express();
app.use(express.json());

const slackToken = process.env.SLACK_TOKEN || 'DUMMY_TOKEN';
const slack = new WebClient(slackToken);

app.get('/', async (request, response) => {
  response.status(200).send('All good my end');
});

app.post('/', async (request, response) => {
  const payload = request.body;

  console.log(payload);

  if (payload.challenge) {
    response.send({challenge: payload.challenge});
    return;
  }

  if (payload.event && payload.event.type === 'app_mention') {
    const request = payload.event.text;
    const user = payload.event.user;
    const command = parseRequest(request, user);
    if (command) {
      const reply = await processCommand(command, database);

      await slack.chat.postMessage({
        channel: user,
        text: reply,
      });
    } else {
      await slack.chat.postMessage({
        channel: user,
        text: ':shrug:',
      });
    }

    response.sendStatus(200);
    return;
  }

  response.sendStatus(404);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
