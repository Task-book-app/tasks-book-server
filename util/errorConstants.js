export const errorName = {
  EXISTEMAIL: "EXISTEMAIL",
  NOTEXISTEMAIL: "NOTEXISTEMAIL",
  ISVALIDEMAIL: "ISVALIDEMAIL",
  ISVALIDPASSWORDLOWERCASE: "ISVALIDPASSWORDLOWERCASE",
  ISVALIDPASSWORDUPPERCASE: "ISVALIDPASSWORDUPPERCASE",
  ISVALIDPASSWORDNUMBER: "ISVALIDPASSWORDNUMBER",
  ISVALIDPASSWORDSIMBOL: "ISVALIDPASSWORDSIMBOL",
  ISVALIDPASSWORDLENGTH: "ISVALIDPASSWORDLENGTH",
  NOTUSERFOUND: "NOTUSERFOUND",
  UNAUTHENTICATED: "UNAUTHENTICATED",
  NOTVALIDPASSWORD: "NOTVALIDPASSWORD",
  INVALIDACTION: "INVALIDACTION",
  NOTTASKFOUND: "NOTTASKFOUND",
};

export const errorType = {
  EXISTEMAIL: {
    message: "Email taken, try with other email",
    statusCode: 400,
  },
  NOTEXISTEMAIL: {
    message: "Not user with this email found",
    statusCode: 404,
  },
  ISVALIDEMAIL: {
    message: "Email not in proper format",
    statusCode: 400,
  },
  ISVALIDPASSWORDLOWERCASE: {
    message: "Password must contain a lowercase letter",
    statusCode: 400,
  },
  ISVALIDPASSWORDUPPERCASE: {
    message: "Password must contain an uppercase letter",
    statusCode: 400,
  },
  ISVALIDPASSWORDNUMBER: {
    message: "Password must contain a number",
    statusCode: 400,
  },
  ISVALIDPASSWORDSIMBOL: {
    message: "Password must contain at least one special symbol (!@#$%&*...)",
    statusCode: 400,
  },
  ISVALIDPASSWORDLENGTH: {
    message: "Password must have more then 8 characters",
    statusCode: 400,
  },
  NOTUSERFOUND: {
    message: "Not user found.",
    statusCode: 404,
  },
  UNAUTHENTICATED: {
    message: "Authentication failed, try to sign up or login again",
    statusCode: 401,
  },
  NOTVALIDPASSWORD: {
    message: "Invalid password",
    statusCode: 403,
  },
  INVALIDACTION: {
    message: "Unauthorized action, log in again",
    statusCode: 401,
  },
  NOTTASKFOUND: {
    message: "No task found.",
    statusCode: 404,
  },
};

export const getErrorCode = (errorName) => {
  return errorType[errorName];
};
