<template>
  <div class="home">
    <PostsList v-if="showPost" :posts="posts" />
    <button @click="showPost = !showPost">Скрыть/Показать элемент</button>
    <button @click="posts.pop()">Удалить последний элемент</button>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import PostsList from "../components/PostsList.vue";
import getPosts from '../composables/getPosts';

export default {
  name: "Home",
  components: { PostsList },
  setup() {

    const { posts, error, fetchingPosts } = getPosts()
    onMounted(() => fetchingPosts());

    const showPost = ref(true);

    return { posts, showPost, error };
  },
};
</script>

<style>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}
</style>
