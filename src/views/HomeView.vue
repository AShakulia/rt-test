<script setup lang="ts">
import PostList from '@/components/PostList.vue';
</script>
<template>
    <router-link :to="{ name: 'users', query: { type: 'full' } }">Перейти к полным пользователям</router-link>
    <router-link :to="{ name: 'users', query: { type: 'short' } }">Перейти к сокращенному списку пользователей</router-link>
  <PostList/>
</template>
