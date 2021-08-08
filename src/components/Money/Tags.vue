<template>
	<div class="tags">
		<ul class="current">
			<li v-for="tag in tagList" :key="tag.id" @click="toggle(tag)" :class="{selected:selectedTags.indexOf(tag)>=0}"
			>{{tag.name}}
			</li>
		</ul>
		<div class="createNewTag">
			<button @click="createNewTag">新增标签</button>
		</div>
	</div>

</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {mixins} from 'vue-class-component';
  import TagHelper from '@/mixins/TagHelper';

  @Component
  export default class Tags extends mixins(TagHelper) {

    selectedTags: string[] = [];

    get tagList() {
      return this.$store.state.tagList;
    }

    created() {
      this.$store.commit('fetchTags');
    }

    toggle(tag: string): void {
      const index = this.selectedTags.indexOf(tag);
      if (this.selectedTags.length === 0) {
        this.selectedTags.push(tag);
      } else if (this.selectedTags.length === 1) {
        if (index < 0) {
          this.selectedTags.splice(index, 1, tag);
        } else {
          this.selectedTags.splice(index, 1);
        }
      }
      this.$emit('update:value', this.selectedTags);
    }
  }
</script>

<style lang="scss" scoped>
	.tags {
		margin-top: 30px;
		display: flex;
		flex-direction: column;
		flex-grow: 1;

		> .current {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			overflow: auto;
			flex-wrap: wrap;

			> li {
				margin-left: 16px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 48px;
				height: 48px;
				background: green;
				border-radius: 50%;
				margin-bottom: 4px;
				&.selected {
					background: red;
					color: white;
				}
			}
		}

		> .createNewTag {
			padding-top: 16px;
			align-self: flex-start;
			margin-left: 16px;

			> button {
				background: transparent;
				border: none;
				color: #999;
				border-bottom: 1px solid #999;
			}
		}

	}

</style>