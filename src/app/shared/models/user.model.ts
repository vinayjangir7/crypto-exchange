export interface User {
  uid: string;
  email: string | null;
  photoURL?: string | null;
  displayName?: string | null;
  myCustomData?: string | null;
}
