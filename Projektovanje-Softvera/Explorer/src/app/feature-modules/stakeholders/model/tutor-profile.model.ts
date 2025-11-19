export interface TutorProfile {
  name: string;
  surname: string;
  biography?: string | null;
  motto?: string | null;
  profilePictureUrl?: string | null;
}

export type TutorProfilePayload = TutorProfile;
