import {
    IbasicListMember,
    IgiftGroupChildMember,
    IgiftGroupMember,
    IgiftListMember,
    TbasicListFields,
    TgiftGroupChildFieldsCensored,
    TgiftGroupFields,
    TgiftListFieldsCensored,
} from '../types/models/listGroups';

export const findUserInGroup = (
    group: TbasicListFields | TgiftListFieldsCensored | TgiftGroupFields | TgiftGroupChildFieldsCensored,
    userId: string
): IbasicListMember | IgiftListMember | IgiftGroupMember | null => {
    for (let member of group.members) {
        if (member.userId.toString() === userId.toString()) {
            return member;
        }
    }

    return null;
};

export const findOwnerInGroup = (
    group: TbasicListFields | TgiftListFieldsCensored | TgiftGroupFields | TgiftGroupChildFieldsCensored
): IbasicListMember | IgiftListMember | IgiftGroupMember | IgiftGroupChildMember | null => {
    for (let member of group.members) {
        if (member.permissions.includes('GROUP_OWNER')) {
            return member;
        }
    }
    return null;
};

export const formatMessageDateTag = (inputDate: string) => {
    const date = new Date(inputDate);
    const ageSeconds = (Date.now() - date.getTime()) / 1000;
    if (ageSeconds < 1) {
        return 'Just now';
    }
    if (ageSeconds < 60) {
        return `${Math.round(ageSeconds)} seconds ago`;
    }
    if (ageSeconds < 3600) {
        return `${Math.round(ageSeconds / 60)} minutes ago`;
    }
    if (ageSeconds < 86400) {
        return `${Math.round(ageSeconds / 3600)} hours ago`;
    }
    return date.toLocaleDateString(undefined, { day: 'numeric', month: 'numeric', year: 'numeric' });
};

export const formatJoinDate = (inputDate: string) => {
    const date = new Date(inputDate);
    return date.toLocaleDateString(undefined, { day: 'numeric', month: 'numeric', year: 'numeric' });
};
