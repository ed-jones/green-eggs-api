/**
 * Author: Edward Jones
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
