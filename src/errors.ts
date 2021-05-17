enum Errors {
  NO_CONTEXT = 'Context Not Supplied',
  NO_USER = 'User Not Found',
  NO_SECRET = 'Unable To Encrypt - Secret Not Found',
  WRONG_PASSWORD = 'Wrong Password',
  PASSWORD_MISMATCH = 'Password Did Not Match Confirmation',
  COULD_NOT_CREATE_USER = 'Could Not Create User',
}

export default Errors;
