import { DecodedAuth, UserType } from "@/constants/data";
import { jwtDecode } from "jwt-decode";

export function DecodeAuth(token: string): {
  uid: number;
  user_type: UserType;
} {
  const payload: DecodedAuth = jwtDecode(token);
  return payload.data;
}
