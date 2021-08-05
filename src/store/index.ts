import Vue from 'vue';
import Vuex from 'vuex';
import deepClone from '@/lib/deepClone';

Vue.use(Vuex);
const localStorageKeyName = 'recordList';
const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
  },
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    },
    createRecord(state, record) {
      const deepCloneRecord: RecordItem = deepClone(record);
      deepCloneRecord.createdAt = new Date();
      state.recordList.push(deepCloneRecord);
      store.commit('saveRecords');
    },
    saveRecords(state) {
      window.localStorage.setItem(localStorageKeyName,
        JSON.stringify(state.recordList));
    },
  },
  actions: {},
  modules: {}
});

export default store;
