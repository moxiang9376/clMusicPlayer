<template>
  <div class="test">
    <div>测试页面</div>
    <input id="files1" type="file" @change="test" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
@Component({})
export default class test extends Vue {
  created() {
    let that: any = this;
  }
  mounted() {
    // axios({
    //   method:"get",
    //   url:"http://118.24.179.175:3200/getMusicVKey",
    //   params:{
    //     songid:"004cZvLj1qDq4A"
    //   }
    // }).then(res=>{
    //   console.log(res)
    // })
  }

  test(e) {
    const file: any = e.target.files[0];
    console.log(file);
    const reader: any = new FileReader();
    reader.readAsText(file, "utf-8");
    reader.onload = function() {
      console.log(this.result);
    };
  }
}
</script>
<style lang="scss" scoped>
</style>
