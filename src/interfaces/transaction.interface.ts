export interface transfer{
    amount: number,
    creditor: number
}

export interface SignIn{
    email: string,
    password: string
}

export interface TransactionHistory{
    type: string,
      reference: string,
      slug: string,
      creditor: string,
      debtor: string,
}