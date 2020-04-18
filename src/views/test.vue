<template>
  <div class="test">
    <div>测试页面</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
@Component({})
export default class test extends Vue {
  created() {
    axios.get("http://118.24.179.175:666/test").then(res => {
      console.log(res.data);
    });
  }
  mounted() {}
}
</script>
<style lang="scss" scoped>
</style>
