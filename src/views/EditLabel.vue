<template>
	<div class="layout-wrapper">
		<Layout>
			<div class="navBar">
				<Icon @click="fallBack" class="leftIcon" name="left"/>
				<span class="title">编辑标签</span>
				<span class="rightSpan"></span>
			</div>
			<div class="form-wrapper">
				<FormItem :value="tag.name" @update:value="update" field-name="标签名" place-holder="请输入标签名"/>
			</div>
			<div class="button-wrapper">
				<Button>删除标签</Button>
			</div>
		</Layout>
	</div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import tagListModel from '@/models/tagListModel';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button, FormItem}
  })
  export default class EditLabels extends Vue {
    tag?: { id: string, name: string } = undefined;

    created() {
      const id = this.$route.params.id;
      tagListModel.fetch();
      const tags = tagListModel.data;
      const tag = tags.filter(t => t.id === id)[0];
      if (!this.tag) {
        this.$router.replace('/404');
      } else {
        console.log(tag);
      }
    }

    update(name: string): void {
      if (this.tag) {
        window.updateTag(this.tag.id, name);
      }
    }

    remove() {
      if (this.tag && window.removeTag(this.tag.id)) {
        this.$router.replace('/label');
      } else {
        window.alert('删除失败');
      }
    }

    fallBack() {
      this.$router.back();
    }
  }
</script>

<style lang="scss" scoped>
	.layout-wrapper {
		background: #f5f5f5;
	}

	.navBar {
		background: white;
		padding: 12px 16px;
		font-size: 16px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		> .leftIcon {
			height: 24px;
			width: 24px;
		}

		> .rightSpan {
			height: 24px;
			width: 24px;
		}
	}

	.form-wrapper {
		font-size: 16px;
		margin-top: 8px;
		background: white;
	}


	.button-wrapper {
		text-align: center;
		padding: 16px;
		margin-top: 44-16px;
	}
</style>