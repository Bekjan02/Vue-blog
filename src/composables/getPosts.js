import { ref } from 'vue'
import { firestore } from '@/firebase/config'

const getPosts = () => {
	const posts = ref([])
	const error = ref(null)

	const fetchingPosts = async () => {
		try {
			const response = await firestore
				.collection('posts')
				.orderBy('date', 'desc')
				.get()
			posts.value = response.docs.map((doc) => {
				return { ...doc.data(), id: doc.id }
			})
		} catch (e) {
			error.value = e.message
			console.log(e)
		}
	}
	return { posts, error, fetchingPosts }
}

export default getPosts
