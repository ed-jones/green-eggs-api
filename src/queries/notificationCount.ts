/**
 * Author: Edward Jones
 */
import * as Prisma from '@prisma/client';
import * as Apollo from '../generated/graphql';
import prisma from '../prisma';

/**
 * Resolver that returns the number of unread notifications for the logged in user.
 */
const Notifications = async (
  _parent: any,
  _args: any,
  context?: Prisma.User,
): Promise<Apollo.NotificationCountResult> => {
  const notifications = await prisma.notification.findMany({
    where: {
      AND: [
        {
          forId: context?.id,
        },
        {
          read: false,
        },
        {
          concernsId: {
            not: context?.id,
          },
        },
      ],
    },
  });

  return { data: { notificationCount: notifications.length } };
};

export default Notifications;
