<template>
  <el-container style="height: 100vh;">
    <el-header id="header">
      <el-row align="middle" style="height: 100%">
        <el-col :span="6">
          <div id="title" @click="router.push('/')">YT Together</div>
        </el-col>
        <el-col :span="2">
          <!--          <el-button type="danger" @click="router.push('/songs')">歌單</el-button>-->
        </el-col>
        <el-col :span="2">
          <!--          <el-button type="danger" @click="router.push('/player')">一起聽</el-button>-->
        </el-col>
        <el-col :span="13">
          <el-row justify="end">
            <el-col :span="2">
              <!--              <el-button type="danger">{{ user ? user : '匿名使用者' }}</el-button>-->
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-main id="main">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import router from "./router";
import usePlayerController from "./store/PlayerController";
import { computed, toRefs } from "vue";

const playerController = usePlayerController();

const { user } = toRefs(playerController)


const together = function () {

}
</script>

<style>
#title {
  font-size: 2rem;
  color: white;
}

#header {
  background-color: var(--el-color-danger);
}

#main {
  background-color: var(--el-color-info-light-9);
}

body {
  margin: 0;
  padding: 0;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>
