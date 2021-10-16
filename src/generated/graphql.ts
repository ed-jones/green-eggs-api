import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ReadStream } from "fs-capacitor";
interface GraphQLFileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(options?:{encoding?: string, highWaterMark?: number}): ReadStream;
}

import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: Promise<GraphQLFileUpload>;
};

export type AllergiesResult = {
  __typename?: 'AllergiesResult';
  data: Array<Allergy>;
  error?: Maybe<Error>;
};

export type Allergy = {
  __typename?: 'Allergy';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type AllergyInput = {
  name: Scalars['String'];
};

export type AllergyPreferenceDetails = {
  allergies: Array<Scalars['String']>;
};

export type AuthResult = {
  __typename?: 'AuthResult';
  data?: Maybe<AuthResultData>;
  error?: Maybe<Error>;
};

export type AuthResultData = {
  __typename?: 'AuthResultData';
  token: Scalars['String'];
};

export type CategoriesResult = {
  __typename?: 'CategoriesResult';
  data: Array<Category>;
  error?: Maybe<Error>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['String'];
  name: Scalars['String'];
  coverImage?: Maybe<Scalars['String']>;
};

export type CategoryInput = {
  name: Scalars['String'];
};

export type ChangePasswordDetails = {
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
  confirmNewPassword: Scalars['String'];
};

export type ChangePasswordResult = {
  __typename?: 'ChangePasswordResult';
  error?: Maybe<Error>;
};

export type CommentResult = {
  __typename?: 'CommentResult';
  data?: Maybe<RecipeComment>;
  error?: Maybe<Error>;
};

export type DeleteAccountResult = {
  __typename?: 'DeleteAccountResult';
  error?: Maybe<Error>;
};

export type DeleteCommentResult = {
  __typename?: 'DeleteCommentResult';
  data?: Maybe<RecipeComment>;
  error?: Maybe<Error>;
};

export type Diet = {
  __typename?: 'Diet';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type DietInput = {
  name: Scalars['String'];
};

export type DietaryPreferenceDetails = {
  diets: Array<Scalars['String']>;
};

export type DietsResult = {
  __typename?: 'DietsResult';
  data: Array<Diet>;
  error?: Maybe<Error>;
};

export type EditProfileResult = {
  __typename?: 'EditProfileResult';
  data?: Maybe<FullUser>;
  error?: Maybe<Error>;
};

export type Error = {
  __typename?: 'Error';
  message: Scalars['String'];
};

export type File = {
  __typename?: 'File';
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  encoding: Scalars['String'];
};

export type FollowUserResult = {
  __typename?: 'FollowUserResult';
  data?: Maybe<User>;
  error?: Maybe<Error>;
};

export type FullUser = {
  __typename?: 'FullUser';
  id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  avatarURI?: Maybe<Scalars['String']>;
  verified: Scalars['Boolean'];
  visibility: Privacy;
  dietaryPreferences: Array<Diet>;
  allergyPreferences: Array<Allergy>;
  isFollowing?: Maybe<Scalars['Boolean']>;
  followingCount: Scalars['Int'];
  followerCount: Scalars['Int'];
  likeCount: Scalars['Int'];
  recipeCount: Scalars['Int'];
};

export type FullUserResult = {
  __typename?: 'FullUserResult';
  data?: Maybe<FullUser>;
  error?: Maybe<Error>;
};

export type FullUsersResult = {
  __typename?: 'FullUsersResult';
  data?: Maybe<Array<FullUser>>;
  error?: Maybe<Error>;
};

export type GenericIngredient = {
  __typename?: 'GenericIngredient';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  id: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Float']>;
  unit?: Maybe<Scalars['String']>;
};

export type IngredientInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Float']>;
  unit?: Maybe<Scalars['String']>;
};

export type IngredientsFilter = {
  includes?: Maybe<Array<Scalars['String']>>;
  excludes?: Maybe<Array<Scalars['String']>>;
};

export type IngredientsResult = {
  __typename?: 'IngredientsResult';
  data: Array<GenericIngredient>;
  error?: Maybe<Error>;
};

export type LikeCommentResult = {
  __typename?: 'LikeCommentResult';
  data?: Maybe<RecipeComment>;
  error?: Maybe<Error>;
};

export type LikeRecipeResult = {
  __typename?: 'LikeRecipeResult';
  data?: Maybe<Recipe>;
  error?: Maybe<Error>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addRecipe: RecipeResult;
  login: AuthResult;
  signup: AuthResult;
  likeRecipe: LikeRecipeResult;
  unlikeRecipe: UnlikeRecipeResult;
  addComment: CommentResult;
  replyToComment: CommentResult;
  likeComment: LikeCommentResult;
  unlikeComment: UnlikeCommentResult;
  deleteComment: DeleteCommentResult;
  saveRecipe: SaveRecipeResult;
  unsaveRecipe: UnsaveRecipeResult;
  changePassword: ChangePasswordResult;
  deleteAccount: DeleteAccountResult;
  updateDietaryPreferences: UpdateDietaryPreferencesResult;
  updateAllergyPreferences: UpdateAllergyPreferencesResult;
  updateProfileVisibility: UpdateProfileVisibilityResult;
  removeDietaryPreferences: RemoveDietaryPreferencesResult;
  removeAllergyPreferences: RemoveAllergyPreferencesResult;
  editProfile: EditProfileResult;
  followUser: FollowUserResult;
  unfollowUser: UnfollowUserResult;
  readNotification: NotificationResult;
};


export type MutationAddRecipeArgs = {
  recipe: RecipeInput;
};


export type MutationLoginArgs = {
  loginDetails: LoginInput;
};


export type MutationSignupArgs = {
  signupDetails: SignupInput;
};


export type MutationLikeRecipeArgs = {
  recipeId: Scalars['String'];
};


export type MutationUnlikeRecipeArgs = {
  recipeId: Scalars['String'];
};


export type MutationAddCommentArgs = {
  recipeId: Scalars['String'];
  comment: Scalars['String'];
};


export type MutationReplyToCommentArgs = {
  commentId: Scalars['String'];
  comment: Scalars['String'];
};


export type MutationLikeCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationUnlikeCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationSaveRecipeArgs = {
  recipeId: Scalars['String'];
};


export type MutationUnsaveRecipeArgs = {
  recipeId: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  changePasswordDetails: ChangePasswordDetails;
};


export type MutationUpdateDietaryPreferencesArgs = {
  dietaryPreferenceDetails: DietaryPreferenceDetails;
};


export type MutationUpdateAllergyPreferencesArgs = {
  allergyPreferenceDetails: AllergyPreferenceDetails;
};


export type MutationUpdateProfileVisibilityArgs = {
  profileVisibilityDetails: ProfileVisibilityDetails;
};


export type MutationRemoveDietaryPreferencesArgs = {
  dietaryPreferenceDetails: DietaryPreferenceDetails;
};


export type MutationRemoveAllergyPreferencesArgs = {
  allergyPreferenceDetails: AllergyPreferenceDetails;
};


export type MutationEditProfileArgs = {
  profileDetails: ProfileDetails;
};


export type MutationFollowUserArgs = {
  userId: Scalars['String'];
};


export type MutationUnfollowUserArgs = {
  userId: Scalars['String'];
};


export type MutationReadNotificationArgs = {
  notificationId: Scalars['String'];
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['String'];
  type: NotificationType;
  concerns: User;
  createdAt: Scalars['String'];
  read: Scalars['Boolean'];
  linkId?: Maybe<Scalars['String']>;
};

export type NotificationCount = {
  __typename?: 'NotificationCount';
  notificationCount: Scalars['Int'];
};

export type NotificationCountResult = {
  __typename?: 'NotificationCountResult';
  data?: Maybe<NotificationCount>;
  error?: Maybe<Error>;
};

export type NotificationResult = {
  __typename?: 'NotificationResult';
  data?: Maybe<Notification>;
  error?: Maybe<Error>;
};

export enum NotificationType {
  RecipeLiked = 'RECIPE_LIKED',
  RecipeCommented = 'RECIPE_COMMENTED',
  CommentLiked = 'COMMENT_LIKED',
  CommentReplied = 'COMMENT_REPLIED'
}

export type NotificationsResult = {
  __typename?: 'NotificationsResult';
  data: Array<Notification>;
  error?: Maybe<Error>;
};

export type Pagination = {
  __typename?: 'Pagination';
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export enum Privacy {
  Public = 'PUBLIC',
  Friends = 'FRIENDS',
  Private = 'PRIVATE'
}

export type ProfileDetails = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['Upload']>;
};

export type ProfileVisibilityDetails = {
  visibility: Privacy;
};

export type Query = {
  __typename?: 'Query';
  recipes: RecipesResult;
  newsFeed: RecipesResult;
  trending: RecipesResult;
  savedRecipes: RecipesResult;
  categories: CategoriesResult;
  categoriesWithImages: CategoriesResult;
  recipe: RecipeResult;
  me: FullUserResult;
  allergies: AllergiesResult;
  diets: DietsResult;
  ingredients: IngredientsResult;
  comment: CommentResult;
  users: UsersResult;
  profile: FullUserResult;
  followingUsers: UsersResult;
  followedUsers: UsersResult;
  notifications: NotificationsResult;
  notificationCount: NotificationCountResult;
};


export type QueryRecipesArgs = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
  query: Scalars['String'];
  sort: Sort;
  filter: RecipeFilter;
};


