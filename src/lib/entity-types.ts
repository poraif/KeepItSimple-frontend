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

export interface TermAndCurrentVersion {
    name: string;
    category: string;
    shortDef: string;
    longDef: string;
    codeSnippet: string;
    exampleUsage: string;
}