import Vue from 'vue';
import Component from 'vue-class-component';

const map: { [key: string]: string } = {
  'tag name duplicated': '标签名重复了'
};

@Component
export class TagHelper extends Vue {
  createNewTag() {
    const name = window.prompt('请输入标签名');
    this.$store.commit('createTag', name);
    if (this.$store.state.createTagError) {
      window.alert(map[this.$store.state.createTagError.message] || '未知错误');
    }
  }
}

export default TagHelper;