import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useUsersStore = defineStore('usersStore', () => {
  const users = ref<Array<{
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
  }>>([]);

  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const fetchUsers = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      users.value = response.data;
    } catch (err) {
      error.value = 'Ошибка при загрузке пользователей';
    } finally {
      loading.value = false;
    }
  };

  return { users, loading, error, fetchUsers };
});
