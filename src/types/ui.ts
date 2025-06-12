import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
import { IconType } from "react-icons";

export interface SocialIcon {
  icon: IconType;
  color: string;
}

export const SocialIcons: SocialIcon[] = [
  { icon: FaFacebook, color: "#3b5998" },
  { icon: FaGoogle, color: "red" },
  { icon: FaTwitter, color: "#1da1f2" },
];

export interface userType {
  _id: string;
  adminRole: string;
  firstname: string;
  username: string;
  lastname: string;
  email: string;
  role: string;
}
