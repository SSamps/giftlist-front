export interface IgiftListItem {
    authorId: string;
    creationDate?: Date;
    body: string;
    links: string[];
    selectedBy: string[];
    _id: string;
}

export interface IgiftListItemCensored {
    authorId: string;
    creationDate?: Date;
    body: string;
    links: string[];
    selectedBy?: string[];
    _id: string;
}

export interface IbasicListItem {
    authorId: string;
    creationDate?: Date;
    body: string;
    links: string[];
    selected: boolean;
    _id: string;
}

export type TitemTypes = 'listItem' | 'secretListItem';
