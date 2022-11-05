<template>
	<!-- <TheNav /> -->
	<router-view v-slot="slotProps">
		<transition name="route" mode="out-in"> <component :is="slotProps.Component"> </component> </transition
	></router-view>
</template>
<script>
export default {};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

*,
*::before,
*::after {
	box-sizing: border-box;
}

html {
	font-family: "Roboto", sans-serif;
}
</style>
