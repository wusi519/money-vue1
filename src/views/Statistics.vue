<template>
	<Layout>
		<Tabs :data-source="recordTypeList" :value.sync="type" class-prefix="type"/>
		<div class="chart-wrapper" ref="chartWrapper">
			<Charts class="chart" :options="x"/>
		</div>
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
  import dayjs from 'dayjs';
  import deepClone from '@/lib/deepClone';
  import Charts from '@/components/Charts.vue';
  import _ from 'lodash';
  import day from 'dayjs';

  @Component({
    components: {Charts, Tabs, Layout}
  })
  export default class Statistics extends Vue {
    tagString(tags: Tag[]) {
      return tags.length === 0 ? '无' : tags.map(t => t.name).join(',');
    }

    mounted() {
      const div = (this.$refs.chartWrapper as HTMLDivElement);
      div.scrollLeft = div.scrollWidth;
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

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    get x() {
      const today = new Date();
      const array = [];
      for (let i = 0; i <= 29; i++) {
        const date=day(today)
					.subtract(i,'day').format('YYYY-M-D')
        array.push({date: date, value: _.find(this.recordList,
						{createdAt:date})?.amount
        })
      }
      console.log(this.recordList.map(r => _.pick(r, ['createdAt', 'amount'])));
      return {
        grid: {
          left: 0,
          right: 0,
        },
        xAxis: {
          axisTick: {alignWithLabel: true, show: false},
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7',
            '8', '9', '10', '11', '12', '13', '14',
            '15', '16', '17', '18', '19', '20', '21',
            '22', '23', '24', '25', '26', '27', '28',
            '29', '30',]
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        series: [{
          symbol: 'circle',
          symbolSize: 15,
          color: '#666',
          data: [150, 230, 224, 218, 135, 147, 260,
            150, 230, 224, 218, 135, 147, 260,
            150, 230, 224, 218, 135, 147, 260,
            150, 230, 224, 218, 135, 147, 260,
            150, 230,],
          type: 'line'
        }],
        tooltip: {
          show: true,
          triggerOn: 'click',
          position: 'top',
          formatter: '{c}'
        }
      };
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

	.noBill {
		padding: 16px;
	}

	.chart {
		width: 430%;

		&-wrapper {
			overflow: auto;

			&::-webkit-scrollbar {
				display: none;
			}
		}
	}
</style>