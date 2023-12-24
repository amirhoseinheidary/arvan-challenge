import { useToast } from "vue-toast-notification";

export function formatError(errors) {
  const result = [];

  for (const key in errors) {
    errors[key].forEach((element) => {
      result.push(`${key}:${element}`);
    });
  }

  return result;
}
export function toastHanlder(type, messages) {
  const $toast = useToast();

  messages.map((message) => {
    $toast[type](message, {
      position: "top-right",
    });
  });
}
export const isStrongPassword = (password) => {
  // At least 8 characters
  const hasLength = password.length >= 8;

  // At least one uppercase letter
  const hasUppercase = /[A-Z]/.test(password);

  // At least one lowercase letter
  const hasLowercase = /[a-z]/.test(password);

  // At least one digit
  const hasDigit = /\d/.test(password);

  // At least one special character
  const hasSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password);

  // Check each criterion and return a message if not met
  if (!hasLength) {
    return "Password must be at least 8 characters long.";
  }
  if (!hasUppercase) {
    return "Password must include at least one uppercase letter.";
  }
  if (!hasLowercase) {
    return "Password must include at least one lowercase letter.";
  }
  if (!hasDigit) {
    return "Password must include at least one digit.";
  }
  if (!hasSpecialChar) {
    return "Password must include at least one special character.";
  }

  // If all criteria are met, return a success message
  return true;
};

export const isValidEmail = (email) => {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the regular expression
  return emailRegex.test(email);
};

export default {
  formatError,
  toastHanlder,
  isStrongPassword,
  isValidEmail,
};
