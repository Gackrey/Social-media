export type follow = {
  name: string;
  profile_pic: string;
  userID: string;
};
export type authStateType = {
  isUserLogin: boolean;
  id: string;
  status: string;
  token: string;
  firstname: string;
  profile_pic: string;
  following: Array<follow>;
  followers: Array<follow>;
};
export type signinData = {
  success: boolean;
  id: string;
  firstname: string;
  lastname: string;
  email: string;
};

export type loginData = {
  success: boolean;
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  profile_pic: string;
  bio: string;
  url: string;
  following: Array<follow>;
  followers: Array<follow>;
};
export type authReducerType = {
  auth: authStateType;
};

export type LoginType = {
  email: string;
  password: string;
};

export type SignInType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  password: string;
};

export type AddUserType = {
  bio: string;
  URL: string;
  image: string;
};

export type ReceivedUserType = {
  success: boolean;
  profile_pic: string;
};
export type jwt_decoded = {
  id: string;
  iat: number;
};
export type updateUserType = {
  bio: string;
  URL: string;
  image: string;
  token: string;
};
export type updateAccountWithoutPasswordType = {
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  token: string;
};
export type updateAccountWithPasswordType = {
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  oldpassword: string;
  newpassword: string;
  token: string;
};
export type getUserType = {
  _id: string;
};
export type reqFollowType = {
  _id: string;
  firstname: string;
  lastname: string;
  profile_pic: string;
  token: string;
};
export type reqUnFollowType = {
  _id: string;
  token: string;
};
export type respFollowtype = {
  success: boolean;
  updatedFollowing: Array<follow>;
};

export type saveClick = {
  screen: string;
  box: string;
};
export type followModalType = {
  tabs: number;
  following: Array<follow>;
  follower: Array<follow>;
  state: saveClick;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};
