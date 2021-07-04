import { GraphQLResolveInfo } from 'graphql';
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

export type Category = {
  __typename?: 'Category';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type CategoryInput = {
  name: Scalars['String'];
};

export type Diet = {
  __typename?: 'Diet';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type DietInput = {
  name: Scalars['String'];
};

export type Error = {
  __typename?: 'Error';
  message: Scalars['String'];
};

export type IngredientsFilter = {
  __typename?: 'IngredientsFilter';
  includes?: Maybe<Array<Maybe<Scalars['String']>>>;
  excludes?: Maybe<Array<Maybe<Scalars['String']>>>;
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

export type Pagination = {
  __typename?: 'Pagination';
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  recipes: Array<Recipe>;
  newsFeed: Array<Recipe>;
  recipe: Recipe;
  me: UserResult;
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
  previewURI: Scalars['String'];
  categories: Array<Maybe<Category>>;
  diets: Array<Maybe<Diet>>;
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
  previewURI: Scalars['String'];
  categories: Array<Maybe<CategoryInput>>;
  diets: Array<Maybe<DietInput>>;
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

export enum Visibility {
  Public = 'PUBLIC',
  Friends = 'FRIENDS',
  Private = 'PRIVATE'
}



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
  AuthResult: ResolverTypeWrapper<AuthResult>;
  AuthResultData: ResolverTypeWrapper<AuthResultData>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Category: ResolverTypeWrapper<Category>;
  CategoryInput: CategoryInput;
  Diet: ResolverTypeWrapper<Diet>;
  DietInput: DietInput;
  Error: ResolverTypeWrapper<Error>;
  IngredientsFilter: ResolverTypeWrapper<IngredientsFilter>;
  LoginInput: LoginInput;
  Mutation: ResolverTypeWrapper<{}>;
  Pagination: ResolverTypeWrapper<Pagination>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Query: ResolverTypeWrapper<{}>;
  Recipe: ResolverTypeWrapper<Recipe>;
  RecipeFilter: ResolverTypeWrapper<RecipeFilter>;
  RecipeInput: RecipeInput;
  RecipeResult: ResolverTypeWrapper<RecipeResult>;
  RecipeStatus: RecipeStatus;
  SignupInput: SignupInput;
  Sort: Sort;
  User: ResolverTypeWrapper<User>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  UserInput: UserInput;
  UserResult: ResolverTypeWrapper<UserResult>;
  Visibility: Visibility;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthResult: AuthResult;
  AuthResultData: AuthResultData;
  String: Scalars['String'];
  Category: Category;
  CategoryInput: CategoryInput;
  Diet: Diet;
  DietInput: DietInput;
  Error: Error;
  IngredientsFilter: IngredientsFilter;
  LoginInput: LoginInput;
  Mutation: {};
  Pagination: Pagination;
  Int: Scalars['Int'];
  Query: {};
  Recipe: Recipe;
  RecipeFilter: RecipeFilter;
  RecipeInput: RecipeInput;
  RecipeResult: RecipeResult;
  SignupInput: SignupInput;
  User: User;
  Boolean: Scalars['Boolean'];
  UserInput: UserInput;
  UserResult: UserResult;
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

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DietResolvers<ContextType = any, ParentType extends ResolversParentTypes['Diet'] = ResolversParentTypes['Diet']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IngredientsFilterResolvers<ContextType = any, ParentType extends ResolversParentTypes['IngredientsFilter'] = ResolversParentTypes['IngredientsFilter']> = {
  includes?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  excludes?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addRecipe?: Resolver<ResolversTypes['RecipeResult'], ParentType, ContextType, RequireFields<MutationAddRecipeArgs, 'recipe'>>;
  login?: Resolver<ResolversTypes['AuthResult'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'loginDetails'>>;
  signup?: Resolver<ResolversTypes['AuthResult'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'signupDetails'>>;
};

export type PaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pagination'] = ResolversParentTypes['Pagination']> = {
  offset?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  limit?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  recipes?: Resolver<Array<ResolversTypes['Recipe']>, ParentType, ContextType>;
  newsFeed?: Resolver<Array<ResolversTypes['Recipe']>, ParentType, ContextType>;
  recipe?: Resolver<ResolversTypes['Recipe'], ParentType, ContextType, RequireFields<QueryRecipeArgs, 'recipeId'>>;
  me?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType>;
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
  previewURI?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  categories?: Resolver<Array<Maybe<ResolversTypes['Category']>>, ParentType, ContextType>;
  diets?: Resolver<Array<Maybe<ResolversTypes['Diet']>>, ParentType, ContextType>;
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
  AuthResult?: AuthResultResolvers<ContextType>;
  AuthResultData?: AuthResultDataResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Diet?: DietResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  IngredientsFilter?: IngredientsFilterResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Pagination?: PaginationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Recipe?: RecipeResolvers<ContextType>;
  RecipeFilter?: RecipeFilterResolvers<ContextType>;
  RecipeResult?: RecipeResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserResult?: UserResultResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
