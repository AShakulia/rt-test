<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { usePostStore } from '@/stores/postStore';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const postStore = usePostStore();

const posts = ref<Post[]>(postStore.posts);
const loading = ref<boolean>(postStore.loading);
const error = ref<string | null>(postStore.error);

onMounted(() => {
  postStore.fetchPosts();
});

watchEffect(() => {
  posts.value = postStore.posts;
  loading.value = postStore.loading;
  error.value = postStore.error;
});
</script>
<template>
  <div>
    <div v-if="loading">Загрузка...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <ul v-if="!loading && !error">
      <li v-for="post in posts" :key="post.id">
        <h1>{{ post.userId }}</h1>
        <h3>{{ `${post.id} ${post.title}` }}</h3>
        <p>{{ post.body }}</p>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.error {
  color: red;
  font-weight: bold;
}
</style>

