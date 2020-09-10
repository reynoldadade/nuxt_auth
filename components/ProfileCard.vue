<template>
	<div class="container my-8 mx-20 flex flex-col">
		<div class="relative w-40">
			<img
				class="w-40 h-40 rounded-full border-2 border-gray-200"
				:src="profile.avatar"
				alt="Profile image"
			/>
			<span
				class="inline-block w-3 h-3 rounded-full mr-2 absolute bottom-0 right-0"
				:class="profile.active ? 'bg-green-500' : 'bg-red-500'"
			></span>
		</div>

		<div class="pt-6 pb-8 text-gray-600 w-full">
			<p>
				<i class="far fa-user"></i> {{ profile.name }} ({{
					profile.username
				}})
			</p>
			<p class="text-sm font-bold">
				<i class="far fa-envelope"></i> {{ profile.email }}
			</p>

			<p class="text-sm font-semibold">
				<i class="fas fa-globe-europe"></i> {{ profile.country }}
			</p>
			<p class="text-sm font-semibold">
				<i class="fas fa-map-pin"></i> {{ profile.postcode }}
			</p>
			<p class="text-sm font-semibold">
				<i class="fas fa-phone-alt"></i> {{ profile.phone_number }}
			</p>
		</div>
		<button
			@click="$router.push('/profile/edit')"
			class="p-1 bg-black rounded hover:bg-red-500 focus:bg-red-700 transition ease-in duration-200 focus:outline-none text-white w-40"
		>
			Edit Profile <i class="fas fa-user-edit"></i>
		</button>
	</div>
</template>

<script>
export default {
	props: ['profile'],
};
</script>

<style></style>
