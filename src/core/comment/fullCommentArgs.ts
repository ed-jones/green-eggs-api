export default {
  include: {
    author: true,
    likedBy: true,
    replies: {
      include: {
        author: true,
        replies: true,
        likedBy: true,
      },
    },
  },
};
