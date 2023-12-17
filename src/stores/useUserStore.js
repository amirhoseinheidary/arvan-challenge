import api from "@/api";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
  const userInfo = ref(null);
  const isLoggedIn = computed(() => userInfo.value !== null);
  const updateUserInfo = (user) => {
    userInfo.value = user;
    localStorage.setItem("arvan-token", user.token);
  };
  const logoutUser = () => {
    userInfo.value = null;
    localStorage.removeItem("arvan-token");
  };
  const handleAuthAction = async (type, formStore) => {
    const { user } =
      type === "register"
        ? await api.register(formStore)
        : await api.login(formStore);

    updateUserInfo(user);
  };
  const getUserInfo = async () => {
    const { user } = await api.getUserInfo();

    updateUserInfo(user);
  };

  return { userInfo, isLoggedIn, handleAuthAction, getUserInfo, logoutUser };
});
