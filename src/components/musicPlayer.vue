<template>
  <div class="musicPlayer">
    <audio
      v-show="false"
      controls="controls"
      autoplay="autoplay"
      @canplay="playSong"
      :src="musicInfo.url"
      ref="audio"
    ></audio>

    <div
      class="play_btn"
      @click="playPause()"
    >{{play}}</div>
    <div
      @click="changeProgress"
      class="progress_box"
      ref="progress_box"
    >
      <div class="progress_line">
        <div
          :style="{width:progress_width}"
          class="progress_change_line"
        ></div>
      </div>
      <div>{{playTime}}/{{songTime}}</div>
    </div>
    <div class="music_info">
      <div>{{musicInfo.name}}</div>
      <div>{{musicInfo.singer}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

@Component
export default class musicPlayer extends Vue {
  @Prop() private musicInfo!: any;
  private timer: any = null;
  private timer2: any = null;
  private progress_width: any = 0;
  private songTime: any = "00:00";
  private playTime: any = "00:00";
  private play: any = "播放";
  private progress_max_width = null;
  // @Watch("musicInfo")
  // change(newVal, oldVal) {
  //   console.log(newVal);
  // }
  mounted() {
    //获取音乐进度条总长度
    let that: any = this;
    that.progress_max_width = that.$refs.progress_box.offsetWidth;
  }
  playSong() {
    let that: any = this;
    that.play = "播放"
    //切换音乐，配置重置
    that.songTime = changeTimeMin(that.$refs.audio.duration);
    function changeTimeMin(time) {
      let m: any = parseInt(time / 60);
      let s: any = Math.ceil(time % 60);
      if (m < 10) {
        m = "0" + m;
      }
      if (s < 9) {
        s = "0" + s;
      }
      return m + ":" + s;
    }
    //清除计时器
    clearInterval(that.timer);
    that.timer = null;
    //重新设定计时器
    that.timer = setInterval(() => {
      //计算进度条
      let progress: any = Math.ceil(
        (that.$refs.audio.currentTime / that.$refs.audio.duration) * 100
      );
      that.playTime = changeSongTime(that.$refs.audio.currentTime);
      function changeSongTime(time) {
        let newTime: any = "00:00";
        if (time < 60) {
          if (time < 9) {
            newTime = "00:0" + Math.ceil(time);
          } else {
            newTime = "00:" + Math.ceil(time);
          }
        } else {
          let m: any = parseInt(time / 60);
          let s: any = Math.ceil(time % 60);
          if (m < 10) {
            m = "0" + m;
          }
          if (s < 10) {
            s = "0" + s;
          }
          newTime = m + ":" + s;
        }
        return newTime;
      }
      if (progress <= 100) {
        that.progress_width = progress + "%";
      }
    }, 1000);
  }
  //@touchstart="progressLineTouchStart"
  // @touchmove="progressLineTouchMove"
  // @touchend="progressLineTouchEnd"
  // @click= "changeProgress"

  //播放暂停
  playPause() {
    let that: any = this;
    if (that.$refs.audio.paused) {
      that.$refs.audio.play();
      that.play = "播放";
    } else {
      that.$refs.audio.pause();
      that.play = "暂停";
    }
  }

  progressLineTouchStart(e) {}

  progressLineTouchMove(e) {
    // console.log(e)
  }

  progressLineTouchEnd(e) {}

  //点击改变音乐进度条
  changeProgress(e) {
    let that: any = this;
    let playTime: any =
      (that.$refs.audio.duration / 100) *
      Math.ceil((e.offsetX / that.progress_max_width) * 100);
    console.log(playTime);
    that.$refs.audio.currentTime = Math.ceil(playTime);
    that.progress_width =
      Math.ceil((e.offsetX / that.progress_max_width) * 100) + "%";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.musicPlayer {
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.music_box {
  margin: 0 auto;
}

.music_play_box {
}

.play_btn {
  width: 100px;
}

.progress_box {
  width: 500px;
}

.progress_line {
  width: 100%;
  height: 5px;
  background: black;
  border-radius: 10em;
  vertical-align: middle;
}

.progress_change_line {
  height: 5px;
  border-radius: 10em;
  background: white;
}

.progress_bot {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background: white;
  transform: translateY(-8px);
}

.music_info {
  width: 150px;
  text-align: center;
}
</style>
