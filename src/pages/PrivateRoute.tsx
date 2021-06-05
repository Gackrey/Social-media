import { Route, Navigate } from "react-router-dom";

export function PrivateRoute({ path, ...props }: any) {
    const localData = localStorage?.getItem("Authorbook")
    let isUserLogin;
    if (localData) {
        const loginStatus = JSON.parse(localData);
        isUserLogin = loginStatus?.isUserLoggedIn
    }
    console.log(isUserLogin);

    return isUserLogin ? (
        <Route {...props} path={path} />
    ) : (
        <Navigate replace to="/signup" />
    );
}