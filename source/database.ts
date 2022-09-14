import {Location} from './command';

export interface Whoern {
  user: string;
  date: Date;
  location: Location;
}

export interface Database {
  getDefault: (userId: string) => Promise<Location | undefined>;
  setDefault: (userId: string, location: Location) => Promise<void>;

  getWhoernsForUser: (userId: string) => Promise<Array<Whoern>>;
  getWhoernsForDate: (date: Date) => Promise<Array<Whoern>>;
  getWhoernsForLocation: (location: Location) => Promise<Array<Whoern>>;

  setWhoerns: (whoerns: Array<Whoern>) => Promise<void>;
}

export const createMemoryDatabase = (): Database => {
  let data: Array<Whoern> = [];
  const defaults = new Map<string, Location>();

  return {
    getDefault: (userId: string) => Promise.resolve(defaults.get(userId)),
    setDefault: (userId: string, location: Location) => {
      defaults.set(userId, location);
      return Promise.resolve();
    },

    getWhoernsForUser: (userId: string) =>
      Promise.resolve(data.filter((whoern) => whoern.user === userId)),
    getWhoernsForDate: (date: Date) =>
      Promise.resolve(
        data.filter(
          (whoern) => whoern.date.toDateString() === date.toDateString()
        )
      ),
    getWhoernsForLocation: (location: Location) =>
      Promise.resolve(data.filter((whoern) => whoern.location === location)),

    setWhoerns: (whoerns: Array<Whoern>) =>
      Promise.resolve(
        whoerns.forEach((newWhoern) => {
          data = data.filter(
            (whoern) =>
              !(
                newWhoern.date === whoern.date && newWhoern.user === whoern.user
              )
          );
          data = data.concat(whoerns);
        })
      ),
  };
};
