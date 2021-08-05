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

}