export type QueryNewsFeedArgs = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
};


export type QueryTrendingArgs = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
};


export type QuerySavedRecipesArgs = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
};


export type QueryCategoriesArgs = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
  query: Scalars['String'];
};


export type QueryCategoriesWithImagesArgs = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
  query: Scalars['String'];
};


export type QueryRecipeArgs = {
  recipeId: Scalars['String'];
};


export type QueryAllergiesArgs = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
  query: Scalars['String'];
};


export type QueryDietsArgs = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
  query: Scalars['String'];
};


export type QueryIngredientsArgs = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
  query: Scalars['String'];
};


export type QueryCommentArgs = {
  commentId: Scalars['String'];
};


export type QueryUsersArgs = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
  query: Scalars['String'];
  sort: Sort;
};


export type QueryProfileArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type QueryFollowingUsersArgs = {
  userId: Scalars['String'];
  offset: Scalars['Int'];
  limit: Scalars['Int'];
  query: Scalars['String'];
};


export type QueryFollowedUsersArgs = {
  userId: Scalars['String'];
  offset: Scalars['Int'];
  limit: Scalars['Int'];
  query: Scalars['String'];
};


export type QueryNotificationsArgs = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
};

export type Recipe = {
  __typename?: 'Recipe';
  id: Scalars['String'];
  title: Scalars['String'];
  subtitle?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  submittedBy: User;
  commentCount: Scalars['Int'];
  likeCount: Scalars['Int'];
  createdAt: Scalars['String'];
  servingCount?: Maybe<Scalars['Int']>;
  timeEstimate?: Maybe<Scalars['String']>;
  coverImage: Scalars['String'];
  categories: Array<Category>;
  diets: Array<Diet>;
  allergies: Array<Allergy>;
  ingredients: Array<Ingredient>;
  steps: Array<RecipeStep>;
  comments: Array<RecipeComment>;
  liked: Scalars['Boolean'];
  saved: Scalars['Boolean'];
};

