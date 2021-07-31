export type TListItem = {
    authorId: string;
    creationDate?: Date;
    body: string;
    links: string[];
    selectedBy: string[];
    _id: string;
};

export type TListItemCensored = {
    authorId: string;
    creationDate?: Date;
    body: string;
    links: string[];
    _id: string;
};

export type TitemTypes = 'listItem' | 'secretListItem';
