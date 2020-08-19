<template>
	<div>
		<div class="border-4 rounded-lg m-2 overflow-hidden border-gray-300">
			<img :src="imageToURl" alt="avatar" class="object-contain" />
		</div>
		<div class="border-2 m-2">
			<input type="file" @change="updateImage" />
		</div>
		<button
			class="w-full block bg-black text-white rounded-md p-2 font-bold hover:bg-gray-700"
			@click="changeAvatar()"
			v-if="this.showUpdateImageButton"
		>
			Change picture
		</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showUpdateImageButton: false,
		};
	},
	props: ['imageToURL'],
	methods: {
		updateImage(event) {
			this.avatarImage = event.target.files[0];
			console.log(this.avatarImage.size);
			if (this.avatarImage.size > 204800) {
				this.notify({
					title: 'Psst',
					text: 'Your image is more than 200KB',
					type: 'error',
				});
			} else {
				this.showUpdateImageButton = true;
				this.imageToURl = URL.createObjectURL(this.avatarImage);
			}
		},
	},
};
</script>

<style></style>
