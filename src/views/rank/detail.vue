<template>
	<div>
		<div class="header rel">
			<img :src="topinfo.pic_album" :alt="topinfo.ListName" class="header-bg">
			
			<div class="album-mask" :style="{color: transferColor}"></div>
			<div class="album-info">
				<div class="album-title">
					<h1 class="nowrap">{{topinfo.ListName}}</h1>
					<p class="nowrap">{{update_time}}&nbsp;更新</p>
				</div>
				<div class="album-play" @click="toPlay"></div>
			</div>
		</div>

		<ul class="list" :style="{backgroundColor: transferColor}">
			<template v-for="(list, index) in songlist">
				<li class="song-list">
					<h3 class="song-list-no">{{index + 1}}</h3>
					<div @click='toPlayLi(list, index)'  class="song-list-cont">
						<div>
							<p class="song-name nowrap">{{list.data.songname}}</p>
							<p class="song-info nowrap">
								<template v-for='(item, index) in list.data.singer'>
									<span v-if='index > 0'>&nbsp;/&nbsp;</span>{{item.name}}
								</template>
								<span class="icon icon-point"></span>
								{{list.data.albumname}}
								<template v-if='list.data.albumdesc'>
									<span class="icon icon-point"></span>
									{{list.data.albumdesc}}
								</template>
							</p>
						</div>
					</div>
				</li>
			</template>
		</ul>
	</div>
</template>

<script>
	import SongList from '../../components/song-list'
	import router from '../../router'
	import store from '../../vuex/store'

	export default {
		data () {
	      return {
	        songlist: [],
	        topinfo: [],
	        id: this.$route.params.id,
	        color: 0,
	        update_time: ''
	      }
	    },
	    methods: {
	    	toPlayLi: function(songInfo, index) {
				store.commit('changeSong', songInfo.data);
				store.commit('changeSongIndex', index);
				console.log('index='+index);
				this.$router.push({
	    			path: '/playing/'+songInfo.data.songid
	    		});
			},
	    	toPlay: function() {
	    		let _song = this.songlist[0].data;
            	store.commit('changeSong', _song);

	    		router.push({
	    			name: 'Playing',
	    			params: {
	    				songid: _song.songid
	    			}
	    		});
	    	}
	    },
		computed: {
			transferColor: function() {
				var t = this.color, computedColor;
				function n(t) {
					return t > 16 ? t.toString(16) : "0" + t.toString(16);
				}
				if (t) {
					var o = (16711680 & t) >> 16, a = (65280 & t) >> 8, i = 255 & t;

					var s = n(o) + n(a) + n(i);
					computedColor = '#' + s;
				} else {
					computedColor = '#000';
				}
				return computedColor;
			}
		},
		components: {
			SongList
		},
		beforeMount () {
			this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', {
			    params: {
					g_tk: 5381,
					uin: 0,
					format: 'jsonp',
					inCharset: 'utf-8',
					outCharset: 'utf-8',
					notice: 0,
					platform: 'h5',
					needNewCode: 1,
					page: 'detail',
					type: 'top',
					topid: this.id,
					_: new Date().getTime()
			    },
			    jsonp: 'jsonpCallback'
			}).then(function (response) {
			  	this.songlist = response.body.songlist;
			  	this.topinfo = response.body.topinfo;
			  	this.color = response.body.color;
			  	this.update_time = response.body.update_time;
				store.commit('changeSongList', this.songlist.slice(0, 50));
			})
		}
	}
</script>
<style lang='less'>
	.header {
		.header-bg {
			width: 100%;
			display: block;
		}

		.album-mask {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			padding-top: 60%;
			height: 0;
			z-index: 2;
			background-image: -webkit-linear-gradient(top,transparent,currentColor 80%);
		}

		.album-info {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 3;
			display: -webkit-box;
			display: flex;
			-webkit-box-align: center;
		    -webkit-align-items: center;
		    align-items: center;
			margin: 0 15px 25px;
			color: #fff;

			.album-title {
				-webkit-box-flex: 1;
				-webklit-flex: 1;
				flex: 1;
				width: 0;
				line-height: 1.5em;
				h1 {
					font-weight: normal;
					font-size: 1.2rem;
					height: 1.4rem;
    				line-height: 1.4rem;
				}
				p {
					font-size: 0.7rem;
				}
			}

			.album-play {
				margin-left: 0.6rem;
				width: 2rem;
				height: 2rem;
				background: url(../../assets/list_sprite.png);
				background-size: cover;
				cursor: pointer;
			}
		}
	}

	.list {
		padding: 0 0.5rem;
		margin: 0;
	}
</style>
