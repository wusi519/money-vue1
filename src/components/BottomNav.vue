<template>
	<nav>
		<router-link to="/money" class="item" active-class="selected">
			<Icon name="money"/>
			<span>记账</span>
		</router-link>
		<router-link to="/statistics" class="item" active-class="selected">
			<Icon name="chart"/>
			<span>图表</span>
		</router-link>
		<router-link to="/labels" class="item" active-class="selected">
			<Icon name="icon"/>
			<span>标签</span>
		</router-link>


	</nav>
</template>

<script lang="ts">

  let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
  try {importAll(require.context('../assets/icons', true, /\.svg$/));} catch (error) {console.log(error);}

  export default {
    name: 'BottomNav',
  };
</script>

<style lang="scss">
	@import "../assets/style/Helper";

	nav {
		display: flex;
		flex-direction: row;
		font-size: 12px;
		@extend %outerShadow;

		> .item {
			padding: 2px 0;
			width: 33.33%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			> span {
				font-size: 1.2em;
			}

			.icon {
				width: 32px;
				height: 32px;
			}
		}

		> .item.selected {
			color: $color-highlight;
		}
	}
</style>