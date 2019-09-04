import * as React from 'react'
import useForm from 'react-hook-form';
import { AuthContext } from './AuthProvider';

const Login = () => {
  const { login, loginLoading, loginError } = React.useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = (values) => {
    const { email, password } = values;
    login({ variables: { email, password } });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {loginError && 'An error occurred'}

      <label htmlFor="email">First Name</label>
      <input type="text" name="email" ref={register} />

      <label htmlFor="password">Last Name</label>
      <input type="text" name="password" ref={register} />

      <button>{loginLoading ? 'loading...' : 'Submit'}</button>
    </form>
  );
}

export default Login;