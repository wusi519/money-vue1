import deepClone from '@/lib/deepClone';

const localStorageKeyName = 'recordListModel';
const recordListModel = {
  data: [] as RecordItem[],
  deepClone(date: RecordItem[] | RecordItem) {
    return JSON.parse(JSON.stringify(date));
  },
  fetch() {
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
  },
  save(data: RecordItem[]): void {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  },
  create(record: RecordItem) {
    const deepCloneRecord: RecordItem = deepClone(record);
    deepCloneRecord.createdAt = new Date();
    this.data.push(deepCloneRecord);
  },
};
export default recordListModel;