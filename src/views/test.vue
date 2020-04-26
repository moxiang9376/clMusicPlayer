<template>
  <div class="test">
    <div>测试页面</div>
    <img :src="imgUrl"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
@Component({})
export default class test extends Vue {
  private imgUrl: string = "";
  created() {
    let that: any = this;
  
    axios({
      method: "get",
      url: "http://118.24.179.175:3200/getMusicVKey?songmid=003QLRda0tLCuz"
    }).then(res => {
      console.log(res)
    });
  }
  mounted() {}
}
</script>
<style lang="scss" scoped>
</style>
