<template>
	<button class="button"
					@click="$emit('click',$event)"
	>
		<slot/>
	</button>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Button extends Vue {
  }
</script>

<style lang="scss" scoped>
	.button {
		background: #f9d957;
		border: none;
		color: #000000;
		border-radius: 4px;
		padding: 8px 17px;
	}
</style>