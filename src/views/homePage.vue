<template>
  <div class="homePage">
    <div
      class="nav_box"
      :class="[box_check?'hide':'show']"
    >
      <div
        class="nav_search"
        @click="search()"
      >search</div>
      <div>
        <input v-model="keyWord" />
        <select v-model="musicStyle">
          <option
            v-for="item in musicPlatform"
            :value="item.style"
          >{{item.name}}</option>
        </select>
      </div>
      <div class="nav_title">
        云听
      </div>
    </div>
    <div
      class="search_box"
      :class="[box_check?'show':'hide']"
    >
      <div
        class="title"
        @click="goWheel"
      >
        云 听
      </div>
      <div class="input_box">
        <input v-model="keyWord" />
        <!-- <select v-model="musicStyle">
          <option
            class="option_style"
            v-for="item in musicPlatform"
            :value="item.style"
          >{{item.name}}</option>
        </select> -->
      </div>
      <div
        @click="search()"
        class="search_btn"
      >search</div>
    </div>
    <div
      class="music_line_title"
      :class="[box_check?'hide':'show']"
    >
      <!-- <span>封面</span> -->
      <span>歌曲</span>
      <span>演唱</span>
    </div>
    <div
      class="music_list_box"
      :class="[box_check?'hide':'show']"
    >

      <div
        ref="music_list_show"
        class="music_list_show"
        @scroll="onScroll()"
      >
        <div
          class="music_list_line"
          v-for="item in musicList"
          @click="playSong(item)"
        >
          <!-- <span><img :src="item.pic" /></span> -->
          <span>{{item.name}}</span>
          <span>{{item.singer}}</span>
        </div>
      </div>
    </div>
    <musicPlayer v-bind:musicInfo="musicInfo"></musicPlayer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import musicPlayer from "../components/musicPlayer.vue";
@Component({
  components: {
    musicPlayer
  }
})
export default class homePage extends Vue {
  private keyWord: string = ""; // 关键词
  private musicStyle: number = 4; // 音乐平台编号（默认为自己部署的接口）
  private musicPlatform: any = [
    // 音乐平台
    { style: 0, name: "网易" }
    // { style: 1, name: '企鹅' },
    // { style: 2, name: '酷我' }
  ];
  private musicList: [] = []; //搜索结果
  private box_check: boolean = true; //动画效果控制
  private musicListPage: number = 1; //音乐列表页码
  private musicInfo: [] = []; //音乐数据
  created() {}
  mounted() {
    let that: any = this;
    // that.commom.getMusic2("海阔天空").then(res=>{
    //   console.log(res)
    // })
  }
  //上拉加载
  onScroll() {
    let that: any = this;
    let box: any = this.$refs.music_list_show;
    let boxHeight: any = box.clientHeight;
    let offsetHeight: any = box.scrollTop;
    let scrollHeight: any = box.scrollHeight;

    /* 如果上拉高度+DOM元素高度 = 列表总高度，拉到低部了*/
    if (boxHeight + offsetHeight == scrollHeight) {
      that.musicListPage++;
      console.log(that.musicListPage)
      that.common
        .getMusic(that.musicStyle, that.keyWord, that.musicListPage)
        .then(res => {
          that.musicList = that.musicList.concat(res);
        });
    }
  }

  //点击播放
  playSong(item: any) {
    let that: any = this;
    if (that.musicStyle == 4) {
      let url: string = "http://118.24.179.175:8888/song/url?id=" + item.id;
      that.common.getSongUrl(url).then(res => {
        console.log(res);
        item.url = res;
        that.musicInfo = item;
      });
    } else {
      that.musicInfo = item;
    }
  }

  //搜索
  search() {
    let that: any = this;
    if (that.keyWord == "") {
      alert("不找点什么听听？");
      return;
    }
    that.common
      .getMusic(that.musicStyle, that.keyWord, that.musicListPage)
      .then(res => {
        console.log(res);
        that.musicList = res;
        that.box_check = false;
      });
  }

