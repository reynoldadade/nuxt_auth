<template>
	<div class="w-full flex flex-wrap">
		<div class="px-8 pt-6 pb-8 mb-4 flex flex-col my-2 w-full md:w-1/2 ">
			<div class="grid grid-cols-6 gap-4">
				<div class="col-start-3 col-span-4">
					<div
						class="border-4 rounded-lg m-2 overflow-hidden border-gray-300"
					>
						<img
							:src="imageToURl"
							alt="avatar"
							class="object-contain"
						/>
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
						<i
							class="fas fa-circle-notch fa-spin"
							v-if="loading"
						></i>
					</button>
				</div>
			</div>
		</div>
		<div class="px-8 pt-6 pb-8 mb-4 flex flex-col my-2 w-full md:w-1/2">
			<EditProfileComponent :profile="profile" />
		</div>
	</div>
</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import EditProfileComponent from '@/components/EditProfile';
export default {
	name: 'register',
	layout: 'main',
	components: {
		EditProfileComponent,
	},
	head() {
		return {
			title: 'Walulel | Edit Profile',
		};
	},
	mounted() {
		this.imageToURl = this.profile.avatar;
	},
	computed: {
		...mapGetters({
			profile: 'user/getProfile',
		}),
	},
	data() {
		return {
			loading: false,
			imageToURl: '',
			showUpdateImageButton: false,
			avatarImage: '',
		};
	},
	validations: {
		form: {
			name: {
				required,
			},
			username: {
				required,
				minLength: minLength(6),
			},
			phone_number: {
				required,
			},
			email: {
				required,
				email,
			},

			post_code: {
				required,
			},
			country: {
				required,
			},
		},
	},
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

		async changeAvatar() {
			this.loading = true;
			let formData = new FormData();
			formData.append('avatar', this.avatarImage);
			this.notify({
				title: 'Hey there',
				type: 'info',
				text: 'updating profile image',
			});

			this.$axios
				.$post('/user/profile/avatar', formData, {
					'Content-type': 'multipart/form-data',
				})
				.then(response => {
					this.notify({
						title: 'Great',
						type: 'success',
						text: 'Avatar Successfully Updated',
					});
					this.$router.push('/profile');
					this.loading = false;
				})
				.catch(error => {
					console.log(error);
					this.notify({
						title: 'Sorry',
						type: 'error',
						text: 'update failed',
					});
				});
		},
	},
};
</script>

<style></style>
