<template>
    <div class="sidebar bg-blue-500 w-2/12 min-h-screen">
        <div class="title block text-white font-light text-2xl mb-2 p-3">
            Posts
        </div>
        <ul>
            <li class="p-2 text-white font-thin text-sm hover:bg-blue-100 hover:text-blue-400 cursor-pointer">
                <router-link class="font-bold" to="/articles/page/1">
                    All Articles
                </router-link>
            </li>
            <li class="p-2 text-white font-thin text-sm hover:bg-blue-100 hover:text-blue-400 cursor-pointer">
                <router-link class="font-bold" to="/articles/create">
                    Create Article
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {

}
</script>

<style></style>