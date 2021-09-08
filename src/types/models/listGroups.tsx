import {
    TYPE_PERM_ALL_LIST_GROUP,
    TYPE_PERM_BASIC_LIST_ALL,
    TYPE_PERM_GIFT_GROUP_ALL,
    TYPE_PERM_GIFT_GROUP_CHILD_ALL,
    TYPE_PERM_GIFT_LIST_ALL,
} from '../listGroupPermissions';
import { BASIC_LIST, GIFT_GROUP, GIFT_GROUP_CHILD, GIFT_LIST } from '../listVariants';
import { IbasicListItem, IgiftListItem, IgiftListItemCensored } from './listItems';

// Shared
interface IlistGroupBaseFields {
    groupName: string;
    creationDate: Date;
    groupVariant: string;
    _id: string;
}

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

interface IbasicListExtraFields {
    members: IbasicListMember[];
    maxListItems: Number;
    listItems: IbasicListItem[];
    groupVariant: typeof BASIC_LIST;
}

export type TbasicListFields = IlistGroupBaseFields & IbasicListExtraFields;

// Gift Lists
export interface IgiftListMember extends IgroupMemberBase {
    permissions: TYPE_PERM_GIFT_LIST_ALL[];
}

interface IgiftListExtraFields {
    members: IgiftListMember[];
    maxListItems: Number;
    listItems: IgiftListItem[];
    maxSecretListItemsEach: Number;
    secretListItems: IgiftListItem[];
    parentGroupId: string;
    groupVariant: typeof GIFT_LIST;
}

interface IgiftListExtraFieldsCensored {
    members: IgiftListMember[];
    maxListItems: Number;
    listItems: IgiftListItemCensored[];
    maxSecretListItemsEach: Number;
    secretListItems: IgiftListItemCensored[] | undefined;
    parentGroupId: string;
    groupVariant: typeof GIFT_LIST;
}

export type TgiftListFields = IlistGroupBaseFields & IgiftListExtraFields;
export type TgiftListFieldsCensored = IlistGroupBaseFields & IgiftListExtraFieldsCensored;

// Parent Groups
// Gift Groups
export interface IgiftGroupMember extends IgroupMemberBase {
    permissions: TYPE_PERM_GIFT_GROUP_ALL[];
}

interface IgiftGroupExtraFields {
    members: IgiftGroupMember[];
    children: TgiftListFieldsCensored[];
    groupVariant: typeof GIFT_GROUP;
}

export type TgiftGroupFields = IlistGroupBaseFields & IgiftGroupExtraFields;

// Child Groups
export interface IgiftGroupChildMember extends IgroupMemberBase {
    permissions: TYPE_PERM_GIFT_GROUP_CHILD_ALL[];
}

interface IgiftGroupChildExtraFields {
    members: IgiftGroupChildMember[];
    parentGroupId: string;
    maxListItems: Number;
    listItems: IgiftListItem[];
    maxSecretListItemsEach: Number;
    secretListItems: IgiftListItem[];
    groupVariant: typeof GIFT_GROUP_CHILD;
}

interface IgiftGroupChildExtraFieldsCensored {
    members: IgiftGroupChildMember[];
    parentGroupId: string;
    maxListItems: Number;
    listItems: IgiftListItemCensored[];
    maxSecretListItemsEach: Number;
    secretListItems: IgiftListItemCensored[] | undefined;
    groupVariant: typeof GIFT_GROUP_CHILD;
}

export type TgiftGroupChildFields = IlistGroupBaseFields & IgiftGroupChildExtraFields;
export type TgiftGroupChildFieldsCensored = IlistGroupBaseFields & IgiftGroupChildExtraFieldsCensored;

// Aggregate

export type TlistGroupAnyFieldsUncensored =
    | TbasicListFields
    | TgiftListFields
    | TgiftGroupFields
    | TgiftGroupChildFields;
export type TlistGroupAnyFieldsCensored =
    | TbasicListFields
    | TgiftListFieldsCensored
    | TgiftGroupFields
    | TgiftGroupChildFieldsCensored;

type Tchildren = {
    children?: TListGroupAnyFields[];
};

interface IprocessedGroupFields {
    currentListUser: TgroupMemberAny;
}

export type TListGroupAnyFields = TlistGroupAnyFieldsUncensored & TlistGroupAnyFieldsCensored & Tchildren;

export type TProcessedListGroupAnyFields = TListGroupAnyFields & IprocessedGroupFields;

export type TgroupMemberAny = IbasicListMember & IgiftListMember & IgiftGroupMember & IgiftGroupChildMember;
