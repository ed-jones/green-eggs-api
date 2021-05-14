import { MutationLoginArgs, AuthResult } from '../generated/graphql';

const login = (_: any, { loginDetails }: MutationLoginArgs): AuthResult => ({ data: { token: 'hello' } });

export default login;
