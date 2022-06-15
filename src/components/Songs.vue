<template>
  <el-card>
    <el-tabs v-model="isActive">
      <el-tab-pane name="a" label="瀏覽">
        <el-row :gutter="24">
          <el-col>
            <el-input v-model="searchStr" placeholder="查詢清單"/>
          </el-col>
          <el-col v-for="(video, index) in filteredList" :span="6" class="list-item">
            <el-card shadow="hover" @click="getSongs({list_id:video.list_id})">
              <el-row justify="space-between">
                <el-col :span="10">
                  {{ video.list_name }}
                </el-col>
                <el-col :span="4">
                  <el-button @click="deList(video)">刪除
                  </el-button>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane name="b" label="新增">
        <el-row>
          <el-col :span="4">
            <el-input placeholder="YT list id" v-model="listId"></el-input>
          </el-col>
          <el-col :span="4">
            <el-input placeholder="List Name" v-model="listName"></el-input>
          </el-col>
          <el-col :span="4">
            <el-input placeholder="密碼" v-model="editPassword"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button @click="newList(
              {list_id:listId,
              edit_password:editPassword,
              list_name:listName})">
              建立
            </el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, toRefs } from "vue";
import usePlayerController from "../store/PlayerController";

const playerController = usePlayerController();
const isActive = ref('a'), listId = ref('')
  , editPassword = ref(''), listName = ref('')
const choseListId = ref(''), deletePassword = ref('')
const { allList, getList, newList, getSongs, nowList, deleteList } = toRefs(playerController)

const searchStr = ref('');

const filteredList = computed(() => {
  if (searchStr.value === '') {
    return allList.value;
  }
  const cList = allList.value.filter(l => searchStr.value.includes(searchStr.value))
  return cList;
})

type YTList = {
  id: number,
  list_id: string,
  list_name: string,
  edit_password: string
};

const deList = (video: YTList) => {
  let tempPassword = window.prompt('請輸入編輯密碼').toString();
  let editPassword = tempPassword ? tempPassword : '';
  deleteList.value(
    {
      id: video.id,
      list_id: video.list_id,
      edit_password: editPassword,
      list_name: video.list_name,
    }
  )
}

onMounted(() => {
  getList.value()
})
</script>

<style scoped>
.list-item {
  height: 5rem;
}
</style>
