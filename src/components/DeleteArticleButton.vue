<script setup>
import { defineProps } from "vue"
import { useAsyncState } from '@vueuse/core';
import { useRouter } from "vue-router";
import api from '@/api'
import { toastHanlder } from '@/utils';


const props = defineProps(['slug']);
const router = useRouter()
const { isLoading, execute: onDeleteArticle } = useAsyncState(
    async () => {
        await api.deleteArticle(props.slug).then(() => {
            toastHanlder('success', 'Article deleted successfully')
            router.push('/')
        }).catch(error => {
            // Handle errors
            console.error('Error:', error);
        });
    },
    null,
    {
        immediate: false,
    },
)
</script>

<template>
    <button :disabled="isLoading" class="bg-red-400 text-white py-2 px-4 rounded" @click="() => onDeleteArticle()">
        Delete
    </button>
</template>