<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emit = defineEmits<{
  (event: 'update:query', query: string): void;
}>();

const query = ref<string>('');

const updateQuery = (): void => {
  emit('update:query', query.value);
};
</script>
<template>
  <div>
    <input
      v-model="query"
      type="text"
      placeholder="Поиск пользователя..."
      class="searchbar"
      @input="updateQuery"
    />
  </div>
</template>
<style scoped>
.searchbar {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
