import {Command} from './command';
import {Database} from './database';

export const processCommand = async (
  command: Command,
  database: Database
): Promise<string> => {
  if (command.type === 'update-default' && command.location) {
    await database.setDefault(command.user, command.location);
    return `Updated default to ${command.location}`;
  }

  return '';
};
