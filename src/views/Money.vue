<template>
	<Layout class-prefix="xxx" :style="{height:h+'px'}">
		<Tabs :data-source="recordTypeList" :value.sync="record.type"/>
		<Tags @update:value="record.tags=$event"/>
		<div class="notes-wrapper">
			<FormItem :value.sync="record.notes" field-name="备注" place-holder="在这里输入备注"
			/>
		</div>
		<div class="createdAt">
			<FormItem :value.sync="record.createdAt" field-name="日期" type="date"/>
		</div>
		<NumberPod :value.sync="record.amount" @submit="saveRecord"/>
	</Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Layout from '@/components/Layout.vue';
  import Tags from '@/components/Money/Tags.vue';
  import NumberPod from '@/components/Money/NumberPad.vue';
  import {Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import Tabs from '@/components/Tabs.vue';


  @Component({
    components: {Tabs, FormItem, NumberPod, Tags, Layout},
  })
  export default class Money extends Vue {
    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: 0, createdAt: new Date().toISOString()
    };

    h = document.body.clientHeight;

    get recordList() {
      return this.$store.state.recordList;
    }

    recordTypeList = recordTypeList;

    created() {
      this.$store.commit('fetchRecords');
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    saveRecord(): void {
      if (!this.record.tags || this.record.tags.length === 0) {
        return window.alert('请至少选择一个标签');
      }
      this.$store.commit('createRecord', this.record);
      if (this.$store.state.createRecordError === null) {
        this.record.notes = '';
      }
    }
  }
</script>

<style lang="scss">
	.bottomnav-wrapper {
		display: flex;
		height: 100vh;
	}

	.notes-wrapper {
		background: #f5f5f5;
		margin-bottom: -15px;
	}

</style>