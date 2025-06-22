export function validateName(name) {
  const regex = /^[가-힣a-zA-Z0-9]{2,8}$/;
  return regex.test(name);
}

export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
}

export function passwordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}
