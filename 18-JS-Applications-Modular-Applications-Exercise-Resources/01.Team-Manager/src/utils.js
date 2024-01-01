export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatUserName(userName) {
  return userName.length > 3;
}

export function validatePassword(password) {
  const passwordRegex = /^[\w\d]{3,}$/;
  return passwordRegex.test(password);
}
