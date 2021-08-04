type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date
}
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  save: () => void;
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
  create: (name: string | null) => 'success' | 'duplicated' | 'null'
  remove: (id: string) => boolean;
}


interface Window {
  tagList: Tag[];
  createTag: (name: string) => void;
  removeTag: (id: string) => boolean;
  updateTag: TagListModel['update']
  findTag: (id: string) => Tag | undefined
  recordList: RecordItem[]
  createRecord:(record:RecordItem)=>void
}
