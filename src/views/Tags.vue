<template>
  <div class="container">
    <div v-if="error">{{ error }}</div>
    <div v-if="filteredTags" class="grid">
      <PostsList :posts="filteredTags" />
      <TagsCloud :posts="posts" />
    </div>

    <div v-else><Spinner /></div>
  </div>
</template>

<script>
import PostsList from "@/components/PostsList.vue";
import getPosts from "../composables/getPosts";
import { computed, onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import Spinner from "../components/Spinner.vue";
import TagsCloud from "@/components/TagsCloud.vue";

export default {
  components: { PostsList, Spinner, TagsCloud },
  setup(Spinner) {
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

<style></style>
