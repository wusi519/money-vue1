<template>
	<Layout class="statistics-wrapper">
		<Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
		<div class="chart-wrapper" ref="chartWrapper">
			<Chart class="chart" :options="chartOptions"/>
		</div>
		<ol v-if="groupedList.length>0" class="statistics-list">
			<li v-for="(group, index) in groupedList" :key="index">
				<h3 class="statistics-title">{{beautify(group.title)}} <span>￥{{group.total}}</span></h3>
				<ol>
					<li v-for="item in group.items" :key="item.id"
							class="record"
					>
						<span class="statistics-tags">{{tagString(item.tags)}}</span>
						<span class="notes">{{item.notes}}</span>
						<span>￥{{item.amount}} </span>
					</li>
				</ol>
			</li>
		</ol>
		<div v-else class="noResult">
			目前没有相关记录
		</div>
	</Layout>
</template>
<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/deepClone';
  import Chart from '@/components/Charts.vue';
  import _ from 'lodash';
  import day from 'dayjs';
  import Layout from '@/components/Layout.vue';
  import NP from 'number-precision';

  @Component({
    components: {Tabs, Chart, Layout}
  })
  export default class Statistics extends Vue {

    tagString(tags: Tag[]) {
      return tags.length === 0 ? '无' :
        tags.map(t => t.name).join('，');
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

    get keyValueList() {
      const today = new Date();
      const array = [];
      for (let i = 0; i <= 29; i++) {
        const dateString = day(today)
          .subtract(i, 'day').format('YYYY-MM-DD');
        const found = _.find(this.groupedList, {
          title: dateString
        });
        array.push({
          key: dateString, value: found ? found.total : 0
        });
      }
      array.sort((a, b) => {
        if (a.key > b.key) {
          return 1;
        } else if (a.key === b.key) {
          return 0;
        } else {
          return -1;
        }
      });
      return array;
    }

    get chartOptions() {
      const keys = this.keyValueList.map(item => item.key);
      const values = this.keyValueList.map(item => item.value);
      return {
        grid: {
          top: '30%',
          bottom: '50%',
          left: 0,
          right: 0,
        },
        xAxis: {
          type: 'category',
          data: keys,
          axisTick: {alignWithLabel: true, show: false},
          axisLine: {lineStyle: {color: '#666'}},
          axisLabel: {
            formatter: function (value: string) {
              return value.substr(5);
            }
          },

        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [{
          symbol: 'circle',
          symbolSize: 12,
          itemStyle: {borderWidth: 1, color: '#666', borderColor: '#666'},
          data: values,
          type: 'line'
        }],
        tooltip: {
          show: true, triggerOn: 'click',

          position: 'top',
          formatter: '{c}'
        }
      };
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get groupedList() {
      const {recordList} = this;
      const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      if (newList.length === 0) {return [];}
      type Result = { title: string, total?: number, items: RecordItem[] }[]
      const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
        }
      }
      result.map(group => {
        group.total = group.items.reduce((sum, item) => {
          const x = NP.plus(sum, item.amount);
          return x;
        }, 0);
      });
      return result;
    }

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    type = '-';
    recordTypeList = recordTypeList;
  }
</script>

<style scoped lang="scss">
	.statistics-wrapper {
		display: flex;
		flex-direction: column;
	}

	.statistics-list {
		height: 40vh;
	}

	.echarts {
		max-width: 100%;
		height: 400px;
		flex-grow: 1;
	}

	.noResult {
		padding: 16px;
		text-align: center;
	}

	::v-deep {
		.type-tabs-item {
			background: white;

			&.selected {
				background: #f8d02d;

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
		align-content: center;
		background: #fbe8ab;
	}

	.statistics-title {
		@extend %item;
	}

	.record {
		background: white;
		@extend %item;

		> .statistics-tags {
			border:1px solid red;
			white-space: nowrap;
		}
	}

	.notes {
		margin-right: auto;
		margin-left: 10px;
		color: #999;
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
