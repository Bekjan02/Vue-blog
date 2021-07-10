import { ref } from "vue";
import { firestore } from "@/firebase/config";

const getPost = (id) => {
  const post = ref(null);
  const error = ref(null);
  const fetchingPost = async () => {
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      const response = await firestore
        .collection("posts")
        .doc(id)
        .get();
      post.value = { ...response.data(), id };
    } catch (e) {
      error.value = e.message;
      console.log(e);
    }
  };
  return { post, error, fetchingPost };
};

export default getPost;
