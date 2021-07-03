const localStorageKeyName = 'recordListModel';
const recordListModel = {
  deepClone(date: RecordItem[] | RecordItem) {
    return JSON.parse(JSON.stringify(date));
  },
  fetch() {
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
  },
  save(data: RecordItem[]): void {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  }
};
export default recordListModel;