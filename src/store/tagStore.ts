import createId from '@/lib/createId';

const localStorageTagKeyName = 'tagList';
const tagStore = {
  tagList: [] as Tag[],
  fetchTags() {
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageTagKeyName) || '[]');
    return this.tagList;
  },
  saveTags() {
    window.localStorage.setItem(localStorageTagKeyName, JSON.stringify(this.tagList));
  },
  createTag(name: string) {
    const id = createId().toString();
    const names = this.tagList.map(item => item.name);
    if (name && names.indexOf(name) >= 0) {
      window.alert('标签名重复');
      return 'duplicated';
    } else if (name === '' || name === null) {
      return 'null';
    } else {
      this.tagList.push({id, name: name});
      this.saveTags();
      return 'success';
    }
  },
  removeTag(id: string) {
    let index = -1;
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i;
        break;
      }
    }
    this.tagList.splice(index, 1);
    this.saveTags();
    return true;
  },
  updateTag(id: string, name: string) {
    const idList = this.tagList.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = this.tagList.filter(item => item.id === id)[0];
        tag.name = name;
        this.saveTags();
        return 'success';
      }
    } else {return 'not found';}
  },
  findTag(id: string) {
    return this.tagList.filter(t => t.id === id)[0];
  },
};
tagStore.fetchTags();
export default tagStore;