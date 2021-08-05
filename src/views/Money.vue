<template>
	<Layout class-prefix="xxx">
		<Types :value.sync="record.type"/>
		<Tags/>
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
  import Tags from '@/components/Money/Tags.vue';
  import Types from '@/components/Money/Types.vue';
  import NumberPod from '@/components/Money/NumberPad.vue';
  import {Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import store from '@/store/index2';


  type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: Date
  }
  @Component({
    components: {FormItem, NumberPod, Types, Tags, Layout},
    computed: {
      recordList() {
        return store.recordList;
      }
    },
  })
  export default class Money extends Vue {
    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: 0
    };
    saveRecord(): void {
      store.createRecord(this.record);
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