<template>
  <div class="container">
    <div v-if="posts.length" class="grid">
      <PostsList v-if="showPost" :posts="posts" />
      <TagsCloud :posts="posts"/>
    </div>
    <div v-else> <Spinner/> </div>
    <button @click="showPost = !showPost">Скрыть/Показать элемент</button>
    <button @click="posts.pop()">Удалить последний элемент</button>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import PostsList from "../components/PostsList.vue";
import TagsCloud from "../components/TagsCloud.vue";
import Spinner from "../components/Spinner.vue";
import getPosts from "../composables/getPosts";

export default {
  name: "Home",
  components: { PostsList, TagsCloud, Spinner },
  setup() {
    const { posts, error, fetchingPosts } = getPosts();
    onMounted(() => fetchingPosts());

    const showPost = ref(true);

    return { posts, showPost, error };
  },
};
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}
.grid {
  display: grid;
  grid-template-columns:  3fr 1fr;
  gap: 20px;
}
</style>
