<template>
	<div class="bottomnav-wrapper" :class="classPrefix&&`${classPrefix}-wrapper`">
		<div class="content" :class="classPrefix&&`${classPrefix}-content`">
			<slot/>
		</div>
		<BottomNav/>
	</div>
</template>

<script lang="ts">
  export default {
    props: ['classPrefix'],
  };
</script>

<style lang="scss" >
	.bottomnav-wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.content {
		display: flex;
		flex-direction: column;
		overflow: auto;
		flex-grow: 1;
	}
</style>