import {
    TYPE_PERM_ALL_LIST_GROUP,
    TYPE_PERM_BASIC_LIST_ALL,
    TYPE_PERM_GIFT_GROUP_ALL,
    TYPE_PERM_GIFT_GROUP_CHILD_ALL,
    TYPE_PERM_GIFT_LIST_ALL,
} from '../listGroupPermissions';
import { IbasicListItem, IgiftListItem, IgiftListItemCensored } from './listItems';

// Shared
type TlistGroupBaseFields = { groupName: string; creationDate?: Date; groupVariant: string; _id: string };

interface IgroupMemberBase {
    userId: string;
    displayName: string;
    oldestReadMessage?: Date | undefined;
    permissions: TYPE_PERM_ALL_LIST_GROUP[];
}
// Singular Groups
// Basic Lists

export interface IbasicListMember extends IgroupMemberBase {
    permissions: TYPE_PERM_BASIC_LIST_ALL[];
}

type TbasicListExtraFields = {
    members: IbasicListMember[];
    maxListItems: Number;
    listItems: IbasicListItem[];
};

export type TbasicListFields = TlistGroupBaseFields & TbasicListExtraFields;

// Gift Lists
export interface IgiftListMember extends IgroupMemberBase {
    permissions: TYPE_PERM_GIFT_LIST_ALL[];
}

type TgiftListExtraFields = {
    members: IgiftListMember[];
    maxListItems: Number;
    listItems: IgiftListItem[];
    maxSecretListItemsEach: Number;
    secretListItems: IgiftListItem[];
};

type TgiftListExtraFieldsCensored = {
    members: IgiftListMember[];
    maxListItems: Number;
    listItems: IgiftListItemCensored[];
    maxSecretListItemsEach: Number;
    secretListItems: IgiftListItemCensored[] | undefined;
};

export type TgiftListFields = TlistGroupBaseFields & TgiftListExtraFields;
export type TgiftListFieldsCensored = TlistGroupBaseFields & TgiftListExtraFieldsCensored;

// Parent Groups
// Gift Groups
interface IgiftGroupMember extends IgroupMemberBase {
    permissions: TYPE_PERM_GIFT_GROUP_ALL[];
}

type TgiftGroupExtraFields = {
    members: IgiftGroupMember[];
};

export type TgiftGroupFields = TlistGroupBaseFields & TgiftGroupExtraFields;

// Child Groups
export interface IgiftGroupChildMember extends IgroupMemberBase {
    permissions: TYPE_PERM_GIFT_GROUP_CHILD_ALL[];
}

type TgiftGroupChildExtraFields = {
    members: IgiftGroupChildMember[];
    parentGroupId: string;
    maxListItems: Number;
    listItems: IgiftListItem[];
    maxSecretListItemsEach: Number;
    secretListItems: IgiftListItem[];
};

type TgiftGroupChildExtraFieldsCensored = {
    members: IgiftGroupChildMember[];
    parentGroupId: string;
    maxListItems: Number;
    listItems: IgiftListItemCensored[];
    maxSecretListItemsEach: Number;
    secretListItems: IgiftListItemCensored[] | undefined;
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

interface IprocessedGroupFields {
    currentUser: TgroupMemberAny;
}

export type TListGroupAnyFields = TlistGroupAnyFieldsUncensored & TlistGroupAnyFieldsCensored & Tchildren;

export type TProcessedListGroupAnyFields = TListGroupAnyFields & IprocessedGroupFields;

export type TgroupMemberAny = IbasicListMember & IgiftListMember & IgiftGroupMember & IgiftGroupChildMember;
