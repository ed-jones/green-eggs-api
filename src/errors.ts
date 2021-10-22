/**
 * Author: Edward Jones
 */

/**
 * A list of reusable error messages within the API
 */
enum Errors {
  NO_CONTEXT = 'Context Not Supplied',
  NO_USER = 'User Not Found',
  NO_USERS = 'Users Not Found',
  NO_ALLERGIES = 'Allergies Not Found',
  NO_DIETS = 'Diets Not Found',
  NO_INGREDIENTS = 'Ingredients Not Found',
  NO_SECRET = 'Unable To Encrypt - Secret Not Found',
  WRONG_PASSWORD = 'Wrong Password',
  PASSWORD_MISMATCH = 'Password Did Not Match Confirmation',
  COULD_NOT_CREATE_USER = 'Could Not Create User',
  NO_RECIPE = 'Could not find a recipe with that ID',
  NO_COMMENT = 'Could not find a comment with that ID'
}

export default Errors;
