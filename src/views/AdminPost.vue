<template>
  <TheHeader />
  <div class="main flex min-h-screen">
    <TheSidebar />
    <div class="main w-10/12 px-4">
      <h2 class="text-3xl p-4 mb-3">Create Post</h2>
      <ArticleForm />
    </div>
  </div>
</template>

<script setup>
import TheHeader from '../components/TheHeader';
import TheSidebar from '../components/TheSidebar';
import ArticleForm from '../components/ArticleForm';


</script>

<style></style>