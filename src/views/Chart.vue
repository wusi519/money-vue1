<template>
	<Layout>
		<Tabs :data-source="recordTypeList" :value.sync="type" class-prefix="type"/>
		<ol v-if="groupList.length>0">
			<li v-for="(group,index) in groupList" :key="index">
				<h3 class="billTitle">{{beautify(group.title)}} <span>￥{{group.total}}</span></h3>
				<ol>
					<li v-for="item in group.items" :key="item.id" class="billRecord">
						<span>{{tagString(item.tags)}}</span>
						<span class="billNotes">{{item.notes}}</span>
						<span>￥{{item.amount}}</span>
					</li>
				</ol>
			</li>
		</ol>
		<div v-else class="noBill">
			目前没有任何记录
		</div>
	</Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Layout from '@/components/Layout.vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import intervalList from '@/constants/intervalList';
  import dayjs from 'dayjs';
  import deepClone from '@/lib/deepClone';


  @Component({
    components: {Tabs, Layout}
  })
  export default class Chart extends Vue {
    tagString(tags: Tag[]) {
      return tags.length === 0 ? '无' : tags.map(t => t.name).join(',');
    }

    beautify(string: string) {
      const day = dayjs(string);
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('M月D日');
      } else {
        return day.format('YYYY年M月D日');
      }
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get groupList() {
      const {recordList} = this;

      type HashTableValue = { title: string, items: RecordItem[] }
      type Result = { title: string, total?: number, items: RecordItem[] }[]
      const newList = deepClone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      if (newList.length === 0) {return [];}
      const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-M-D'), items: [newList[0]]}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format('YYYY-M-D'), items: [current]});
        }
      }
      result.map(group => {group.total = group.items.reduce((sum, item) => sum + item.amount, 0);});
      return result;
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
			background: #c4c4c4;

			&.selected {
				background: white;

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
	.noBill{
		padding:16px;
	}
</style>