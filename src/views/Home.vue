<template>
	<div id="home">
		<form>
			<h1>Todo App :D</h1>
			<input type="text" v-model="creatorName" placeholder="Enter your name"/>
			<div class="error__message" :class="{ hide: addErrorMessage === '' }">{{ addErrorMessage }}</div>
			<router-link v-on:click.native="validateName" to="/" tag="button" type="submit">Go</router-link>
		</form>
	</div>
</template>

<script>
export default {
	data () {
		return {
			creatorName: '',
			addErrorMessage: ''
		}
	},
	methods: {
		validateName () {
			this.addErrorMessage = ''

			if (this.creatorName === '') this.addErrorMessage = 'Please enter your name'
			else this.$router.push({ name: 'List', params: { creator: this.creatorName } })
		}
	}
}
</script>

<style lang="scss">
	@import '../css/shared.scss';

	#home, form {
		@include display-flex();
		height: 100vh;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	input {
		font-family: 'Nunito';
		width: 20rem;
		font-size: 1.2rem;
		height: 2.5rem;
		padding: 0.5rem;
		border: 3px rgba(0, 0, 0, 0) solid;

		&:active, &:focus {
			border-color: #ffa500;
		}
	}

	button {
		width: 20rem;
		background-color: #ffa500;
		border: none;
		color: white;
		padding: 0.8rem 1.2rem;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 1rem;
		margin-bottom: 0.5rem;
		font-family: 'Nunito';
		font-size: 1.1rem;
		margin-top: 0.5rem;

		&:hover {
			cursor: pointer;
			background-color: rgb(121, 98, 67);
		}
	}

	.error__message {
		margin-top: 0.5rem;
	}
</style>
