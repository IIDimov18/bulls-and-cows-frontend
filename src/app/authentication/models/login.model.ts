export type loginParams = {
    email: string,
    password: string,
    rememberMe: boolean
};
export type loginResponse = {
    error: string,
    token: string,
    username: string
}