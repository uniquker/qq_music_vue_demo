import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		curTab: 0,
		curSong: '',
		songIndex: 0,
		songList: [],
	},
	mutations: {
		changeTab (state, n) {
			console.log("n="+n)
			sessionStorage.setItem("curTab", n);
			state.curTab = n;
		},
		changeSong (state, song) {
			sessionStorage.setItem("curSong", JSON.stringify(song));
			state.curSong = song;
		},
		changeSongIndex (state, index) {
			sessionStorage.setItem("songIndex", index);
			state.songIndex = index;
		},
		changeSongList (state, songList) {
			sessionStorage.setItem("songList", JSON.stringify(songList));
			state.songList = songList;
		}
	},
	getters: {
		getTab (state, getters) {
			console.log("get cur = "+sessionStorage.getItem("curTab"))
			state.curTab = sessionStorage.getItem("curTab")*1;
			return state.curTab;
		},
		getSong (state, getters) {
			//console.log("store is index "+sessionStorage.getItem("curSong")[id])
			state.curSong = JSON.parse(sessionStorage.getItem("curSong"));
			return state.curSong;
		},
		getSongIndex (state, getters) {
			state.songIndex = sessionStorage.getItem("songIndex");
			return state.songIndex;
		},
		getSongList (state, getters){
			state.songList = JSON.parse(sessionStorage.getItem("songList"));
			return state.songList;
		},
		getSongByIndex (state, getters) {
			//console.log("store is index "+sessionStorage.getItem("songIndex"))
			return JSON.parse(sessionStorage.getItem("songList"))[sessionStorage.getItem("songIndex")];
//			return state.songList[state.songIndex];
		}
	}
})