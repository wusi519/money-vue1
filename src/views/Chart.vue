<template>
	<Layout>
		<Tabs :data-source="recordTypeList" :value.sync="type" class-prefix="type"/>
		<Tabs :data-source="intervalList" :value.sync="interval" class-prefix="interval"/>
		<ol>
			<li v-for="(group,index) in result" :key="index.id">
				<h3 class="billTitle">{{group.title}}</h3>
				<ol>
					<li v-for="item in group.items" :key="item.id" class="billRecord">
						<span>{{tagString(item.tags)}}</span>
						<span class="billNotes">{{item.notes}}</span>
						<span>￥{{item.amount}}</span>
					</li>
				</ol>
			</li>
		</ol>
	</Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Layout from '@/components/Layout.vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import intervalList from '@/constants/intervalList';

  @Component({
    components: {Tabs, Layout}
  })
  export default class Chart extends Vue {
    tagString(tags: Tag[]) {
      return tags.length === 0 ? '无' : tags.join(',');
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get result() {
      const {recordList} = this;
      type HashTableValue = { title: string, items: RecordItem[] }

      const hashTable: { [key: string]: HashTableValue } = {};
      for (let i = 0; i < recordList.length; i++) {
        const [date, time] = recordList[i].createdAt!.split('T');
        hashTable[date] = hashTable[date] || {title: date, items: []};
        hashTable[date].items.push(recordList[i]);
      }
      return hashTable;
    }

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    type = '-';
    interval = 'day';
    intervalList = intervalList;
    recordTypeList = recordTypeList;
  }
</script>

<style lang="scss" scoped>
	::v-deep {
		.type-tabs-item {
			background: white;

			&.selected {
				background: #c4c4c4;

				&::after {
					display: none;
				}
			}
		}

		.interval-tabs-item {
			height: 48px;
		}
	}

	%item {
		padding: 8px 16px;
		line-height: 24px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.billTitle {
		@extend %item;
	}

	.billRecord {
		@extend %item;
		background: white;
	}

	.billNotes {
		@extend %item;
		margin-right: auto;
		margin-left: -4px;
		color: #999;
	}
</style>