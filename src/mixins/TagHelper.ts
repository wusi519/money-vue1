import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export class TagHelper extends Vue {
  createNewTag() {
    const name = window.prompt('请输入标签名');
    if (!name) {return window.alert('标签名不能为空');} else {
      this.$store.commit('createTag', name);
    }
  }
}

export default TagHelper;