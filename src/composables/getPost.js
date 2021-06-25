import { ref } from "vue";
const getPost = (id) => {
  const post = ref(null);
  const error = ref(null);
  const fetchingPost = async () => {
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      const response = await fetch("http://localhost:3000/posts/" + id);
      if (!response.ok) {
        throw Error("No data Available");
      }
      post.value = await response.json();
      console.log(post.value);
    } catch (e) {
      error.value = e.message;
      console.log(e);
    }
  };
  return { post, error, fetchingPost };
};

export default getPost;
