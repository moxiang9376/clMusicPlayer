<template>
  <div class="giftWheel">
    <label class="wantTitle">输入选项</label>
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
    >开始旋转</div>
    <div>
      目前选项
      <div
        class="wh_choose_box"
        v-for="(item,index) in wantArr"
      >
        <div>{{index+1}}、</div>
        <div>{{item.giftText}}</div>
        <div @click="delChoose(index)">删除</div>
      </div>
    </div>
    <img
      v-if="wheelImg"
      :src="wheelImg"
      :style="{transform:rotatePointer,transition:transitionPointer}"
      class="wh_wheel_img"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import giftwheel from ".././assets/js/giftWheel.js";
@Component({})
export default class wheels extends Vue {
  private created() {}
  private mounted() {}

  wheelImg: string = "";
  wantThing: string = "";
  wantArr: [] = [];
  wantArrCheck: boolean = true; //检查wantArr是否有修改
  timer: any = null;

  rotatePointer: string = "";
  transitionPointer: string = "";
  addWant() {
    let that: any = this;
    if (that.wantArr.length > 5) {
      alert("有那么多能选的，还要转盘干什么？");
      return;
    }

    if (that.wantThing == "") {
      alert("什么都不想选，还要转盘干什么？");
      return;
    } else {
      that.wantArr.push({
        giftText: that.wantThing,
        id: "none"
      });
      that.wantArrCheck = true;
    }
    that.wantThing = "";
  }
  //删除选项
  delChoose(index) {
    let that: any = this;
    that.wantArr.splice(index, 1);
    that.wantArrCheck = true;
  }

  setWheel() {
    let that: any = this;
    if (that.wantArr.length == 1) {
      alert("只有一个可以选，还要转盘干什么？");
      return;
    }
    clearTimeout(that.timer);
    that.timer = null;
    if (that.wantArrCheck == false) {
      that.timer = setTimeout(() => {
        let maxChoose: any = that.wantArr.length;
        that.rotatePointer = "rotate(" + rotateWheel(maxChoose) + "deg)"; //旋转角度
        that.transitionPointer = "transform " + maxChoose + "s ease-in-out";
      }, 1000);
    } else {
      giftwheel.drawWheel(that.wantArr).then(res => {
        that.wheelImg = res;
        that.wantArrCheck = false;
        that.timer = setTimeout(() => {
          let maxChoose: any = that.wantArr.length;
          that.rotatePointer = "rotate(" + rotateWheel(maxChoose) + "deg)"; //旋转角度
          that.transitionPointer = "transform " + maxChoose + "s ease-in-out";
        }, 1000);
      });
    }

    function rotateWheel(maxChoose) {
      //根据所有选项随机选中
      let chooseOne: any = Math.floor(Math.random() * maxChoose);
      let chance: any = (1 / maxChoose) * 360;
      let roundDeg: any = 360 - (chooseOne - 1) * chance + 360 * maxChoose; //旋转到第几个扇形区域的正中间
      return roundDeg;
    }
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

.wh_choose_box {
  div {
    display: inline-block;
  }
}
</style>
