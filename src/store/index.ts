import Vue from 'vue';
import Vuex from 'vuex';
import deepClone from '@/lib/deepClone';
import createId from '@/lib/createId';

Vue.use(Vuex);
type RootState = {
  recordList: RecordItem[],
  tagList: Tag[],
  currentTag?: Tag
}
const localStorageRecordKeyName = 'recordList';
const localStorageTagKeyName = 'tagList';
const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined
  } as RootState,
  mutations: {
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem(localStorageRecordKeyName) || '[]') as RecordItem[];
    },
    createRecord(state, record) {
      const deepCloneRecord: RecordItem = deepClone(record);
      deepCloneRecord.createdAt = new Date();
      state.recordList.push(deepCloneRecord);
      store.commit('saveRecords');
    },
    saveRecords(state) {
      window.localStorage.setItem(localStorageRecordKeyName,
        JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem(localStorageTagKeyName) || '[]');
    },
    createTag(state, name: string) {
      const id = createId().toString();
      const names = state.tagList.map(item => item.name);
      if (name && names.indexOf(name) >= 0) {
        window.alert('标签名重复');
      } else if (name === '' || name === null) {
        window.alert('标签名不能为空');
      } else {
        state.tagList.push({id, name: name});
        store.commit('saveTags');
        window.alert('添加成功');
      }
    },
    saveTags(state) {
      window.localStorage.setItem(localStorageTagKeyName, JSON.stringify(state.tagList));
    },
  },
  actions: {},
  modules: {}
});

export default store;
