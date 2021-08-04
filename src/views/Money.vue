<template>
	<Layout class-prefix="xxx">
		<Types :value.sync="record.type"/>
		<Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
		<div class="notes-wrapper">
			<FormItem :value.sync="record.notes" field-name="备注" place-holder="在这里输入备注"
			/>
		</div>
		<NumberPod :value.sync="record.amount" @submit="saveRecord"/>
	</Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Layout from '@/components/Layout.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Types from '@/components/Money/Types.vue';
  import NumberPod from '@/components/Money/NumberPad.vue';
  import {Component, Watch} from 'vue-property-decorator';
  import {recordListModel} from '@/models/recordListModel';
  import tagListModel from '@/models/tagListModel';
  import FormItem from '@/components/Money/FormItem.vue';

  const recordList = recordListModel.fetch();
  const tagList = tagListModel.fetch();

  const version = window.localStorage.getItem('version' || '0');

  type Record = {
    tags: string[]
    notes: string
    type: string
    amount: number
    createAt?: Date
  }
  if (version === '0.0.1') {
    recordList.forEach(record => {record.createdAt = new Date(0);});
    window.localStorage.setItem('recordList', JSON.stringify(recordList));
  }
  window.localStorage.setItem('version', '0.0.1');

  @Component({
    components: {FormItem, NumberPod, Types, Tags, Notes, Layout},
  })
  export default class Money extends Vue {
    tags = tagList
    recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
    record: Record = {
      tags: [], notes: '', type: '-', amount: 0
    };

    onUpdateTags(value: string[]): void {
      this.record.tags = value;
    }
    saveRecord(): void {
      const deepCloneRecord = recordListModel.deepClone(this.record);
      deepCloneRecord.createdAt = new Date();
      this.recordList.push(deepCloneRecord);
    }

    @Watch('recordList')
    onRecordListChanged(): void {
      recordListModel.save(this.recordList);
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
		padding: 12px 0;
	}

</style>