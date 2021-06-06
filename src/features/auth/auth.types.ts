export type stateType = {
    isUserLogin: boolean,
    status: string,
    token: string,
    firstname: string,
    profile_pic: string,
}
export type signinData = {
    success: boolean,
    id: string,
    firstname: string,
    lastname: string,
    email: string,
}

export type loginData = {
    success: boolean,
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    profile_pic: string,
    bio: string,
    url: string
    following: Array<any>,
    followers: Array<any>,
}
export type reducerType = {
    auth: stateType
}

export type LoginType = {
    email: string,
    password: string
}

export type SignInType = {
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    password: string
}

export type AddUserType = {
    bio: string,
    URL: string,
    image: string
}

export type ReceivedUserType = {
    success: boolean,
    profile_pic: string,
    bio: string,
    url: string
}