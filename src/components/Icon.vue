<template>
		<svg class="icon" >
			<use :xlink:href="'#'+name"/>
		</svg>
</template>

<script lang="ts">
  export default {
    props:['name'],
    name: 'Icon.vue'
  };
</script>

<style lang="scss" scoped>

</style>