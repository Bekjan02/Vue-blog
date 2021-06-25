import { ref } from "vue";
const getPosts = () => {
  const posts = ref([]);
  const error = ref(null);
  const fetchingPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts");
      if (!response.ok) {
        throw Error("No data Available");
      }
      posts.value = await response.json();
    } catch (e) {
      error.value = e.message;
      console.log(e);
    }
  };
  return { posts, error, fetchingPosts }
};

export default getPosts