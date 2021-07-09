import {
    TYPE_PERM_ALL_LIST_GROUP,
    TYPE_PERM_BASIC_LIST_ALL,
    TYPE_PERM_GIFT_GROUP_ALL,
    TYPE_PERM_GIFT_GROUP_CHILD_ALL,
    TYPE_PERM_GIFT_LIST_ALL,
} from './listGroupPermissions';
import { TListItem, TListItemCensored } from './listItems';

// Shared
type TlistGroupBaseFields = { groupName: string; creationDate?: Date; groupVariant: string; _id: string };

interface IgroupMemberBase {
    userId: string;
    oldestReadMessage?: Date | undefined;
    permissions: TYPE_PERM_ALL_LIST_GROUP[];
}
// Singular Groups
// Basic Lists

interface IbasicListMember extends IgroupMemberBase {
    permissions: TYPE_PERM_BASIC_LIST_ALL[];
}

type TbasicListExtraFields = {
    owner: IbasicListMember;
    members: [IbasicListMember];
    maxListItems: Number;
    listItems: TListItem[];
};

export type TbasicListFields = TlistGroupBaseFields & TbasicListExtraFields;

// Gift Lists
export interface IgiftListMember extends IgroupMemberBase {
    permissions: TYPE_PERM_GIFT_LIST_ALL[];
}

type TgiftListExtraFields = {
    owner: IgiftListMember;
    members: [IgiftListMember];
    maxListItems: Number;
    listItems: TListItem[];
    maxSecretListItemsEach: Number;
    secretListItems: TListItem[];
};

type TgiftListExtraFieldsCensored = {
    owner: IgiftListMember;
    members: [IgiftListMember];
    maxListItems: Number;
    listItems: TListItemCensored[];
    maxSecretListItemsEach: Number;
};

export type TgiftListFields = TlistGroupBaseFields & TgiftListExtraFields;
export type TgiftListFieldsCensored = TlistGroupBaseFields & TgiftListExtraFieldsCensored;

// Parent Groups
// Gift Groups
interface IgiftGroupMember extends IgroupMemberBase {
    permissions: TYPE_PERM_GIFT_GROUP_ALL[];
}

type TgiftGroupExtraFields = {
    owner: IgiftGroupMember;
    members: [IgiftGroupMember];
};

export type TgiftGroupFields = TlistGroupBaseFields & TgiftGroupExtraFields;

// Child Groups
export interface IgiftGroupChildMember extends IgroupMemberBase {
    permissions: TYPE_PERM_GIFT_GROUP_CHILD_ALL[];
}

type TgiftGroupChildExtraFields = {
    owner: IgiftGroupChildMember;
    members: [IgiftGroupChildMember];
    parentGroupId: string;
    maxListItems: Number;
    listItems: TListItem[];
    maxSecretListItemsEach: Number;
    secretListItems: TListItem[];
};

type TgiftGroupChildExtraFieldsCensored = {
    owner: IgiftGroupChildMember;
    members: [IgiftGroupChildMember];
    parentGroupId: string;
    maxListItems: Number;
    listItems: TListItemCensored[];
    maxSecretListItemsEach: Number;
};

export type TgiftGroupChildFields = TlistGroupBaseFields & TgiftGroupChildExtraFields;
export type TgiftGroupChildFieldsCensored = TlistGroupBaseFields & TgiftGroupChildExtraFieldsCensored;

// Aggregate

export type TlistGroupAnyFieldsUncensored = TbasicListFields &
    TgiftListFields &
    TgiftGroupFields &
    TgiftGroupChildFields;
export type TlistGroupAnyFieldsCensored = TbasicListFields &
    TgiftListFieldsCensored &
    TgiftGroupFields &
    TgiftGroupChildFieldsCensored;

type Tchildren = {
    children?: TListGroupAnyFields[];
};

export type TListGroupAnyFields = TlistGroupAnyFieldsUncensored & TlistGroupAnyFieldsCensored & Tchildren;
