export type CommandType =
  | 'update-default'
  | 'update-location'
  | 'get-user-location'
  | 'subscribe-to-user'
  | 'get-location';

export interface Command {
  user: string;

  type: CommandType;

  location?: Location;
  date?: Date;
  otherUser?: string;
}

export type Location = 'Remote' | 'Tileyard' | 'HQ';

export const allLocations: Array<Location> = ['Remote', 'Tileyard', 'HQ'];
