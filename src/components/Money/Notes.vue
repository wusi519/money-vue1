<template>
	<div>
		<label class="notes">
			<span class="name">备注</span>
			<input type="text" placeholder="在这里输入备注" v-model="value"
			/>
			<button class="notesDate">日期</button>
		</label>
	</div>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue {
    value = '';

    @Watch('value')
    onValueChanged(value: string): void {
      this.$emit('update:value', value);
    }
  }
</script>

<style lang="scss" scoped>
	.notes {
		font-size: 14px;
		background: #f5f5f5;
		display: flex;
		align-items: center;
		padding-left: 16px;

		> .name {
			padding-right: 16px;
		}

		> input {
			height: 64px;
			background: transparent;
			border: none;
			flex-grow: 1;
			padding-right: 16px;
		}

		.notesDate {
			margin-right: 16px;
		}
	}

</style>