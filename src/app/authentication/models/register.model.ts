export type registerParams = {
    username: string,
    email: string,
    password: string,
    confirmPassword: boolean
};
export type registerResponse = {
    error: string,
    registered:boolean
}