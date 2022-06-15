<template>
  <el-row>
    <el-col :span="4">
      <el-input placeholder="聊天室id" v-model="tempRoomId"></el-input>
    </el-col>
    {{ roomId }}
    <el-col :span="10">
      <el-button @click="createRoom">建立</el-button>
      <el-button @click="joinRoom">加入</el-button>
      <el-button @click="leaveRoom">離開</el-button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import usePlayerController from "../store/PlayerController";
import { ref, toRefs } from "vue";

const playerController = usePlayerController();

const { roomId, newRoom, firstConnect } = toRefs(playerController)

const tempRoomId = ref('1234')

const createRoom = () => {
  roomId.value = tempRoomId.value
  newRoom.value()
}

const joinRoom = () => {
  firstConnect.value = true
  roomId.value = tempRoomId.value
}

const leaveRoom = () => {
  roomId.value = ''
}

</script>

<style scoped>

</style>
