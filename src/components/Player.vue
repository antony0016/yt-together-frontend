<template>
  <el-row :gutter="24">
    <el-col :span="16">
      <el-row>
        <el-col :span="24" id="video-placeholder">
          <!--      <div ></div>-->
        </el-col>
        <el-col :span="24">
          <el-input v-model="url"/>
        </el-col>
        <el-col :span="24">
          <el-button @click="changeVideo(url)">換歌</el-button>
          <el-button @click="playMusic">播放</el-button>
          <el-button @click="pauseMusic">暫停</el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="8">
      <el-scrollbar height="500px">
        <el-card v-for="(song, index) in allSong" shadow="hover" :key="index"
                 class="split-item" @click="changeVideo(song.resourceId.videoId)">
          <el-row>
            <el-col :span="8">
              <img :src="song.thumbnails.default.url">
            </el-col>
            <el-col :span="16">
              {{ song.title }}
            </el-col>
          </el-row>

        </el-card>
      </el-scrollbar>
    </el-col>
  </el-row>

</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from "vue";
import usePlayerController from "../store/PlayerController";

const url = ref('https://www.youtube.com/watch?v=aYDkG2JWKc4');
const isInit = ref(false);
const isSync = ref(false);

const playerController = usePlayerController();
const { isPlay, nowTime, songId, roomId, allSong, player } = toRefs(playerController)
const { getRoom, updateRoom } = playerController

onMounted(() => {
  let tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  onYouTubeIframeAPIReady()
  isInit.value = true;
})

const onYouTubeIframeAPIReady = () => {
  player.value = new YT.Player('video-placeholder', {
    width: 800,
    height: 450,
    videoId: '_SepCPasX3w',
    playerVars: {
      color: 'white',
    },
  });
  console.log(player.value)
  setInterval(() => {
    if (roomId.value === '') {
      return
    }
    getRoom()
    if (isPlay.value) {
      // changVideo when video id is not same as current video id
      if (songId.value !== player.value.getVideoUrl().split('v=')[1]) {
        changeVideo(songId.value, nowTime.value)
      }
      // sync video time
      if (isSync.value) {
        // console.log(player.value.getCurrentTime(), nowTime.value)
        let x = player.value.getCurrentTime() - nowTime.value
        if (x < 0) {
          x *= -1
        }
        if (x > 0.01) {
          player.value.seekTo(nowTime.value, true)
        }
        isSync.value = false
      }
      player.value.playVideo();
    } else {
      isSync.value = true
      player.value.pauseVideo();
    }
  }, 500)
}

const playMusic = () => {
  if (!isInit.value) {
    return
  }
  if (roomId.value === '') {
    player.value.playVideo();
  }
  updateRoom({
    is_play: true, now_time: player.value.getCurrentTime()
  })
}
const pauseMusic = () => {
  if (!isInit) {
    return
  }
  if (roomId.value === '') {
    player.value.pauseVideo();
  }
  updateRoom({
    is_play: false, now_time: player.value.getCurrentTime()
  })
}

const changeVideo = (url: string, second?: number) => {
  if (!isInit.value) {
    return
  }
  let tempSecond = second ? second : 0;
  let processedUrl = url.split('&')[0]
  if (processedUrl.includes('v=')) {
    processedUrl = processedUrl.split('v=')[1]
  }
  player.value.cueVideoById({ videoId: processedUrl, startSeconds: tempSecond })
  songId.value = processedUrl
  updateRoom({
    song_id: songId.value, now_time: tempSecond
  })
}
</script>

<style scoped>
.split-item > * {
  margin-bottom: 20px;
}
</style>
