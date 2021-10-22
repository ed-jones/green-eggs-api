/**
 * Author: Edward Jones
 */

/**
 * Arguments for a prisma operation that includes all comment fields
 */
export default {
  include: {
    author: true,
    likedBy: true,
    replyTo: true,
    replies: {
      include: {
        author: true,
        replies: true,
        likedBy: true,
      },
    },
  },
};
