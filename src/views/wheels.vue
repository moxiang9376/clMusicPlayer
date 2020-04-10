<template>
  <div class="giftWheel">
    <label class="wantTitle">输入想选的东西</label>
    <input
      class="wheelInput"
      v-model="wantThing"
      maxlength="21"
    />
    <div
      class="makeSure_btn"
      @click="addWant()"
    >确定</div>
    <div
      class="setWheel"
      @click="setWheel"
    >生成转盘</div>
    <img
      class="wh_wheel_img"
      :src="wheelImg"
      v-if="wheelImg"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import giftwheel from ".././assets/js/giftWheel.js";
@Component({})
export default class wheels extends Vue {
  private created() {}
  private mounted() {
console.log(this.$route.params)
  }

  wheelImg: string = "";
  wantThing: string = "";
  wantArr: [] = [];
  
  addWant() {
    let that: any = this;
    if (that.wantArr.length > 5) {
      alert("有那么多能选的，还要转盘干什么？");
      return
    }

    if (that.wantThing == "") {
      alert("什么都不想选，还要转盘干什么？");
      return
    } else {
      that.wantArr.push({
        giftText: that.wantThing,
        id: "none"
      });
    }
    that.wantThing = "";
  }

  setWheel() {
   let that: any = this;
    if (that.wantArr.length == 1) {
      alert("只有一个可以选，还要转盘干什么？");
      return
    }
    let dataArr = that.wantArr;
    giftwheel.drawWheel(dataArr).then(res => {
      that.wheelImg = res;
    });
  }
}
</script>
<style lang="scss" scoped>
.giftWheel {
  padding-top: 20px;
  text-align: center;
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
  height: 100vh;
}
.wh_wheel_img {
  display: inline-block;
  width: 658px;
  height: 658px;
  border-radius: 50%;
  margin: 0 auto;
}

.wantTitle {
  display: block;
}

.wheelInput {
  margin: 10px auto;
  height: 80px;
  width: 260px;
  font-size: 48px;
  border-radius: 10px;
}

.makeSure_btn {
  margin: 10px auto;
  width: 100px;
  height: 50px;
  line-height: 50px;
  font-size: 36px;
  cursor: pointer;
  text-align: center;
  color: white;
  border-radius: 5px;
}

.setWheel {
  margin: 10px auto;
  width: 200px;
  height: 50px;
  line-height: 50px;
  font-size: 36px;
  cursor: pointer;
  text-align: center;
  color: white;
  border-radius: 5px;
}
</style>
