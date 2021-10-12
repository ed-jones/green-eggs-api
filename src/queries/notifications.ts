import * as Prisma from '@prisma/client';
import prismaToApolloUser from '../core/user/prismaToApolloUser';

import * as Apollo from '../generated/graphql';
import prisma from '../prisma';

type FullPrismaNotificationType = Prisma.Notification & {
  concerns: Prisma.User;
}

export function prismaToApolloNotification(notification: FullPrismaNotificationType): Apollo.Notification {
  return ({
    ...notification,
    type: notification.type as Apollo.NotificationType,
    createdAt: String(notification.createdAt.getTime()),
    concerns: prismaToApolloUser(notification.concerns),
  });
}

const Notifications = async (
  _parent: any,
  { offset, limit }: Apollo.QueryNotificationsArgs,
  context?: Prisma.User,
): Promise<Apollo.NotificationsResult> => {
  const notifications = await prisma.notification.findMany({
    where: {
      forId: context?.id,
    },
    include: {
      concerns: true,
    },
    orderBy: [
      {
        createdAt: 'desc',
      }
    ],
    skip: offset,
    take: limit,
  });

  return { data: notifications.map((notification) => prismaToApolloNotification(notification)) };
};

export default Notifications;
