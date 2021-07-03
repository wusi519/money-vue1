const localStorageKeyName = 'tagList';
type Tag={
  id:string;
  name:string;
}
type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  save: () => void
  create: (name: string | null) => 'success' | 'duplicated' | 'null'
}
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    return  JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]')
  },
  save(){
    window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.data))

  },
  create(name){
    const names=this.data.map(item=>item.name)
    if(name&&names.indexOf(name)>=0){
      return 'duplicated'
    }else if(name===''||name===null){
      return 'null'
    }else{
      this.data.push({id:name,name:name})
      this.save()
      return 'success'
    }
  }
};
export default tagListModel