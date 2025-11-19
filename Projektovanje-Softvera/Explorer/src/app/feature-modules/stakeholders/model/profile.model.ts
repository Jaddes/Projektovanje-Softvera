export interface Profile {
  name: string;
  surname: string;
  biography?: string | null;
  motto?: string | null;
  profilePictureUrl?: string | null;
}

export type ProfilePayload = Profile;
