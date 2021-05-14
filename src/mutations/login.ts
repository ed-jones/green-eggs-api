import { MutationLoginArgs, AuthResult } from '../generated/graphql';

const login = (_: any, { loginDetails }: MutationLoginArgs): AuthResult => {
  return { data: { token: 'hello' } }
}

export default login;