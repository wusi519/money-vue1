import Vue from 'vue';
import Vuex from 'vuex';
import deepClone from '@/lib/deepClone';
import createId from '@/lib/createId';
import router from '@/router';

Vue.use(Vuex);

const localStorageRecordKeyName = 'recordList';
const localStorageTagKeyName = 'tagList';
const store = new Vuex.Store({
  state: {
    recordList: [],
    createRecordError: null,
    createTagError: null,
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
    createRecord(state, record: RecordItem) {
      const deepCloneRecord: RecordItem = deepClone(record);
      deepCloneRecord.createdAt = deepCloneRecord.createdAt || new Date().toISOString();
      state.recordList.push(deepCloneRecord);
      store.commit('saveRecords');
      window.alert('已保存');
    },
    saveRecords(state) {
      window.localStorage.setItem(localStorageRecordKeyName,
        JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem(localStorageTagKeyName) || '[]');
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', '衣服');
        store.commit('createTag', '食物');
        store.commit('createTag', '住宿');
        store.commit('createTag', '交通');
      }
    },
    createTag(state, name: string) {
      state.createTagError = null;
      const id = createId().toString();
      const names = state.tagList.map(item => item.name);
      if (name && names.indexOf(name) >= 0) {
        state.createTagError = new Error('tag name duplicated');
        return;
      } else if (name === '' || name === null) {
        state.createTagError = new Error('tag name is null');
        return;
      } else {
        state.tagList.push({id, name: name});
        store.commit('saveTags');
      }

    },
    saveTags(state) {
      window.localStorage.setItem(localStorageTagKeyName, JSON.stringify(state.tagList));
    },
    updateTag(state, payload: { id: string, name: string }) {
      const {id, name} = payload;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
      }
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        router.back();
      } else {
        window.alert('删除失败');
      }


      return true;
    },
  },
  actions: {},
  modules: {}
});

export default store;
