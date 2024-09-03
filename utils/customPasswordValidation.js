let isValidPassword = (password) => {
  let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  return regex.test(password) ? true : false ;
};

export default isValidPassword;
