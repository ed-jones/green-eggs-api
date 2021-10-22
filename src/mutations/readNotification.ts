/**
 * Author: Edward Jones
 */
import * as Prisma from '@prisma/client';
import Errors from '../errors';
import * as Apollo from '../generated/graphql';
import prisma from '../prisma';
import { prismaToApolloNotification } from '../queries/notifications';

/**
 * Resolver that marks a notification as read for a logged in user.
 */
export default async (
  _parent: any,
  { notificationId }: Apollo.MutationReadNotificationArgs,
  context?: Prisma.User,
): Promise<Apollo.NotificationResult> => {
  try {
    // Find user to associate with notification
    if (!context?.id) {
      throw new Error(Errors.NO_CONTEXT);
    }
    const user = await prisma.user.findUnique({
      where: {
        id: context.id,
      },
    });
    if (!user?.id) {
      throw new Error(Errors.NO_USER);
    }

    const notification = await prisma.notification.update({
      where: {
        id: notificationId,
      },
      include: {
        concerns: true,
      },
      data: {
        read: true,
      },
    });

    return { data: prismaToApolloNotification(notification) };
  } catch ({ message }) {
    return {
      error: {
        message: message as string,
      },
    };
  }
};
