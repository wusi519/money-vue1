<template>
	<Layout>
		<div class="tags">
			<router-link class="tag" :to="`/lables/edit/${tag.id}`" v-for="tag in tags" :key="tag.id">
				<span>{{tag.name}}</span>
				<Icon name="right"/>
			</router-link>
		</div>
		<div class="createTag-wrapper">
			<Button @click="createTag">新建标签</Button>
		</div>
	</Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import tagListModel from '@/models/tagListModel';
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';

  tagListModel.fetch();

  @Component({
    components: {Button}
  })
  export default class Label extends Vue {
    tags = tagListModel.data;

    createTag() {
      const name = window.prompt('请输入标签名');
      const message = tagListModel.create(name);
      if (message !== 'duplicated') {
        if (message === 'null') {
          window.alert('标签名不能为空');
        }
      } else {
        window.alert('标签名重复');
      }
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
			flex-direction: colomn;
			align-items: center;
			justify-content: space-between;

			svg {
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