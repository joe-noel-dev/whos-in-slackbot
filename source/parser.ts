import {Command, Location} from './command';

const getAliases = (location: Location): Array<string> => {
  switch (location) {
    case 'Remote':
      return ['wfh', 'WFH', 'Working from home', 'working from home', 'home'];
    case 'Tileyard':
      return ['ty', 'Tileyard', 'tileyard', 'London', 'Ampify', 'big smoke'];
    case 'HQ':
      return ['hq', 'High Wycombe', 'hw', 'HW'];
  }
};

export const parseRequest = (
  request: string,
  userId: string
): Command | null => {
  if (request.includes('default wfh')) {
    return {
      user: userId,
      type: 'update-default',
      location: 'Remote',
    };
  }

  return null;
};
