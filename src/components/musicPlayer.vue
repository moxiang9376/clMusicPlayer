<template>
  <div class="musicPlayer">
    <audio
    class="music_box"
      controls="controls"
      autoplay="autoplay"
      :src="musicInfo.url"
    ></audio>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class musicPlayer extends Vue {
  @Prop() private musicInfo!: any;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.musicPlayer {
    width:100%;
    text-align: center;
}

.music_box{
    margin:0 auto;
}
</style>
