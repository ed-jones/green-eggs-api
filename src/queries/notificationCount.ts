import * as Prisma from '@prisma/client';
import * as Apollo from '../generated/graphql';
import prisma from '../prisma';

const Notifications = async (
  _parent: any,
  _args: any,
  context?: Prisma.User,
): Promise<Apollo.NotificationCountResult> => {
  const notifications = await prisma.notification.findMany({
    where: {
      forId: context?.id,
    },
  });

  return { data: { notificationCount: notifications.length } };
};

export default Notifications;
