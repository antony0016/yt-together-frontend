import { defineStore } from "pinia";
import axios from "../axios";

type YTList = {
    id: number,
    list_id: string,
    list_name: string,
    edit_password: string
};
type MusicRoom = {
    id: number,
    song_id: string,
    room_id: string,
    now_time: number,
    is_play: boolean,
}


const usePlayerController = defineStore('playerController', {
    state: () => ({
        player: null,
        allSong: [],
        songId: "_SepCPasX3w",
        nowList: '',
        allList: [] as { list_name: string, list_id: string, edit_password: string }[],
        roomId: '',
        roomRealId: 0,
        nowTime: 0,
        isPlay: false,
        firstConnect: false,
    }),
    actions: {
        getRoom: function () {
            return axios.get('http://localhost:8000/api/music_room/').then(
                (response) => {
                    console.log(response.data)
                    let rooms = response.data.filter((room: MusicRoom) => {
                        return room.room_id == this.roomId
                    })
                    if (rooms.length) {
                        if (this.firstConnect) {
                            confirm('連接成功')
                        }
                        this.roomRealId = rooms[0].id
                        console.log(rooms[0])
                        if (rooms[0].song_id !== this.songId) {
                            this.songId = rooms[0].song_id
                        }
                        if (this.nowTime !== rooms[0].now_time) {
                            this.nowTime = rooms[0].now_time
                        }
                        if (this.isPlay !== rooms[0].is_play) {
                            this.isPlay = rooms[0].is_play
                        }
                    } else {
                        if (this.firstConnect) {
                            confirm('連接失敗')
                        }
                        this.roomId = ''
                    }
                    this.firstConnect = false
                }
            )
        },
        newRoom: function () {
            // console.log({ room_id: this.roomId, song_id: this.songId, now_time: 0, is_play: false })
            this.firstConnect = true
            axios.post('http://localhost:8000/api/music_room/',
                { room_id: this.roomId, song_id: this.songId, now_time: 0, is_play: false }).then(
                (response) => {
                    // this.roomRealId = response.data.id
                }
            )
        },
        updateRoom: function (payload: MusicRoom) {
            console.log(payload)
            if (this.roomId === '') {
                return
            }
            axios.patch('http://localhost:8000/api/music_room/' + this.roomRealId + '/',
                payload).then(
                (response) => {
                }
            )
        },
        getList: function () {
            axios.get('http://localhost:8000/api/yt_list/').then(
                (response) => {
                    this.allList = response.data;
                }
            )
        },
        newList: function (payload: YTList) {
            if (payload.list_name === '' || payload.list_id === '') {
                confirm('欄位請勿留白')
                return
            }
            axios.post('http://localhost:8000/api/yt_list/',
                payload).then(
                (response) => {
                    confirm('新增成功')
                    this.getList()
                }
            ).catch(() => {
                confirm('新增失敗, 請確定清單未重複')

            })
        },
        deleteList: function (payload: YTList) {
            axios.delete('http://localhost:8000/api/yt_list/' + payload.id.toString() + '/',
            ).then(
                (response) => {
                    confirm('刪除成功')
                    console.log(response)
                    this.getList()
                }
            ).catch(() => {
                confirm('刪除失敗')
            })
        },
        getSongs: function (payload: { list_id: string }) {
            this.nowList = payload.list_id
            axios.get('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=' + payload.list_id + '&access_token=' + import.meta.env.VITE_YT_ACCESS_TOKEN)
                .then((response) => {
                    console.log(response.data)
                    this.allSong = response.data.items.map(v => v.snippet)
                        .filter(v => v.thumbnails.default !== undefined);
                })
        }
    }
})

export default usePlayerController;
