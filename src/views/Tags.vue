<template>
  <div class="container">
    <div v-if="filteredTags.length">
      <PostsList :posts="filteredTags" />
      <TagsCloud :posts="posts" />
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import PostsList from "@/components/PostsList.vue";
import Spinner from "@/components/Spinner.vue";
import TagsCloud from "../components/TagsCloud.vue";
import getPosts from "@/composables/getPosts";
import { computed, onMounted, watch, watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
export default {
  components: { PostsList, Spinner, TagsCloud },
  setup() {
    const route = useRoute();
    const tag = route.params.tag;
    const { posts, error, fetchingPosts } = getPosts();

    const filteredTags = computed(() => {
      return posts.value.filter((post) => post.tags.includes(tag));
    });

    onMounted(() => fetchingPosts());

    return { filteredTags, error, posts };
  },
};
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}
</style>