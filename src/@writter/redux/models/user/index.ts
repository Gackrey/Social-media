import { postState } from "../post";
import { follow } from "../auth";

export type userStateType = {
  users: userDet[];
  userStatus: string;
};

export type getUserListType = {
  results: userDet[];
};

export type userReducerType = {
  user: userStateType;
};

export type userDet = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  url: string;
  bio: string;
  profile_pic: string;
  following: Array<follow>;
  followers: Array<follow>;
  posts: Array<postState>;
};
