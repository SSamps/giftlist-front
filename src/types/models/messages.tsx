// Base model

export type USER_MESSAGE = 'USER_MESSAGE';
export type SYSTEM_MESSAGE = 'SYSTEM_MESSAGE';

export interface TuserMessageFields {
    groupId: string;
    body: string;
    creationDate: string;
    messageVariant: 'USER_MESSAGE';
    _id: string;
    authorId: string;
    authorName: string;
}

// System messages

export interface TsystemMessageFields {
    groupId: string;
    body: string;
    creationDate: string;
    messageVariant: 'SYSTEM_MESSAGE';
    _id: string;
}

// Aggregate

export type TmessageAny = TuserMessageFields | TsystemMessageFields;