export type RecipeComment = {
  __typename?: 'RecipeComment';
  id: Scalars['String'];
  contents: Scalars['String'];
  replies: Array<RecipeCommentReply>;
  liked: Scalars['Boolean'];
  likeCount: Scalars['Int'];
  replyCount: Scalars['Int'];
  submittedBy: User;
  deleted: Scalars['Boolean'];
  createdAt: Scalars['String'];
};

export type RecipeCommentReply = {
  __typename?: 'RecipeCommentReply';
  id: Scalars['String'];
  contents: Scalars['String'];
  liked: Scalars['Boolean'];
  likeCount: Scalars['Int'];
  replyCount: Scalars['Int'];
  submittedBy: User;
};

export type RecipeFilter = {
  ingredients?: Maybe<IngredientsFilter>;
  categories?: Maybe<Array<Scalars['String']>>;
  allergies?: Maybe<Array<Scalars['String']>>;
  diets?: Maybe<Array<Scalars['String']>>;
  cookTime?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
};

export type RecipeInput = {
  title: Scalars['String'];
  subtitle?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  servingCount?: Maybe<Scalars['Int']>;
  timeEstimate?: Maybe<Scalars['String']>;
  coverImage: Scalars['Upload'];
  categories?: Maybe<Array<CategoryInput>>;
  diets?: Maybe<Array<DietInput>>;
  allergies?: Maybe<Array<AllergyInput>>;
  ingredients?: Maybe<Array<IngredientInput>>;
  steps?: Maybe<Array<RecipeStepInput>>;
};

export type RecipeResult = {
  __typename?: 'RecipeResult';
  data?: Maybe<Recipe>;
  error?: Maybe<Error>;
};

export enum RecipeStatus {
  Published = 'PUBLISHED',
  Draft = 'DRAFT',
  Archived = 'ARCHIVED'
}

export type RecipeStep = {
  __typename?: 'RecipeStep';
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  description: Scalars['String'];
};

export type RecipeStepInput = {
  image?: Maybe<Scalars['Upload']>;
  title?: Maybe<Scalars['String']>;
  description: Scalars['String'];
};

export type RecipesResult = {
  __typename?: 'RecipesResult';
  data?: Maybe<Array<Recipe>>;
  error?: Maybe<Error>;
};

export type RemoveAllergyPreferencesResult = {
  __typename?: 'RemoveAllergyPreferencesResult';
  data?: Maybe<Array<Allergy>>;
  error?: Maybe<Error>;
};

export type RemoveDietaryPreferencesResult = {
  __typename?: 'RemoveDietaryPreferencesResult';
  data?: Maybe<Array<Diet>>;
  error?: Maybe<Error>;
};

export type SaveRecipeResult = {
  __typename?: 'SaveRecipeResult';
  data?: Maybe<Recipe>;
  error?: Maybe<Error>;
};

export type SignupInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};

export enum Sort {
  Relevant = 'RELEVANT',
  Popular = 'POPULAR',
  New = 'NEW'
}

export type UnfollowUserResult = {
  __typename?: 'UnfollowUserResult';
  data?: Maybe<User>;
  error?: Maybe<Error>;
};

export type UnlikeCommentResult = {
  __typename?: 'UnlikeCommentResult';
  data?: Maybe<RecipeComment>;
  error?: Maybe<Error>;
};

export type UnlikeRecipeResult = {
  __typename?: 'UnlikeRecipeResult';
  data?: Maybe<Recipe>;
  error?: Maybe<Error>;
};

export type UnsaveRecipeResult = {
  __typename?: 'UnsaveRecipeResult';
  data?: Maybe<Recipe>;
  error?: Maybe<Error>;
};

export type UpdateAllergyPreferencesResult = {
  __typename?: 'UpdateAllergyPreferencesResult';
  data?: Maybe<Array<Allergy>>;
  error?: Maybe<Error>;
};

export type UpdateDietaryPreferencesResult = {
  __typename?: 'UpdateDietaryPreferencesResult';
  data?: Maybe<Array<Diet>>;
  error?: Maybe<Error>;
};

export type UpdateProfileVisibilityResult = {
  __typename?: 'UpdateProfileVisibilityResult';
  data?: Maybe<Privacy>;
  error?: Maybe<Error>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  avatarURI?: Maybe<Scalars['String']>;
  verified: Scalars['Boolean'];
  visibility: Privacy;
};

export type UserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  avatarURI?: Maybe<Scalars['String']>;
};

export type UserResult = {
  __typename?: 'UserResult';
  data?: Maybe<User>;
  error?: Maybe<Error>;
};

