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
export default {
  formatError,
  toastHanlder,
};
