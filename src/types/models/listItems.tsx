export type TListItem = {
    authorId: string;
    creationDate?: Date;
    body: String;
    link?: String;
    selectedBy: string[];
    _id: string;
};

export type TListItemCensored = {
    authorId: string;
    creationDate?: Date;
    body: String;
    link?: String;
    _id: string;
};

export type TitemTypes = 'listItem' | 'secretListItem';
