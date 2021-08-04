import deepClone from '@/lib/deepClone';

const localStorageKeyName = 'recordListModel';
const recordListModel = {
  data: [] as RecordItem[],
  fetch() {
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    },
  save(): void {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
  create(record: RecordItem) {
    const deepCloneRecord: RecordItem = deepClone(record);
    deepCloneRecord.createdAt = new Date();
    this.data.push(deepCloneRecord);
    this.save()
  },
};
export {recordListModel};