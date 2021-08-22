// Base model

export interface TuserMessageFields {
    groupId: string;
    body: string;
    creationDate: Date;
    messageVariant: 'USER_MESSAGE';
    author: string;
    _id: string;
}

// System messages

export interface TsystemMessageFields {
    groupId: string;
    body: string;
    creationDate: Date;
    messageVariant: 'SYSTEM_MESSAGE';
    _id: string;
}

// Aggregate

export type TmessageAny = TuserMessageFields | TsystemMessageFields;
