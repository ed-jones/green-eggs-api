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
};

export type CategoryInput = {
  name: Scalars['String'];
};

export type ChangePasswordDetails = {
  oldPassword: Scalars['String'];
  confirmOldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type ChangePasswordResult = {
  __typename?: 'ChangePasswordResult';
  error?: Maybe<Error>;
};

export type CommentResult = {
  __typename?: 'CommentResult';
  error?: Maybe<Error>;
};

export type DeleteAccountResult = {
  __typename?: 'DeleteAccountResult';
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

export type DietsResult = {
  __typename?: 'DietsResult';
  data: Array<Diet>;
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

export type Ingredient = {
  __typename?: 'Ingredient';
  id: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  quantity: Scalars['Int'];
  unit?: Maybe<Scalars['String']>;
};

export type IngredientInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  quantity: Scalars['Int'];
  unit?: Maybe<Scalars['String']>;
};

export type IngredientsFilter = {
  __typename?: 'IngredientsFilter';
  includes?: Maybe<Array<Maybe<Scalars['String']>>>;
  excludes?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type LikeCommentResult = {
  __typename?: 'LikeCommentResult';
  error?: Maybe<Error>;
};

export type LikeRecipeResult = {
  __typename?: 'LikeRecipeResult';
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
  saveRecipe: SaveRecipeResult;
  changePassword: ChangePasswordResult;
  deleteAccount: DeleteAccountResult;
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


export type MutationSaveRecipeArgs = {
  recipeId: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  changePasswordDetails: ChangePasswordDetails;
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

export type Query = {
  __typename?: 'Query';
  recipes: RecipesResult;
  newsFeed: RecipesResult;
  trending: RecipesResult;
  savedRecipes: RecipesResult;
  categories: CategoriesResult;
  recipe: RecipeResult;
  me: UserResult;
  allergies: AllergiesResult;
  diets: DietsResult;
};


export type QueryRecipeArgs = {
  recipeId: Scalars['String'];
};

export type Recipe = {
  __typename?: 'Recipe';
  id: Scalars['String'];
  title: Scalars['String'];
  subtitle: Scalars['String'];
  description: Scalars['String'];
  submittedBy: User;
  commentCount: Scalars['Int'];
  likeCount: Scalars['Int'];
  createdAt: Scalars['String'];
  servingCount: Scalars['Int'];
  timeEstimate: Scalars['String'];
  coverImage: Scalars['String'];
  categories: Array<Category>;
  diets: Array<Diet>;
  allergies: Array<Allergy>;
  ingredients: Array<Ingredient>;
  steps: Array<RecipeStep>;
  visibility: Privacy;
  likeability: Privacy;
  commentability: Privacy;
};

export type RecipeFilter = {
  __typename?: 'RecipeFilter';
  ingredients?: Maybe<IngredientsFilter>;
  categories?: Maybe<Array<Maybe<Scalars['String']>>>;
  allergies?: Maybe<Array<Maybe<Scalars['String']>>>;
  diets?: Maybe<Array<Maybe<Scalars['String']>>>;
  cookTime?: Maybe<Scalars['String']>;
};

export type RecipeInput = {
  title: Scalars['String'];
  subtitle: Scalars['String'];
  description: Scalars['String'];
  servingCount: Scalars['Int'];
  timeEstimate: Scalars['String'];
  coverImage: Scalars['Upload'];
  categories: Array<CategoryInput>;
  diets: Array<DietInput>;
  allergies: Array<AllergyInput>;
  ingredients: Array<IngredientInput>;
  steps: Array<RecipeStepInput>;
  visibility: Privacy;
  likeability: Privacy;
  commentability: Privacy;
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
  image: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
};

export type RecipeStepInput = {
  image: Scalars['Upload'];
  title: Scalars['String'];
  description: Scalars['String'];
};

export type RecipesResult = {
  __typename?: 'RecipesResult';
  data?: Maybe<Array<Recipe>>;
  error?: Maybe<Error>;
};

export type SaveRecipeResult = {
  __typename?: 'SaveRecipeResult';
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

export type UnlikeRecipeResult = {
  __typename?: 'UnlikeRecipeResult';
  error?: Maybe<Error>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  avatarURI?: Maybe<Scalars['String']>;
  verified: Scalars['Boolean'];
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
  AuthResult: ResolverTypeWrapper<AuthResult>;
  AuthResultData: ResolverTypeWrapper<AuthResultData>;
  CategoriesResult: ResolverTypeWrapper<CategoriesResult>;
  Category: ResolverTypeWrapper<Category>;
  CategoryInput: CategoryInput;
  ChangePasswordDetails: ChangePasswordDetails;
  ChangePasswordResult: ResolverTypeWrapper<ChangePasswordResult>;
  CommentResult: ResolverTypeWrapper<CommentResult>;
  DeleteAccountResult: ResolverTypeWrapper<DeleteAccountResult>;
  Diet: ResolverTypeWrapper<Diet>;
  DietInput: DietInput;
  DietsResult: ResolverTypeWrapper<DietsResult>;
  Error: ResolverTypeWrapper<Error>;
  File: ResolverTypeWrapper<File>;
  Ingredient: ResolverTypeWrapper<Ingredient>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IngredientInput: IngredientInput;
  IngredientsFilter: ResolverTypeWrapper<IngredientsFilter>;
  LikeCommentResult: ResolverTypeWrapper<LikeCommentResult>;
  LikeRecipeResult: ResolverTypeWrapper<LikeRecipeResult>;
  LoginInput: LoginInput;
  Mutation: ResolverTypeWrapper<{}>;
  Pagination: ResolverTypeWrapper<Pagination>;
  Privacy: Privacy;
  Query: ResolverTypeWrapper<{}>;
  Recipe: ResolverTypeWrapper<Recipe>;
  RecipeFilter: ResolverTypeWrapper<RecipeFilter>;
  RecipeInput: RecipeInput;
  RecipeResult: ResolverTypeWrapper<RecipeResult>;
  RecipeStatus: RecipeStatus;
  RecipeStep: ResolverTypeWrapper<RecipeStep>;
  RecipeStepInput: RecipeStepInput;
  RecipesResult: ResolverTypeWrapper<RecipesResult>;
  SaveRecipeResult: ResolverTypeWrapper<SaveRecipeResult>;
  SignupInput: SignupInput;
  Sort: Sort;
  UnlikeRecipeResult: ResolverTypeWrapper<UnlikeRecipeResult>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  UserInput: UserInput;
  UserResult: ResolverTypeWrapper<UserResult>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AllergiesResult: AllergiesResult;
  Allergy: Allergy;
  String: Scalars['String'];
  AllergyInput: AllergyInput;
  AuthResult: AuthResult;
  AuthResultData: AuthResultData;
  CategoriesResult: CategoriesResult;
  Category: Category;
  CategoryInput: CategoryInput;
  ChangePasswordDetails: ChangePasswordDetails;
  ChangePasswordResult: ChangePasswordResult;
  CommentResult: CommentResult;
  DeleteAccountResult: DeleteAccountResult;
  Diet: Diet;
  DietInput: DietInput;
  DietsResult: DietsResult;
  Error: Error;
  File: File;
  Ingredient: Ingredient;
  Int: Scalars['Int'];
  IngredientInput: IngredientInput;
  IngredientsFilter: IngredientsFilter;
  LikeCommentResult: LikeCommentResult;
  LikeRecipeResult: LikeRecipeResult;
  LoginInput: LoginInput;
  Mutation: {};
  Pagination: Pagination;
  Query: {};
  Recipe: Recipe;
  RecipeFilter: RecipeFilter;
  RecipeInput: RecipeInput;
  RecipeResult: RecipeResult;
  RecipeStep: RecipeStep;
  RecipeStepInput: RecipeStepInput;
  RecipesResult: RecipesResult;
  SaveRecipeResult: SaveRecipeResult;
  SignupInput: SignupInput;
  UnlikeRecipeResult: UnlikeRecipeResult;
  Upload: Scalars['Upload'];
  User: User;
  Boolean: Scalars['Boolean'];
  UserInput: UserInput;
  UserResult: UserResult;
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
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangePasswordResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangePasswordResult'] = ResolversParentTypes['ChangePasswordResult']> = {
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentResult'] = ResolversParentTypes['CommentResult']> = {
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteAccountResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteAccountResult'] = ResolversParentTypes['DeleteAccountResult']> = {
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

export type IngredientResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ingredient'] = ResolversParentTypes['Ingredient']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  unit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IngredientsFilterResolvers<ContextType = any, ParentType extends ResolversParentTypes['IngredientsFilter'] = ResolversParentTypes['IngredientsFilter']> = {
  includes?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  excludes?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeCommentResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikeCommentResult'] = ResolversParentTypes['LikeCommentResult']> = {
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeRecipeResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikeRecipeResult'] = ResolversParentTypes['LikeRecipeResult']> = {
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
  saveRecipe?: Resolver<ResolversTypes['SaveRecipeResult'], ParentType, ContextType, RequireFields<MutationSaveRecipeArgs, 'recipeId'>>;
  changePassword?: Resolver<ResolversTypes['ChangePasswordResult'], ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'changePasswordDetails'>>;
  deleteAccount?: Resolver<ResolversTypes['DeleteAccountResult'], ParentType, ContextType>;
};

export type PaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pagination'] = ResolversParentTypes['Pagination']> = {
  offset?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  limit?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  recipes?: Resolver<ResolversTypes['RecipesResult'], ParentType, ContextType>;
  newsFeed?: Resolver<ResolversTypes['RecipesResult'], ParentType, ContextType>;
  trending?: Resolver<ResolversTypes['RecipesResult'], ParentType, ContextType>;
  savedRecipes?: Resolver<ResolversTypes['RecipesResult'], ParentType, ContextType>;
  categories?: Resolver<ResolversTypes['CategoriesResult'], ParentType, ContextType>;
  recipe?: Resolver<ResolversTypes['RecipeResult'], ParentType, ContextType, RequireFields<QueryRecipeArgs, 'recipeId'>>;
  me?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType>;
  allergies?: Resolver<ResolversTypes['AllergiesResult'], ParentType, ContextType>;
  diets?: Resolver<ResolversTypes['DietsResult'], ParentType, ContextType>;
};

export type RecipeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Recipe'] = ResolversParentTypes['Recipe']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subtitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  submittedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  commentCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  servingCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timeEstimate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  coverImage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  diets?: Resolver<Array<ResolversTypes['Diet']>, ParentType, ContextType>;
  allergies?: Resolver<Array<ResolversTypes['Allergy']>, ParentType, ContextType>;
  ingredients?: Resolver<Array<ResolversTypes['Ingredient']>, ParentType, ContextType>;
  steps?: Resolver<Array<ResolversTypes['RecipeStep']>, ParentType, ContextType>;
  visibility?: Resolver<ResolversTypes['Privacy'], ParentType, ContextType>;
  likeability?: Resolver<ResolversTypes['Privacy'], ParentType, ContextType>;
  commentability?: Resolver<ResolversTypes['Privacy'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecipeFilterResolvers<ContextType = any, ParentType extends ResolversParentTypes['RecipeFilter'] = ResolversParentTypes['RecipeFilter']> = {
  ingredients?: Resolver<Maybe<ResolversTypes['IngredientsFilter']>, ParentType, ContextType>;
  categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  allergies?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  diets?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  cookTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecipeResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['RecipeResult'] = ResolversParentTypes['RecipeResult']> = {
  data?: Resolver<Maybe<ResolversTypes['Recipe']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecipeStepResolvers<ContextType = any, ParentType extends ResolversParentTypes['RecipeStep'] = ResolversParentTypes['RecipeStep']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecipesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['RecipesResult'] = ResolversParentTypes['RecipesResult']> = {
  data?: Resolver<Maybe<Array<ResolversTypes['Recipe']>>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaveRecipeResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SaveRecipeResult'] = ResolversParentTypes['SaveRecipeResult']> = {
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnlikeRecipeResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnlikeRecipeResult'] = ResolversParentTypes['UnlikeRecipeResult']> = {
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
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  avatarURI?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResult'] = ResolversParentTypes['UserResult']> = {
  data?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
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
  Diet?: DietResolvers<ContextType>;
  DietsResult?: DietsResultResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  Ingredient?: IngredientResolvers<ContextType>;
  IngredientsFilter?: IngredientsFilterResolvers<ContextType>;
  LikeCommentResult?: LikeCommentResultResolvers<ContextType>;
  LikeRecipeResult?: LikeRecipeResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Pagination?: PaginationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Recipe?: RecipeResolvers<ContextType>;
  RecipeFilter?: RecipeFilterResolvers<ContextType>;
  RecipeResult?: RecipeResultResolvers<ContextType>;
  RecipeStep?: RecipeStepResolvers<ContextType>;
  RecipesResult?: RecipesResultResolvers<ContextType>;
  SaveRecipeResult?: SaveRecipeResultResolvers<ContextType>;
  UnlikeRecipeResult?: UnlikeRecipeResultResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserResult?: UserResultResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
