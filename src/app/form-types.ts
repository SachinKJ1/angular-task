interface  loginType {
  email?: string;
  password?: string;
};

interface signUpType {
  email?: string;
  password?: string;
  passwordConfirm?: string;
  username?: string;
  role?: ['admin', 'user'];
};

 
export { loginType, signUpType}