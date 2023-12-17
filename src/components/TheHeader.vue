<script>
import { useUserStore } from '@/stores/useUserStore';

export default {
    data() {
        return {
            username: ''
        }
    },
    mounted() {
        const { userInfo } = useUserStore();
        this.username = userInfo.username;
    },
    methods: {
        logout() {
            const { logoutUser } = useUserStore();
            logoutUser();
            this.$router.push('/login');
        }
    }
}
</script>

<template>
    <div class="w-full bg-slate-700 text-white py-3 px-2 flex justify-between items-center ">
        <div class="left-side">
            <span class="logo font-semibold mr-4">Arvan Challenge</span>
            <span class="font-light">
                welcome
            </span>
            <span class="font-bold">{{ username }}</span>
        </div>
        <div class="right-side">
            <button type="button" class="bg-trasparent px-2 py-1 rounded border-2 border-sky-600 text-sky-600"
                @click="logout">Log out</button>
        </div>
    </div>
</template>


<style></style>