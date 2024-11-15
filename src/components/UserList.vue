<script setup lang="ts">
import { ref, onMounted, watchEffect, computed } from 'vue';
import { useUsersStore } from '@/stores/userStore';
import SearchBar from '@/components/SearchBar.vue';
import { useRoute } from 'vue-router';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const usersStore = useUsersStore();

const users = ref<User[]>(usersStore.users);
const loading = ref<boolean>(usersStore.loading);
const error = ref<string | null>(usersStore.error);
const query = ref<string>('');

const route = useRoute();
const listType = computed(() => route.query.type || 'full');

onMounted(() => {
  usersStore.fetchUsers();
});

watchEffect(() => {
  users.value = usersStore.users;
  loading.value = usersStore.loading;
  error.value = usersStore.error;
});

const filteredUsers = computed(() => {
  return users.value.filter(user =>
    user.name.toLowerCase().includes(query.value.toLowerCase()) ||
    user.username.toLowerCase().includes(query.value.toLowerCase()) ||
    user.email.toLowerCase().includes(query.value.toLowerCase())
  );
});
</script>
<template>
  <div>
    <SearchBar v-model:query="query" />
    <div v-if="loading">Загрузка...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <ul v-if="!loading && !error && filteredUsers.length">
      <li v-for="user in filteredUsers" :key="user.id">
        <h1>{{ user.name }}</h1>
        <h3>{{ user.username }}</h3>
        <p>{{ user.email }}</p>
        <div v-if="listType === 'full'"> 
          <p>{{ user.address.street }}</p>
          <p>{{ user.phone }}</p>
          <p>{{ user.company.name }}</p>
        </div>
      </li>
    </ul>
    <p v-else-if="!loading && !error">Пользователи не найдены.</p>
  </div>
</template>
<style scoped>
.error {
  color: red;
  font-weight: bold;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 12px;
}
p {
  color: red;
  font-weight: bold;
}
</style>

