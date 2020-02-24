<template>
	<div id="app">
		<header-app></header-app>
		<router-view/>
	</div>
</template>

<script>
import Header from './components/Header.vue'

export default {
	components: {
		headerApp: Header
	}
}
</script>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');

	* {
		box-sizing: border-box;
	}

	body {
		margin: 0;
		padding: 0;
		font-family: 'Nunito';
	}

	#app {
		background-color: rgb(29, 29, 29);
		min-height: 100vh;
		width: 100%;
		color: white;
	}
</style>
