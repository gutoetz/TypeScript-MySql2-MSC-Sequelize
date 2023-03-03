import { IUser, ITeam } from '../interfaces/Interfaces';

const teams: ITeam[] = [
  { id: 1, teamName: 'Avaí/Kindermann' },
  { id: 2, teamName: 'Bahia' },
  { id: 3, teamName: 'Botafogo' },
  { id: 4, teamName: 'Corinthians' },
  { id: 5, teamName: 'Cruzeiro' },
  { id: 6, teamName: 'Ferroviária' },
  { id: 7, teamName: 'Flamengo' },
  { id: 8, teamName: 'Grêmio' },
  { id: 9, teamName: 'Internacional' },
  { id: 10, teamName: 'Minas Brasília' },
  { id: 11, teamName: 'Napoli-SC' },
  { id: 12, teamName: 'Palmeiras' },
  { id: 13, teamName: 'Real Brasília' },
  { id: 14, teamName: 'Santos' },
  { id: 15, teamName: 'São José-SP' },
  { id: 16, teamName: 'São Paulo' },
];

const team: ITeam = { id: 2, teamName: 'Bahia' };

const user: IUser = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

const userDb = { dataValues:
  {
    id: 2,
    email: 'admin@admin.com',
    password: 'dasdas2',
    role: 'admin',
  },
};

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlk
IjoxLCJpYXQiOjE2Nzc4NzE3NDcsImV4cCI6MTY3ODQ3NjU0N30.rpxV8zA2lL1TXIR4qqwT4K30n1tungG_eyrN4cHGdWA`;
export { teams, team, user, token, userDb };