export type UsersResult = {
  __typename?: 'UsersResult';
  data?: Maybe<Array<User>>;
  error?: Maybe<Error>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AllergiesResult: ResolverTypeWrapper<AllergiesResult>;
  Allergy: ResolverTypeWrapper<Allergy>;
  String: ResolverTypeWrapper<Scalars['String']>;
  AllergyInput: AllergyInput;
  AllergyPreferenceDetails: AllergyPreferenceDetails;
  AuthResult: ResolverTypeWrapper<AuthResult>;
  AuthResultData: ResolverTypeWrapper<AuthResultData>;
  CategoriesResult: ResolverTypeWrapper<CategoriesResult>;
  Category: ResolverTypeWrapper<Category>;
  CategoryInput: CategoryInput;
  ChangePasswordDetails: ChangePasswordDetails;
  ChangePasswordResult: ResolverTypeWrapper<ChangePasswordResult>;
  CommentResult: ResolverTypeWrapper<CommentResult>;
  DeleteAccountResult: ResolverTypeWrapper<DeleteAccountResult>;
  DeleteCommentResult: ResolverTypeWrapper<DeleteCommentResult>;
  Diet: ResolverTypeWrapper<Diet>;
  DietInput: DietInput;
  DietaryPreferenceDetails: DietaryPreferenceDetails;
  DietsResult: ResolverTypeWrapper<DietsResult>;
  EditProfileResult: ResolverTypeWrapper<EditProfileResult>;
  Error: ResolverTypeWrapper<Error>;
  File: ResolverTypeWrapper<File>;
  FollowUserResult: ResolverTypeWrapper<FollowUserResult>;
  FullUser: ResolverTypeWrapper<FullUser>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  FullUserResult: ResolverTypeWrapper<FullUserResult>;
  FullUsersResult: ResolverTypeWrapper<FullUsersResult>;
  GenericIngredient: ResolverTypeWrapper<GenericIngredient>;
  Ingredient: ResolverTypeWrapper<Ingredient>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  IngredientInput: IngredientInput;
  IngredientsFilter: IngredientsFilter;
  IngredientsResult: ResolverTypeWrapper<IngredientsResult>;
  LikeCommentResult: ResolverTypeWrapper<LikeCommentResult>;
  LikeRecipeResult: ResolverTypeWrapper<LikeRecipeResult>;
  LoginInput: LoginInput;
  Mutation: ResolverTypeWrapper<{}>;
  Notification: ResolverTypeWrapper<Notification>;
  NotificationCount: ResolverTypeWrapper<NotificationCount>;
  NotificationCountResult: ResolverTypeWrapper<NotificationCountResult>;
  NotificationResult: ResolverTypeWrapper<NotificationResult>;
  NotificationType: NotificationType;
  NotificationsResult: ResolverTypeWrapper<NotificationsResult>;
  Pagination: ResolverTypeWrapper<Pagination>;
  Privacy: Privacy;
  ProfileDetails: ProfileDetails;
  ProfileVisibilityDetails: ProfileVisibilityDetails;
  Query: ResolverTypeWrapper<{}>;
  Recipe: ResolverTypeWrapper<Recipe>;
  RecipeComment: ResolverTypeWrapper<RecipeComment>;
  RecipeCommentReply: ResolverTypeWrapper<RecipeCommentReply>;
  RecipeFilter: RecipeFilter;
  RecipeInput: RecipeInput;
  RecipeResult: ResolverTypeWrapper<RecipeResult>;
  RecipeStatus: RecipeStatus;
  RecipeStep: ResolverTypeWrapper<RecipeStep>;
  RecipeStepInput: RecipeStepInput;
  RecipesResult: ResolverTypeWrapper<RecipesResult>;
  RemoveAllergyPreferencesResult: ResolverTypeWrapper<RemoveAllergyPreferencesResult>;
  RemoveDietaryPreferencesResult: ResolverTypeWrapper<RemoveDietaryPreferencesResult>;
  SaveRecipeResult: ResolverTypeWrapper<SaveRecipeResult>;
  SignupInput: SignupInput;
  Sort: Sort;
  UnfollowUserResult: ResolverTypeWrapper<UnfollowUserResult>;
  UnlikeCommentResult: ResolverTypeWrapper<UnlikeCommentResult>;
  UnlikeRecipeResult: ResolverTypeWrapper<UnlikeRecipeResult>;
  UnsaveRecipeResult: ResolverTypeWrapper<UnsaveRecipeResult>;
  UpdateAllergyPreferencesResult: ResolverTypeWrapper<UpdateAllergyPreferencesResult>;
  UpdateDietaryPreferencesResult: ResolverTypeWrapper<UpdateDietaryPreferencesResult>;
  UpdateProfileVisibilityResult: ResolverTypeWrapper<UpdateProfileVisibilityResult>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
  UserResult: ResolverTypeWrapper<UserResult>;
  UsersResult: ResolverTypeWrapper<UsersResult>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AllergiesResult: AllergiesResult;
  Allergy: Allergy;
  String: Scalars['String'];
  AllergyInput: AllergyInput;
  AllergyPreferenceDetails: AllergyPreferenceDetails;
  AuthResult: AuthResult;
  AuthResultData: AuthResultData;
  CategoriesResult: CategoriesResult;
  Category: Category;
  CategoryInput: CategoryInput;
  ChangePasswordDetails: ChangePasswordDetails;
  ChangePasswordResult: ChangePasswordResult;
  CommentResult: CommentResult;
  DeleteAccountResult: DeleteAccountResult;
  DeleteCommentResult: DeleteCommentResult;
  Diet: Diet;
  DietInput: DietInput;
  DietaryPreferenceDetails: DietaryPreferenceDetails;
  DietsResult: DietsResult;
  EditProfileResult: EditProfileResult;
  Error: Error;
  File: File;
  FollowUserResult: FollowUserResult;
  FullUser: FullUser;
  Boolean: Scalars['Boolean'];
  Int: Scalars['Int'];
  FullUserResult: FullUserResult;
  FullUsersResult: FullUsersResult;
  GenericIngredient: GenericIngredient;
  Ingredient: Ingredient;
  Float: Scalars['Float'];
  IngredientInput: IngredientInput;
  IngredientsFilter: IngredientsFilter;
  IngredientsResult: IngredientsResult;
  LikeCommentResult: LikeCommentResult;
  LikeRecipeResult: LikeRecipeResult;
  LoginInput: LoginInput;
  Mutation: {};
  Notification: Notification;
  NotificationCount: NotificationCount;
  NotificationCountResult: NotificationCountResult;
  NotificationResult: NotificationResult;
  NotificationsResult: NotificationsResult;
  Pagination: Pagination;
  ProfileDetails: ProfileDetails;
  ProfileVisibilityDetails: ProfileVisibilityDetails;
  Query: {};
  Recipe: Recipe;
  RecipeComment: RecipeComment;
  RecipeCommentReply: RecipeCommentReply;
  RecipeFilter: RecipeFilter;
  RecipeInput: RecipeInput;
  RecipeResult: RecipeResult;
  RecipeStep: RecipeStep;
  RecipeStepInput: RecipeStepInput;
  RecipesResult: RecipesResult;
  RemoveAllergyPreferencesResult: RemoveAllergyPreferencesResult;
  RemoveDietaryPreferencesResult: RemoveDietaryPreferencesResult;
  SaveRecipeResult: SaveRecipeResult;
  SignupInput: SignupInput;
  UnfollowUserResult: UnfollowUserResult;
  UnlikeCommentResult: UnlikeCommentResult;
  UnlikeRecipeResult: UnlikeRecipeResult;
  UnsaveRecipeResult: UnsaveRecipeResult;
  UpdateAllergyPreferencesResult: UpdateAllergyPreferencesResult;
  UpdateDietaryPreferencesResult: UpdateDietaryPreferencesResult;
  UpdateProfileVisibilityResult: UpdateProfileVisibilityResult;
  Upload: Scalars['Upload'];
  User: User;
  UserInput: UserInput;
  UserResult: UserResult;
  UsersResult: UsersResult;
};

