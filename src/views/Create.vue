<template>
	<div class="create">
		<form @submit.prevent="handleSubmit">
			<label class="label">Заголовок:</label>
			<input type="text" required v-model="title" />

			<!-- <label class="label">Картинка:</label>
      <input type="file" required @change="onFileSelected" /> -->

			<label class="label">Контент:</label>
			<textarea type="text" required v-model="body"></textarea>

			<label class="label">Теги:</label>
			<input @keydown.enter.prevent="handleAddTag" type="text" v-model="tag" />

			<div v-for="tag in tags" :key="tag" class="pill">#{{ tag }}</div>

			<button v-if="!isPending">Создать</button>
      <button v-else disabled>Creation...</button>
		</form>
	</div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { firestore, timestamp } from "../firebase/config";
export default {
	setup() {
		const title = ref("");
		const body = ref("");
		const tag = ref("");
		const tags = ref([]);
		const img = ref(null);
		const isPending = ref(false);

		const router = useRouter();

		const onFileSelected = (e) => {
			this.img = e.target.files[0];
		};

		const handleAddTag = () => {
			tag.value = tag.value.replace(/\s/, "");

			if (!tags.value.includes(tag.value) && tag.value !== "") {
				tags.value.push(tag.value);
			}
			tag.value = "";
		};

		const handleSubmit = async () => {
			try {
				isPending.value = true;
				const newPost = {
					title: title.value,
					body: body.value,
					tags: tags.value,
					date: timestamp(),
				};

				await firestore.collection("posts").add(newPost);

				isPending.value = false;
				router.push({ name: "Home" });
			} catch (e) {
				console.log(e.message);
			}
		};

		return {
			title,
			body,
			tag,
			tags,
			handleAddTag,
			handleSubmit,
			onFileSelected,
      isPending
		};
	},
};
</script>

<style>
.inputFiles__label {
	font-size: 30px;
	border: #444 1px dotted;
	padding: 40px;
}
.inputFiles {
	opacity: 0;
	width: 100%;
	height: 100%;
}
form {
	max-width: 480px;
	margin: 0 auto;
	text-align: left;
}
input,
textarea {
	display: block;
	margin: 10px 0;
	width: 100%;
	box-sizing: border-box;
	padding: 10px;
	border: 1px solid #eee;
}
textarea {
	height: 160px;
	resize: none;
}
.label {
	display: inline-block;
	margin-top: 30px;
	position: relative;
	font-size: 20px;
	color: white;
	margin-bottom: 10px;
	padding: 5px 0;
}
.label::before {
	content: "";
	display: block;
	width: 100%;
	height: 100%;
	background: #ff8800;
	position: absolute;
	top: 0;
	z-index: -1;
	padding-right: 40px;
	left: -30px;
	transform: rotateZ(-1deg);
}
button {
	display: block;
	margin-top: 30px;
	background: #ff8800;
	color: white;
	border: none;
	padding: 8px 16px;
	font-size: 18px;
	cursor: pointer;
}
.pill {
	display: inline-block;
	margin: 10px 10px 0 0;
	color: #444;
	background: #ddd;
	padding: 8px;
	border-radius: 20px;
	font-size: 14px;
}
</style>
