<template>
	<svg class="icon" @click="$emit('click',$event)">
		<use :xlink:href="'#'+name"/>
	</svg>
</template>

<script lang="ts">
  export default {
    props: ['name'],
    name: 'Icon.vue'
  };
</script>

<style lang="scss" scoped>

</style>