export type AllergiesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AllergiesResult'] = ResolversParentTypes['AllergiesResult']> = {
  data?: Resolver<Array<ResolversTypes['Allergy']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AllergyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Allergy'] = ResolversParentTypes['Allergy']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthResult'] = ResolversParentTypes['AuthResult']> = {
  data?: Resolver<Maybe<ResolversTypes['AuthResultData']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthResultDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthResultData'] = ResolversParentTypes['AuthResultData']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoriesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoriesResult'] = ResolversParentTypes['CategoriesResult']> = {
  data?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  coverImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangePasswordResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangePasswordResult'] = ResolversParentTypes['ChangePasswordResult']> = {
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentResult'] = ResolversParentTypes['CommentResult']> = {
  data?: Resolver<Maybe<ResolversTypes['RecipeComment']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteAccountResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteAccountResult'] = ResolversParentTypes['DeleteAccountResult']> = {
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteCommentResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteCommentResult'] = ResolversParentTypes['DeleteCommentResult']> = {
  data?: Resolver<Maybe<ResolversTypes['RecipeComment']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DietResolvers<ContextType = any, ParentType extends ResolversParentTypes['Diet'] = ResolversParentTypes['Diet']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DietsResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['DietsResult'] = ResolversParentTypes['DietsResult']> = {
  data?: Resolver<Array<ResolversTypes['Diet']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EditProfileResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['EditProfileResult'] = ResolversParentTypes['EditProfileResult']> = {
  data?: Resolver<Maybe<ResolversTypes['FullUser']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  encoding?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowUserResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowUserResult'] = ResolversParentTypes['FollowUserResult']> = {
  data?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FullUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['FullUser'] = ResolversParentTypes['FullUser']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  avatarURI?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  visibility?: Resolver<ResolversTypes['Privacy'], ParentType, ContextType>;
  dietaryPreferences?: Resolver<Array<ResolversTypes['Diet']>, ParentType, ContextType>;
  allergyPreferences?: Resolver<Array<ResolversTypes['Allergy']>, ParentType, ContextType>;
  isFollowing?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  followingCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  followerCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  recipeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FullUserResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['FullUserResult'] = ResolversParentTypes['FullUserResult']> = {
  data?: Resolver<Maybe<ResolversTypes['FullUser']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FullUsersResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['FullUsersResult'] = ResolversParentTypes['FullUsersResult']> = {
  data?: Resolver<Maybe<Array<ResolversTypes['FullUser']>>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenericIngredientResolvers<ContextType = any, ParentType extends ResolversParentTypes['GenericIngredient'] = ResolversParentTypes['GenericIngredient']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IngredientResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ingredient'] = ResolversParentTypes['Ingredient']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  unit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IngredientsResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['IngredientsResult'] = ResolversParentTypes['IngredientsResult']> = {
  data?: Resolver<Array<ResolversTypes['GenericIngredient']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeCommentResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikeCommentResult'] = ResolversParentTypes['LikeCommentResult']> = {
  data?: Resolver<Maybe<ResolversTypes['RecipeComment']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeRecipeResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikeRecipeResult'] = ResolversParentTypes['LikeRecipeResult']> = {
  data?: Resolver<Maybe<ResolversTypes['Recipe']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addRecipe?: Resolver<ResolversTypes['RecipeResult'], ParentType, ContextType, RequireFields<MutationAddRecipeArgs, 'recipe'>>;
  login?: Resolver<ResolversTypes['AuthResult'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'loginDetails'>>;
  signup?: Resolver<ResolversTypes['AuthResult'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'signupDetails'>>;
  likeRecipe?: Resolver<ResolversTypes['LikeRecipeResult'], ParentType, ContextType, RequireFields<MutationLikeRecipeArgs, 'recipeId'>>;
  unlikeRecipe?: Resolver<ResolversTypes['UnlikeRecipeResult'], ParentType, ContextType, RequireFields<MutationUnlikeRecipeArgs, 'recipeId'>>;
  addComment?: Resolver<ResolversTypes['CommentResult'], ParentType, ContextType, RequireFields<MutationAddCommentArgs, 'recipeId' | 'comment'>>;
  replyToComment?: Resolver<ResolversTypes['CommentResult'], ParentType, ContextType, RequireFields<MutationReplyToCommentArgs, 'commentId' | 'comment'>>;
  likeComment?: Resolver<ResolversTypes['LikeCommentResult'], ParentType, ContextType, RequireFields<MutationLikeCommentArgs, 'commentId'>>;
  unlikeComment?: Resolver<ResolversTypes['UnlikeCommentResult'], ParentType, ContextType, RequireFields<MutationUnlikeCommentArgs, 'commentId'>>;
  deleteComment?: Resolver<ResolversTypes['DeleteCommentResult'], ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'commentId'>>;
  saveRecipe?: Resolver<ResolversTypes['SaveRecipeResult'], ParentType, ContextType, RequireFields<MutationSaveRecipeArgs, 'recipeId'>>;
  unsaveRecipe?: Resolver<ResolversTypes['UnsaveRecipeResult'], ParentType, ContextType, RequireFields<MutationUnsaveRecipeArgs, 'recipeId'>>;
  changePassword?: Resolver<ResolversTypes['ChangePasswordResult'], ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'changePasswordDetails'>>;
  deleteAccount?: Resolver<ResolversTypes['DeleteAccountResult'], ParentType, ContextType>;
  updateDietaryPreferences?: Resolver<ResolversTypes['UpdateDietaryPreferencesResult'], ParentType, ContextType, RequireFields<MutationUpdateDietaryPreferencesArgs, 'dietaryPreferenceDetails'>>;
  updateAllergyPreferences?: Resolver<ResolversTypes['UpdateAllergyPreferencesResult'], ParentType, ContextType, RequireFields<MutationUpdateAllergyPreferencesArgs, 'allergyPreferenceDetails'>>;
  updateProfileVisibility?: Resolver<ResolversTypes['UpdateProfileVisibilityResult'], ParentType, ContextType, RequireFields<MutationUpdateProfileVisibilityArgs, 'profileVisibilityDetails'>>;
  removeDietaryPreferences?: Resolver<ResolversTypes['RemoveDietaryPreferencesResult'], ParentType, ContextType, RequireFields<MutationRemoveDietaryPreferencesArgs, 'dietaryPreferenceDetails'>>;
  removeAllergyPreferences?: Resolver<ResolversTypes['RemoveAllergyPreferencesResult'], ParentType, ContextType, RequireFields<MutationRemoveAllergyPreferencesArgs, 'allergyPreferenceDetails'>>;
  editProfile?: Resolver<ResolversTypes['EditProfileResult'], ParentType, ContextType, RequireFields<MutationEditProfileArgs, 'profileDetails'>>;
  followUser?: Resolver<ResolversTypes['FollowUserResult'], ParentType, ContextType, RequireFields<MutationFollowUserArgs, 'userId'>>;
  unfollowUser?: Resolver<ResolversTypes['UnfollowUserResult'], ParentType, ContextType, RequireFields<MutationUnfollowUserArgs, 'userId'>>;
  readNotification?: Resolver<ResolversTypes['NotificationResult'], ParentType, ContextType, RequireFields<MutationReadNotificationArgs, 'notificationId'>>;
};

export type NotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Notification'] = ResolversParentTypes['Notification']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['NotificationType'], ParentType, ContextType>;
  concerns?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  linkId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotificationCountResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotificationCount'] = ResolversParentTypes['NotificationCount']> = {
  notificationCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotificationCountResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotificationCountResult'] = ResolversParentTypes['NotificationCountResult']> = {
  data?: Resolver<Maybe<ResolversTypes['NotificationCount']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotificationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotificationResult'] = ResolversParentTypes['NotificationResult']> = {
  data?: Resolver<Maybe<ResolversTypes['Notification']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotificationsResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotificationsResult'] = ResolversParentTypes['NotificationsResult']> = {
  data?: Resolver<Array<ResolversTypes['Notification']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pagination'] = ResolversParentTypes['Pagination']> = {
  offset?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  limit?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  recipes?: Resolver<ResolversTypes['RecipesResult'], ParentType, ContextType, RequireFields<QueryRecipesArgs, 'offset' | 'limit' | 'query' | 'sort' | 'filter'>>;
  newsFeed?: Resolver<ResolversTypes['RecipesResult'], ParentType, ContextType, RequireFields<QueryNewsFeedArgs, 'offset' | 'limit'>>;
  trending?: Resolver<ResolversTypes['RecipesResult'], ParentType, ContextType, RequireFields<QueryTrendingArgs, 'offset' | 'limit'>>;
  savedRecipes?: Resolver<ResolversTypes['RecipesResult'], ParentType, ContextType, RequireFields<QuerySavedRecipesArgs, 'offset' | 'limit'>>;
  categories?: Resolver<ResolversTypes['CategoriesResult'], ParentType, ContextType, RequireFields<QueryCategoriesArgs, 'offset' | 'limit' | 'query'>>;
  categoriesWithImages?: Resolver<ResolversTypes['CategoriesResult'], ParentType, ContextType, RequireFields<QueryCategoriesWithImagesArgs, 'offset' | 'limit' | 'query'>>;
  recipe?: Resolver<ResolversTypes['RecipeResult'], ParentType, ContextType, RequireFields<QueryRecipeArgs, 'recipeId'>>;
  me?: Resolver<ResolversTypes['FullUserResult'], ParentType, ContextType>;
  allergies?: Resolver<ResolversTypes['AllergiesResult'], ParentType, ContextType, RequireFields<QueryAllergiesArgs, 'offset' | 'limit' | 'query'>>;
  diets?: Resolver<ResolversTypes['DietsResult'], ParentType, ContextType, RequireFields<QueryDietsArgs, 'offset' | 'limit' | 'query'>>;
  ingredients?: Resolver<ResolversTypes['IngredientsResult'], ParentType, ContextType, RequireFields<QueryIngredientsArgs, 'offset' | 'limit' | 'query'>>;
  comment?: Resolver<ResolversTypes['CommentResult'], ParentType, ContextType, RequireFields<QueryCommentArgs, 'commentId'>>;
  users?: Resolver<ResolversTypes['UsersResult'], ParentType, ContextType, RequireFields<QueryUsersArgs, 'offset' | 'limit' | 'query' | 'sort'>>;
  profile?: Resolver<ResolversTypes['FullUserResult'], ParentType, ContextType, RequireFields<QueryProfileArgs, never>>;
  followingUsers?: Resolver<ResolversTypes['UsersResult'], ParentType, ContextType, RequireFields<QueryFollowingUsersArgs, 'userId' | 'offset' | 'limit' | 'query'>>;
  followedUsers?: Resolver<ResolversTypes['UsersResult'], ParentType, ContextType, RequireFields<QueryFollowedUsersArgs, 'userId' | 'offset' | 'limit' | 'query'>>;
  notifications?: Resolver<ResolversTypes['NotificationsResult'], ParentType, ContextType, RequireFields<QueryNotificationsArgs, 'offset' | 'limit'>>;
  notificationCount?: Resolver<ResolversTypes['NotificationCountResult'], ParentType, ContextType>;
};

export type RecipeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Recipe'] = ResolversParentTypes['Recipe']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subtitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  submittedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  commentCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  servingCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  timeEstimate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coverImage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  diets?: Resolver<Array<ResolversTypes['Diet']>, ParentType, ContextType>;
  allergies?: Resolver<Array<ResolversTypes['Allergy']>, ParentType, ContextType>;
  ingredients?: Resolver<Array<ResolversTypes['Ingredient']>, ParentType, ContextType>;
  steps?: Resolver<Array<ResolversTypes['RecipeStep']>, ParentType, ContextType>;
  comments?: Resolver<Array<ResolversTypes['RecipeComment']>, ParentType, ContextType>;
  liked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  saved?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecipeCommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['RecipeComment'] = ResolversParentTypes['RecipeComment']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contents?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  replies?: Resolver<Array<ResolversTypes['RecipeCommentReply']>, ParentType, ContextType>;
  liked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  replyCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  submittedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecipeCommentReplyResolvers<ContextType = any, ParentType extends ResolversParentTypes['RecipeCommentReply'] = ResolversParentTypes['RecipeCommentReply']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contents?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  liked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  replyCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  submittedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecipeResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['RecipeResult'] = ResolversParentTypes['RecipeResult']> = {
  data?: Resolver<Maybe<ResolversTypes['Recipe']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecipeStepResolvers<ContextType = any, ParentType extends ResolversParentTypes['RecipeStep'] = ResolversParentTypes['RecipeStep']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecipesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['RecipesResult'] = ResolversParentTypes['RecipesResult']> = {
  data?: Resolver<Maybe<Array<ResolversTypes['Recipe']>>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveAllergyPreferencesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveAllergyPreferencesResult'] = ResolversParentTypes['RemoveAllergyPreferencesResult']> = {
  data?: Resolver<Maybe<Array<ResolversTypes['Allergy']>>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveDietaryPreferencesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveDietaryPreferencesResult'] = ResolversParentTypes['RemoveDietaryPreferencesResult']> = {
  data?: Resolver<Maybe<Array<ResolversTypes['Diet']>>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaveRecipeResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SaveRecipeResult'] = ResolversParentTypes['SaveRecipeResult']> = {
  data?: Resolver<Maybe<ResolversTypes['Recipe']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnfollowUserResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnfollowUserResult'] = ResolversParentTypes['UnfollowUserResult']> = {
  data?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnlikeCommentResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnlikeCommentResult'] = ResolversParentTypes['UnlikeCommentResult']> = {
  data?: Resolver<Maybe<ResolversTypes['RecipeComment']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnlikeRecipeResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnlikeRecipeResult'] = ResolversParentTypes['UnlikeRecipeResult']> = {
  data?: Resolver<Maybe<ResolversTypes['Recipe']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnsaveRecipeResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnsaveRecipeResult'] = ResolversParentTypes['UnsaveRecipeResult']> = {
  data?: Resolver<Maybe<ResolversTypes['Recipe']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateAllergyPreferencesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateAllergyPreferencesResult'] = ResolversParentTypes['UpdateAllergyPreferencesResult']> = {
  data?: Resolver<Maybe<Array<ResolversTypes['Allergy']>>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateDietaryPreferencesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateDietaryPreferencesResult'] = ResolversParentTypes['UpdateDietaryPreferencesResult']> = {
  data?: Resolver<Maybe<Array<ResolversTypes['Diet']>>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateProfileVisibilityResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateProfileVisibilityResult'] = ResolversParentTypes['UpdateProfileVisibilityResult']> = {
  data?: Resolver<Maybe<ResolversTypes['Privacy']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  avatarURI?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  visibility?: Resolver<ResolversTypes['Privacy'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResult'] = ResolversParentTypes['UserResult']> = {
  data?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsersResult'] = ResolversParentTypes['UsersResult']> = {
  data?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AllergiesResult?: AllergiesResultResolvers<ContextType>;
  Allergy?: AllergyResolvers<ContextType>;
  AuthResult?: AuthResultResolvers<ContextType>;
  AuthResultData?: AuthResultDataResolvers<ContextType>;
  CategoriesResult?: CategoriesResultResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  ChangePasswordResult?: ChangePasswordResultResolvers<ContextType>;
  CommentResult?: CommentResultResolvers<ContextType>;
  DeleteAccountResult?: DeleteAccountResultResolvers<ContextType>;
  DeleteCommentResult?: DeleteCommentResultResolvers<ContextType>;
  Diet?: DietResolvers<ContextType>;
  DietsResult?: DietsResultResolvers<ContextType>;
  EditProfileResult?: EditProfileResultResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  FollowUserResult?: FollowUserResultResolvers<ContextType>;
  FullUser?: FullUserResolvers<ContextType>;
  FullUserResult?: FullUserResultResolvers<ContextType>;
  FullUsersResult?: FullUsersResultResolvers<ContextType>;
  GenericIngredient?: GenericIngredientResolvers<ContextType>;
  Ingredient?: IngredientResolvers<ContextType>;
  IngredientsResult?: IngredientsResultResolvers<ContextType>;
  LikeCommentResult?: LikeCommentResultResolvers<ContextType>;
  LikeRecipeResult?: LikeRecipeResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Notification?: NotificationResolvers<ContextType>;
  NotificationCount?: NotificationCountResolvers<ContextType>;
  NotificationCountResult?: NotificationCountResultResolvers<ContextType>;
  NotificationResult?: NotificationResultResolvers<ContextType>;
  NotificationsResult?: NotificationsResultResolvers<ContextType>;
  Pagination?: PaginationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Recipe?: RecipeResolvers<ContextType>;
  RecipeComment?: RecipeCommentResolvers<ContextType>;
  RecipeCommentReply?: RecipeCommentReplyResolvers<ContextType>;
  RecipeResult?: RecipeResultResolvers<ContextType>;
  RecipeStep?: RecipeStepResolvers<ContextType>;
  RecipesResult?: RecipesResultResolvers<ContextType>;
  RemoveAllergyPreferencesResult?: RemoveAllergyPreferencesResultResolvers<ContextType>;
  RemoveDietaryPreferencesResult?: RemoveDietaryPreferencesResultResolvers<ContextType>;
  SaveRecipeResult?: SaveRecipeResultResolvers<ContextType>;
  UnfollowUserResult?: UnfollowUserResultResolvers<ContextType>;
  UnlikeCommentResult?: UnlikeCommentResultResolvers<ContextType>;
  UnlikeRecipeResult?: UnlikeRecipeResultResolvers<ContextType>;
  UnsaveRecipeResult?: UnsaveRecipeResultResolvers<ContextType>;
  UpdateAllergyPreferencesResult?: UpdateAllergyPreferencesResultResolvers<ContextType>;
  UpdateDietaryPreferencesResult?: UpdateDietaryPreferencesResultResolvers<ContextType>;
  UpdateProfileVisibilityResult?: UpdateProfileVisibilityResultResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserResult?: UserResultResolvers<ContextType>;
  UsersResult?: UsersResultResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
