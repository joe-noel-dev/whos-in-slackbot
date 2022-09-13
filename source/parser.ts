import {allLocations, Command, CommandType, Location} from './command';

const getAliases = (location: Location): Array<string> => {
  switch (location) {
    case 'Remote':
      return ['wfh', 'WFH', 'Working from home', 'working from home', 'home'];
    case 'Tileyard':
      return ['ty', 'Tileyard', 'tileyard', 'London', 'Ampify', 'big smoke'];
    case 'HQ':
      return ['hq', 'High Wycombe', 'hw', 'HW', 'wycombe', 'Wycombe'];
  }
};

export const parseRequest = (request: string, user: string): Command | null => {
  let tokens = request.split(' ');
  let type: CommandType | undefined = undefined;
  let location: Location | undefined = undefined;

  tokens.forEach((token, index) => {
    if (token === 'default') {
      type = 'update-default';
    }

    allLocations.forEach((loc) => {
      if (token === loc) {
        location = loc;
      } else {
        const aliases = getAliases(loc);
        aliases.forEach((alias) => {
          if (token === alias) location = loc;
        });
      }
    });
  });

  if (type === 'update-default' && location) {
    return {
      user,
      type,
      location,
    };
  }

  return null;
};
