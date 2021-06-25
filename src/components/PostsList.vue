<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.id">
      <SinglePost :post="post" />
    </div>
  </div>
</template>

<script>
import SinglePost from "./SinglePost.vue";
import { ref } from "vue";

export default {
  components: { SinglePost },
  props: ["posts"],
  setup() {

  },
};
</script>

<style scoped></style>
