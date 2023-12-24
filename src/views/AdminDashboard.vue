
<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import api from '@/api'
import TheHeader from '../components/TheHeader';
import TheSidebar from '../components/TheSidebar';
import DeleteArticleButton from '../components/DeleteArticleButton';


const { userInfo } = useUserStore();

const articles = ref({});
const articlesCount = ref(0);

onMounted(async () => {
  try {
    const data = await api.getAllPosts(userInfo.username, 1, 10);

    articles.value = data.articles;
    articlesCount.value = data.articlesCount;

  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <TheHeader />
  <div class="main flex min-h-screen">
    <TheSidebar />
    <div class="main w-10/12 px-4">
      <h2 class="text-3xl p-4 mb-3">All Posts</h2>
      <div class="relative overflow-x-auto">
        <table class="w-full table-auto text-center">
          <thead class="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Tags</th>
              <th>Excpert</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="articlesCount == 0">
              <td colspan="7">No Article added yet, add your first article now.</td>
            </tr>
            <tr v-for="article in   articles  " :key="article.slug">
              <td>#</td>
              <td>{{ article.title }}</td>
              <td>{{ article.author.username }}</td>
              <td>{{ article.tagList.join(',') }}</td>
              <td>{{ article.body }}</td>
              <td>{{ article.createdAt }}</td>
              <td>
                <DeleteArticleButton :slug="article.slug" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style></style>