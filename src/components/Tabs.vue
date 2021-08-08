<template>
	<ul class="tabs">
		<li v-for="item in dataSource" :key="item.value" :class="liClass(item)"
				@click="select(item)">{{item.text}}
		</li>
	</ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  type DataSourceItem = { text: string, value: string }
  @Component
  export default class Tabs extends Vue {
    @Prop({required: true, type: Array})
    dataSource!: DataSourceItem[];
    @Prop(String) readonly value!: string;
    @Prop(String) classPrefix?: string;

    select(item: DataSourceItem) {
      this.$emit('update:value', item.value);
    }
    liClass(item:DataSourceItem){
      return {selected:item.value===this.value,
				[this.classPrefix+'-tabs-item']:this.classPrefix}
		}
  }
</script>

<style lang="scss" scoped>
	.tabs {
		background: #c4c4c4;
		display: flex;
		font-size: 24px;

		> li {
			width: 50%;
			height: 64px;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;

			&.selected::after {
				content: '';
				position: absolute;
				width: 100%;
				height: 4px;
				background: #333;
				bottom: 0;
				left: 0;
			}
		}
	}
</style>