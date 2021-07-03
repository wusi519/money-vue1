const localStorageKeyName='recordList'
const model={
  deepClone(date:RecordItem[]|RecordItem){
    return JSON.parse(JSON.stringify(date))
  },
  fetch(){
    return JSON.parse(window.localStorage.getItem(localStorageKeyName)||'[]') as RecordItem[]
  },
  save(data:RecordItem[]): void {
    window.localStorage.setItem(localStorageKeyName,JSON.stringify(data))
  }
}
export default model