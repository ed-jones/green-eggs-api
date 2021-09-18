import { User as PrismaUser } from '@prisma/client';

import { MutationEditProfileArgs, EditProfileResult, User as ApolloUser, Privacy as ApolloPrivacy } from '../generated/graphql';
import prisma from '../prisma';
import Errors from '../errors';
import fileUpload from '../core/file-upload/fileUpload';
import prismaToApolloFullUser from '../core/user/prismaToApolloFullUser';
import fullUserArgs from '../core/user/fullUserArgs';

const editProfile = async (
  _: any,
  {profileDetails: { firstName, lastName, bio, profileImage } }: MutationEditProfileArgs,
  context?: PrismaUser
): Promise<EditProfileResult> => {
  try {
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
    let fileURI: string | undefined | null = undefined;
    if (profileImage) {
      const { createReadStream, filename } = await profileImage;
      fileURI = await fileUpload(filename, createReadStream);
      if (!fileURI) {
        throw new Error('Failed to upload image');
      }  
    }

    const editUser = await prisma.user.update({
      ...fullUserArgs,
      where: {
        id: context.id,
      },
      data: {
        firstName: firstName as string,
        lastName: lastName as string,
        bio: bio as string,
        avatarURI: fileURI
      }
    })


    return { data: prismaToApolloFullUser(editUser) };
  } catch ({ message }) {
    return {
      error: {
        message,
        },
      };
    }
};

export default editProfile;
