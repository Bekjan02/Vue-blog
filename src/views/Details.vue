<template>
  <div v-if="post" class="post">
    <h3>{{ post.title }}</h3>
    <p class="pre">{{ post.body }}</p>
    <button href="#" class="delete" @click="handleDelete">Удалить</button>
  </div>
  <div v-else> <Spinner/> </div>
</template>

<script>
import { onMounted } from "vue";
import getPost from "../composables/getPost";
import Spinner from "../components/Spinner.vue";
import { firestore } from "../firebase/config";
import { useRouter } from "vue-router";
export default {
  props: ["id"],
  components: { Spinner },
  setup(props) {
    const { post, error, fetchingPost } = getPost(props.id);
    onMounted(() => fetchingPost());
    const router = useRouter();

    const handleDelete = async () => {
      await firestore
        .collection("posts")
        .doc(props.id)
        .delete();
      router.push({ name: "Home" });
    };

    return { post, error, handleDelete };
  },
};
</script>

<style>
.post {
  max-width: 1200px;
  margin: 0 auto;
}
.post p {
  color: #444;
  line-height: 1.5em;
  margin-top: 40px;
}
.pre {
  white-space: pre-wrap;
}
</style>
