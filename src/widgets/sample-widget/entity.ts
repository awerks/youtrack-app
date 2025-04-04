export interface Project {
  id: string;
  archived: boolean;
  createdBy: User | null;
  description: string | null;
  fromEmail: string;
  iconUrl: string | null;
  leader: User | null;
  name: string | null;
  replyToEmail: string | null;
  shortName: string | null;
  startingNumber: number;
  template: boolean;
}

export interface User {
  id: string;
  login: string;
  fullName: string;
  email: string | null;
  ringId: string | null;
  guest: boolean;
  online: boolean;
  banned: boolean;
  avatarUrl: string;
}
