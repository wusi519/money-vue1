<template>
	<Layout >
		<div class="tags">
			<router-link v-for="tag in tags" :key="tag.id" class="tag" :to="`/labels/edit/${tag.id}`">
				<span>{{tag.name}}</span>
				<Icon name="right"/>
			</router-link>
		</div>
		<div class="createTag-wrapper">
			<Button @click="createNewTag">新建标签</Button>
		</div>
	</Layout>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';
  import TagHelper from '@/mixins/TagHelper';
  import {mixins} from 'vue-class-component';

  @Component({
    components: {Button},
  })
  export default class Label extends mixins(TagHelper) {
   get tags() {
      return this.$store.state.tagList;
    }
    beforeCreate() {
      this.$store.commit('fetchTags');
    }
  }
</script>

<style lang="scss" scoped>
	.tags {
		background: white;
		font-size: 16px;
		padding-left: 16px;
		padding-right: 16px;

		> .tag {
			border-bottom: 1px solid #e6e6e6;
			min-height: 44px;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			> svg {
				width: 18px;
				height: 18px;
				color: #666;
			}
		}
	}

	.createTag {
		background: #767676;
		border: none;
		color: white;
		border-radius: 4px;
		padding: 8px 17px;

		&-wrapper {
			padding-top: 44px;
			text-align: center;
		}
	}
</style>