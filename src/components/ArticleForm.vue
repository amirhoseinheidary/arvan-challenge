<script setup>
import { useAsyncState } from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router'
import api from '@/api'
import { onMounted, ref } from 'vue'

const errors = ref({})
const router = useRouter()
const tagList = ref([])
const route = useRoute()
const isArticleCreate = route.name === 'ArticleCreate'
const formStore = ref({
    title: '',
    description: '',
    body: '',
    tagList: '',
})
async function getArticle() {
    const { article } = await api.getArticle(route.params.id)

    tagList.value = article.tagList
    formStore.value.body = article.body
    formStore.value.description = article.description
    formStore.value.title = article.title
}
function createArticle() {
    return api.createArticle({
        article: Object.assign({}, formStore.value, { tagList: tagList.value }),
    })
}
function updateArticle() {
    return api.updateArticle({
        article: Object.assign({}, formStore.value, { tagList: tagList.value }),
        slug: route.params.id,
    })
}
function onEnter() {
    if (!formStore.value.tagList || tagList.value.includes(formStore.value.tagList))
        return

    tagList.value.push(formStore.value.tagList)
    formStore.value.tagList = ''
}
const { isLoading, execute: onSubmit } = useAsyncState(
    async () => {
        return (isArticleCreate ? createArticle() : updateArticle())
            .then(() => {
                router.push(`/`)
            })
            .catch((error) => {
                errors.value = error.errors || {}
            })
    },
    null,
    {
        immediate: false,
    },
)

onMounted(() => {
    if (!isArticleCreate)
        getArticle()
})
</script>

<template>
    <div class="editor-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-10 offset-md-1 col-xs-12">
                    <error-messages :errors="errors" />
                    <form autocomplete="on" @submit.prevent="() => onSubmit()">
                        <fieldset>
                            <fieldset class="form-group mb-3">
                                <input v-model="formStore.title" required type="text" name="title"
                                    placeholder="Article Title"
                                    class="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none">
                            </fieldset>
                            <fieldset class="form-group mb-3">
                                <input v-model="formStore.description" required type="text" name="description"
                                    class="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none"
                                    placeholder="What's this article about?">
                            </fieldset>
                            <fieldset class="form-group mb-3">
                                <textarea v-model="formStore.body" rows="8" required name="body"
                                    class="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none"
                                    placeholder="Write your article (in markdown)" />
                            </fieldset>
                            <fieldset class="form-group mb-3">
                                <input v-model="formStore.tagList" type="text" name="tagList"
                                    class="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none"
                                    placeholder="Enter tags" @keydown.enter.prevent="onEnter">
                                <div class="tag-list my-3">
                                    <span v-for="(tag, index) in tagList" :key="tag"
                                        class="bg-blue-400 text-white rounded-lg p-2 mr-2">
                                        <i class="ion-close-round" @click="tagList.splice(index, 1)" />
                                        {{ tag }}
                                    </span>
                                </div>
                            </fieldset>
                            <button type="submit" :disabled="isLoading"
                                class="block py-2 px-4 text-white bg-blue-500 rounded hover:rounded-lg disabled:bg-gray-400">
                                Publish Article
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
