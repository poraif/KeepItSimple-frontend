export interface Term {
    name: string;
    category: string;
}

export interface TermVersion {
    shortDef: string;
    longDef: string;
    codeSnippet: string;
    exampleUsage: string;
}

export interface UserLogin {
    username: string;
    password: string;
}

export interface UserSignup {
    email: string;
    username: string;
    password: string;
}

export interface UserDetails {
    username: string;
    role: string;
}

export interface tokenPayload {
    sub: string;
    iat: string;
    exp: string;
    role: string;
}



export interface TermAndCurrentVersion {
    id: bigint;
    name: string;
    category: string;
    shortDef: string;
    longDef: string;
    codeSnippet: string;
    exampleUsage: string;
    username: string;
    loggedInUserVote: number;
}

export interface UnapprovedVersion {
    id: bigint;
    name: string;
    username: string;
}


export interface AddTermAndVersion {
    name: string;
    category: string;
    shortDef: string;
    longDef: string;
    codeSnippet: string;
    exampleUsage: string;
}

export interface TermCollection {
    name: string,
    description: string
}