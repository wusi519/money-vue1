<template>
	<div>
		<Layout>
			<ol class="tags">
				<li>
					<span>衣</span>
					<Icon name="right"/>
				</li>
				<li>
					<span>食</span>
					<Icon name="right"/>
				</li>
				<li>
					<span>住</span>
					<Icon name="right"/>
				</li>
				<li>
					<span>行</span>
					<Icon name="right"/>
				</li>
			</ol>
			<div class="createTag-wrapper">
				<button class="createTag">新建标签</button>
			</div>
		</Layout>
	</div>
</template>

<script lang="ts">

  import Layout from '@/components/Layout.vue';

  export default {
    name: 'Chart',
    components: {Layout},
  };
</script>

<style lang="scss" scoped>
	.tags {
		background: white;
		font-size: 16px;
		padding-left: 16px;
		padding-right: 16px;

		> li {
			min-height: 44px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #e6e6e6;

			svg {
				height: 18px;
				width: 18px;
				color: #666;
			}
		}
	}

	.createTag {
		background: #767676;
		color: white;
		border-radius: 4px;
		border: none;
		height: 36px;
		padding: 0 16px;

		&-wrapper {
			text-align: center;
			padding: 44-16px;
		}
	}

</style>