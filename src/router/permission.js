import router from "./index";
import { useUserStore } from "@/stores/useUserStore";

router.beforeEach(async (to) => {
  const store = useUserStore();
  const token = localStorage.getItem("arvan-token");
  const WHITE_LIST = ["Login", "Register"];

  if (store.isLoggedIn) {
    return true;
  } else {
    if (token) {
      try {
        await store.getUserInfo();
        return true;
      } catch {
        localStorage.removeItem("arvan-token");
        return "/login";
      }
    } else {
      if (WHITE_LIST.includes(to.name)) {
        return true;
      } else {
        return "/login";
      }
    }
  }
});
