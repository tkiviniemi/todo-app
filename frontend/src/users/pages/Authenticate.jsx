import { useRef, useState } from 'react';
import { useMutation } from 'react-query';

import Button from '../../shared/components/button/Button';
import Card from '../../shared/components/card/Card';
import Input from '../../shared/components/input/Input';
import { singUpUser, loginUser } from '../api/users';

import './Authenticate.css';

const Authenticate = (props) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLoginMode, setIsLoginMode] = useState(true);

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  const singUpUserMutation = useMutation({
    mutationFn: singUpUser,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (isLoginMode) {
      loginUserMutation.mutate({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    } else {
      singUpUserMutation.mutate({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <Card className="authentication">
      <h2>{isLoginMode ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={onSubmitHandler}>
        {!isLoginMode && <Input ref={nameRef} type="text" label="Name" />}
        <Input ref={emailRef} type="email" label="Email" />
        <Input ref={passwordRef} type="password" label="Password" />
        <Button type="submit">{isLoginMode ? 'LOGIN' : 'SIGNUP'}</Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        {isLoginMode ? 'SIGNUP' : 'LOGIN'} instead?
      </Button>
    </Card>
  );
};

export default Authenticate;
