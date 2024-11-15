import { defineStore } from 'pinia';
import axios from 'axios';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

export const usePostStore = defineStore('postStore', {
  state: (): PostState => ({
    posts: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchPosts(): Promise<void> {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=10');
        this.posts = response.data;
      } catch (error: any) {
        this.error = 'Ошибка загрузки постов: ' + error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});

