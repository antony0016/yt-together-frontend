<template>
  <div class="split-item">
    <Songs></Songs>
    <el-card>
      <Share style="margin-bottom: 20px"/>
      <Player/>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import Songs from '../components/Songs.vue'
import Player from '../components/Player.vue'
import Share from '../components/Share.vue'
import { ref } from "vue";

const isActive = ref('player');
</script>

<style scoped>
.split-item > * {
  margin-bottom: 20px;
}
</style>
