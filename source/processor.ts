import {Command, Location} from './command';
import {Database, Whoern} from './database';

export const processCommand = async (
  command: Command,
  database: Database
): Promise<string> => {
  if (command.type === 'update-default' && command.location) {
    await database.setDefault(command.user, command.location);
    return `Updated default to ${command.location}`;
  }

  if (command.type === 'update-location' && command.location && command.date) {
    const whoern: Whoern = {
      user: command.user,
      date: command.date,
      location: command.location,
    };
    await database.setWhoerns([whoern]);
    return `Updated your location on ${command.date.getDay()} to ${
      command.location
    }`;
  }

  if (command.type === 'get-user-location' && command.otherUser) {
    const whoerns = await database.getWhoernsForUser(command.otherUser);
    whoerns.sort((lhs, rhs) => lhs.date.getTime() - rhs.date.getTime());
    let response = 'User is in on the following date(s):\n';

    const emojiGivenLocation: {[key: string]: string} = {
      Remote: ':desert_island:',
      Tileyard: ':hot-desking:',
      HQ: ':motorway:',
    };

    whoerns.forEach(
      (w) =>
        (response += `\t- ${w.date.toDateString()} : ${w.location} ${
          emojiGivenLocation[w.location]
        }\n`)
    );
    return response;
  }

  if (command.type === 'get-location' && command.location && command.date) {
    let whoerns = await database.getWhoernsForLocation(command.location);
    whoerns = whoerns.filter(
      (w) => w.date.toDateString() === command.date?.toDateString()
    );

    if (whoerns.length === 0) {
      return `No one will be at ${
        command.location
      } on ${command.date.toDateString()}. SAD :crying_cat_face:\n`;
    }

    const people = whoerns.map((w) => `<@${w.user}>`).join(', ');
    return `${people} are at ${
      command.location
    } on ${command.date.toDateString()}.\n`;
  }

  if (command.type === 'get-location' && command.location) {
    let whoerns = await database.getWhoernsForLocation(command.location);

    whoerns = whoerns
      .filter((w) => w.date.getDate() > new Date().getDate() + 7)
      .sort((lhs, rhs) => lhs.date.getTime() - rhs.date.getTime());

    let response = 'These people are at Tileyard on the following dates:\n';

    whoerns
      .reduce((map, whoern) => {
        const date = whoern.date.toDateString();
        if (!map.has(date)) {
          map.set(date, []);
        }
        map.get(date)?.push(whoern.user);
        return map;
      }, new Map<string, string[]>())
      .forEach(
        (users, date) =>
          (response += `\t- ${date} : ${users
            .map((id) => `<@${id}>`)
            .join(', ')}\n`)
      );
    return response;
  }
  return '';
};
