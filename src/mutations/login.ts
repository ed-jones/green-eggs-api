import { schema } from '..';
import { LoginInput } from '../generated/graphql';

const login = (_: any, { LoginInput }: any) => {
  return { data: { token: 'hello' } }
}

export default login;