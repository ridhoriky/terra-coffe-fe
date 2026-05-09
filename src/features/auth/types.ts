export type UserRole = "user" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  avatarUrl?: string | undefined;
  authProvider: "email" | "google";
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: AuthUser;
    accessToken: string;
  };
}
