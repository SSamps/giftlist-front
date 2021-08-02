export type TgiftListItem = {
    authorId: string;
    creationDate?: Date;
    body: string;
    links: string[];
    selectedBy: string[];
    _id: string;
};

export type TgiftListItemCensored = {
    authorId: string;
    creationDate?: Date;
    body: string;
    links: string[];
    _id: string;
};

export type TbasicListItem = {
    authorId: string;
    creationDate?: Date;
    body: string;
    links: string[];
    selected: boolean;
    _id: string;
};

export type TitemTypes = 'listItem' | 'secretListItem';
