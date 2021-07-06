const localStorageKeyName = 'tagList';
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  save: () => void
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
  create: (name: string | null) => 'success' | 'duplicated' | 'null'
}
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));

  },
  create(name) {
    const names = this.data.map(item => item.name);
    if (name && names.indexOf(name) >= 0) {
      return 'duplicated';
    } else if (name === '' || name === null) {
      return 'null';
    } else {
      this.data.push({id: name, name: name});
      this.save();
      return 'success';
    }
  },
  update(id, name) {
    const idList = this.data.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.data.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = this.data.filter(item => item.id === id)[0];
        tag.name = name;
        this.save();
        return 'success';
      }
    } else {return 'not found';}
  }
}
export default tagListModel;