  //路由跳转测试
  goWheel() {
    this.$router.push({
      path: "wheels",
      name: "wheels",
      params: {
        id: "helloworld"
      }
    });
  }
}
</script>
<style lang="scss" scoped>
* {
  color: #333333;
}

.homePage {
  display: block;
  width: 100%;
  height: 100vh;
  background-color: #faaca8;
  background-image: linear-gradient(19deg, #faaca8 0%, #ddd6f3 100%);
}

.nav_box {
  height: 60px;
  padding-top: 20px;
  visibility: hidden;
  div {
    display: inline-block;
  }
  input {
    margin: 0 5px;
    padding: 0 5px;
    height: 30px;
    line-height: 30px;
    width: 150px;
    border-radius: 5px;
    vertical-align: middle;
  }
  select {
    margin: 0 5px;
    padding: 0 5px;
    height: 30px;
    line-height: 30px;
    width: 50pxpx;
    font-size: 28px;
    text-align: center;
    text-align-last: center;
    appearance: none;
    outline: none;
    background: none;
    box-shadow: none;
    border-radius: 10px;
    border: none;
    vertical-align: middle;
  }
}

.nav_search {
  &:active {
    background: rgba(175, 238, 238, 0.5);
  }
  cursor: pointer;
  margin: 0 5px;
  padding: 0 5px;
  height: 30px;
  line-height: 30px;
  background: white;
  border-radius: 5px;
  vertical-align: middle;
}
.nav_title {
  font-size: 28px;
  float: right;
  margin: 0 5px;
  padding: 0 5px;
  height: 30px;
  line-height: 30px;
}

.search_box {
  position: fixed;
  top: 30%;
  width: 100%;
  text-align: center;
}

.title {
  font-size: 46px;
}

.input_box {
  margin-top: 10px;
  border-radius: 10px;
  input {
    padding: 0 5px;
    display: block;
    margin: 0 auto;
    height: 60px;
    width: 300px;
    border-radius: 10px;
    text-align: center;
  }
  select {
    height: 60px;
    line-height: 60px;
    width: 150px;
    font-size: 36px;
    margin-top: 10px;
    text-align: center;
    text-align-last: center;
    appearance: none;
    outline: none;
    background: none;
    box-shadow: none;
    border-radius: 10px;
  }
}

.option_style {
  text-align-last: center;
  text-align: center;
  font-size: 28px;
}

.search_btn {
  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  cursor: pointer;
  display: inline-block;
  margin-top: 10px;
  padding: 10px;
  width: 150px;
  font-size: 32px;
  border: 1px solid rgb(169, 169, 169);
  border-radius: 10px;
}

.music_list_box {
  width: 100%;
  height: 85%;
  font-size: 28px;
  span {
    display: inline-block;
    text-align: center;
    width: 33%;
  }
}

.music_line_title {
  width: 100%;
  font-size: 28px;
  span {
    display: inline-block;
    text-align: center;
    width: 50%;
  }
}

.music_list_show {
  width: 100%;
  height: 100%;
  overflow: scroll;
}

.music_list_title {
  position: fixed;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #8ec5fc;
  background-image: linear-gradient(59deg, #8abcee 0%, #e0c3fc 100%);
}

.music_list_line {
  margin-top: 10px;
  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  cursor: pointer;
  img {
    width: 50px;
    height: 50px;
  }
  span {
    overflow: hidden;
    word-break: keep-all;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: center;
    width:50%;
  }
}

.show {
  animation: show 2s linear;
  animation-fill-mode: forwards;
}

.hide {
  animation: hide 0.5s linear;
  animation-fill-mode: forwards;
}

@keyframes hide {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0.8;
  }

  50% {
    opacity: 0.6;
  }

  75% {
    opacity: 0.4;
  }

  100% {
    opacity: 0;
    visibility: hidden;
  }
}

@keyframes show {
  0% {
    opacity: 0.2;
    visibility: visible;
  }
  25% {
    opacity: 0.4;
    visibility: visible;
  }

  50% {
    opacity: 0.6;
    visibility: visible;
  }

  75% {
    opacity: 0.8;
    visibility: visible;
  }

  100% {
    opacity: 1;
    visibility: visible;
  }
}
</style>
