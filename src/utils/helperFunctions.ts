import { TgroupMemberAny, TListGroupAnyFields } from '../types/models/listGroups';

export const findUserInGroup = (group: TListGroupAnyFields, userId: string): TgroupMemberAny | null => {
    for (let member of group.members) {
        if (member.userId.toString() === userId.toString()) {
            return member;
        }
    }

    return null;
};
