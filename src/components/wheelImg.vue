<template>
  <div class="wheel">
    <div>123</div>
    <img
      class="wh_wheel_img"
      :src="wheelImg"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
export default class wheelImg extends Vue {
  wheelImg: any = "";
  created() {
    console.log(123);
    this.wheelImg = this.getImg();
  }
  mounted() {
    console.log(123);
    this.wheelImg = this.getImg();
  }

  getImg() {
    let that: any = this;
    return that.$store.state.wheelImg;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wh_wheel_img {
  display: inline-block;
  width: 658px;
  height: 658px;
  border-radius: 50%;
  margin: 0 auto;
}
</style>