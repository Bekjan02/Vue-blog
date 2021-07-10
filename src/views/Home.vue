<template>
  <div class="container">
    <div v-if="posts.length" class="grid">
      <PostList v-if="showPosts" :posts="posts" />
      <TagsCloud :posts="posts" />
    </div>
    <div v-else>
      <Spinner />
    </div>
    <button @click="showPosts = !showPosts">Скрыть/Показать посты</button>
    <button @click="posts.pop()">Delete last post</button>
  </div>
</template>

<script>
// @ is an alias to /src
import { onMounted, ref } from "vue";
import PostList from "../components/PostsList.vue";
import Spinner from "../components/Spinner.vue";
import getPosts from '../composables/getPosts';
import TagsCloud from "../components/TagsCloud.vue";

export default {
  components: { PostList, TagsCloud, Spinner },
  setup() {
    
    const { posts,error,fetchingPosts } = getPosts();

    onMounted(() => fetchingPosts());

    const showPosts = ref(true);
    return { posts, showPosts };
}
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}
.grid{
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
}
</style>