<template>
  <div v-if="post" class="post">
    <h3>{{ post.title }}</h3>
    <p class="pre">{{ post.body }}</p>
    <button class="delete" href="#" @click="handleDelete">Delete</button>
  </div>
  <div v-else><Spinner /></div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import getPost from "../composables/getPost";
import Spinner from "../components/Spinner.vue";
import { firestore } from "../firebase/config";
import { useRouter } from "vue-router";
export default {
  props: ["id"],
  components: { Spinner },
  setup(props) {
    const { post, error, fetchingPost } = getPost(props.id);
    const router = useRouter();

    onMounted(() => fetchingPost());

    const handleDelete = async () => {
      try {
        await firestore.collection("posts").doc(props.id).delete();

        router.push({ name: "Home" });
      } catch (e) {
        console.log(e);
      }
    };

    return { handleDelete, post, error };
  },
};
</script>

<style>
.post {
  max-width: 1200px;
  margin: 0 auto;
}
.props p {
  color: #444;
  line-height: 1.5em;
  margin-top: 40px;
}
.pre {
  white-space: pre-wrap;
}
</style>