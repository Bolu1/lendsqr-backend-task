export interface SignUp{
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    phone: string
}

export interface SignIn{
    email: string,
    password: string
}

export interface SignInResponse{
    id: string,
    firstName: string,
    lastName: string,
    accountNumber: number,
    balance: number,
    token: string
}

export interface UserInformation{
    id: number,
    slug: string,
    account_number: number,
    password: string,
    balance: number,
    firstname: string,
    lastname: string,
    phone: string,
    email: string,
}