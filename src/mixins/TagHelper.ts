import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export class TagHelper extends Vue {
  createNewTag() {
    const name = window.prompt('请输入标签名');
    if (!name) {return window.alert('标签名不能为空');} else {
      this.$store.commit('createTag', name);
      if(this.$store.state.createTagError){
        if(this.$store.state.createTagError.message==='tag name duplicated'){
          window.alert('标签名重复')
        }
      }
    }
  }
}

export default TagHelper;