<template>
	<div>
		<label class="formItem" :class="{[classPrefix+'-formitem']:classPrefix}">
			<span class="name">{{this.fieldName}}</span>
			<input type="text" :value="value" @input="onInputValue($event.target.value)" :placeholder="placeHolder">
		</label>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class FormItem extends Vue {
    @Prop({required: true}) readonly fieldName!: string;
    @Prop() readonly placeHolder?: string;
    @Prop({default: ''}) readonly value!: string;
    @Prop(String) classPrefix?: string;

    onInputValue(value: string): void {
      this.$emit('update:value', value);
    }
  }
</script>

<style lang="scss" scoped>
	.formItem {
		font-size: 14px;
		display: flex;
		align-items: center;
		padding-left: 16px;

		> .name {
			padding-right: 16px;
		}

		> input {
			height: 44px;
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