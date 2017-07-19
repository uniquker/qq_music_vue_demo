<template>
	<div v-bind:style="{backgroundColor: c_bg1}">
		
		<div class="wrap">
			<div class="mod_focus">
				<div class="focus__body" id="header_block">
					<div class="focus__info">
						<div class="focus__text">
							<h1 class="focus__tit c_txt1" id="album_name">
								<div class="js_marquee" style="float: left; white-space: nowrap; text-overflow: ellipsis;">{{obj.name}}</div>
							</h1>
							<p class="focus__desc c_txt1">
								<span class="focus__gap js_opensinger" id="album_singername">{{obj.singername}}</span>
								<span class="focus__gap" id="album_pubtime">{{obj.aDate}}</span>
								<span class="focus__gap" id="album_genre">{{obj.genre}}</span>
							</p>
						</div>
						<a v-on:click="toPlay" class="focus__play c_ico1 js_playallsong" href="javascript:;"><span class="focus__play_text">播放</span></a>
					</div>
				</div>
				<div class="focus__bg" id="album_bgimg" v-bind:style="{backgroundImage: 'url('+albumimg+')'}"></div>
				<div class="focus__gradient c_gradient" v-bind:style="{color: c_gradient}"></div>
			</div>
	
			<ul class="mod_song_list border_t c_bor1" id="songlist">
				<template v-for="(list, index) in songlist">
					<song-list :listdata="list" :listindex="index"></song-list>
				</template>
			</ul>
	
			<div class="mod_prompt" id="empty" style="display:none">
				<img class="mod_prompt__img" width="95" src="//y.gtimg.cn/mediastyle/mobile/project_v5/extra/empty.png?max_age=2592000">
				<h6 class="mod_prompt__tit c_txt1">歌曲还未正式上架，请耐心等候！</h6>
			</div>
	
			<div class="mod_loading" id="loading" v-show="isShow">
				<i class="loading__icon"></i>
				<span class="loading__text c_txt1">正在载入更多...</span>
			</div>
			<div class="mod_complete c_txt1" style="display:none">加载完成</div>
	
			<h2 class="mod_tit" id="brief_block_title"><span class="mod_tit__text c_txt1">简 介</span></h2>
			<div class="mod_summary">
				<p class="summary__para c_txt1" id="album_desc" v-html="obj.desc">
				</p>
			</div>
	
			
		</div>
		
	</div>
</template>

<script>
	import SongList from '../../components/song-list'
	import router from '../../router'
	import store from '../../vuex/store'

!function(e) {
        function t(e) {
            return null == e ? "" : e + ""
        }
        function n(e) {
            for (var t = "", n = 0; n < e.length; n++)
                t += /\W/.test(e[n]) && e.charCodeAt(n) < 256 ? "&#" + e.charCodeAt(n) + ";" : e[n];
            return t
        }
        function i(e) {
            return t(e).replace(/&amp;/g, "&#38;").replace(/&lt;/g, "&#60;").replace(/&gt;/g, "&#62;").replace(/&quot;/g, "&#34;").replace(/&apos;/g, "&#39;").replace(/&nbsp;/g, "&#160;").replace(/&#(\d+);?/g, function(e, t) {
                return o(t)
            }).replace(/&#x([0-9a-f]+);?/gi, function(e, t) {
                return o(parseInt(t, 16))
            })
        }
        function o(e) {
            return e > 65535 ? String.fromCodePoint ? String.fromCodePoint(e) : a("&#" + e + ";") : String.fromCharCode(e)
        }
        function a(e) {
            return null == e || "" == e ? "" : (r || (r = document.createElement("div")),
            r.innerHTML = e,
            r.textContent || r.innerText)
        }
        var r;
        e.encodeHTML = n,
        e.decodeHTML = i,
        "undefined" != typeof _ && _.escape || (window._ = {
            escape: function(e) {
                return n(i(e))
            }
        }),
        String.prototype.encodeHTML = function() {
            return n(this)
        }
        ,
        String.prototype.decodeHTML = function() {
            return i(this)
        }
    }(window)

	export default {
		//props: ['albummid'],
		data () {
			console.log(this.$route.params.albumid+"   "+this.$route.params.id)
	      return {
	        songlist: [],
	        topinfo: [],
	        albummid: this.$route.params.id,
	        album_v: this.$route.params.albumid,
	        color: 0,
	        c_gradient: '',
	        c_bg1: '',
	        albumimg: '',
	        update_time: '',
	        obj: {},
	        isShow: true
	      }
	    },
	    methods: {
	    	toPlay: function() {
	    		let _song = this.songlist[0];
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
			var e = "";
			e = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albumid=" + this.albummid;
            if(this.album_v!=='v'){
            	e = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albummid=" + this.album_v;
            }
			this.$http.jsonp(e, {
			    params: {
					g_tk: 5381,
					uin: 0,
					format: 'jsonp',
					inCharset: 'utf-8',
					outCharset: 'utf-8',
					notice: 0,
					platform: 'h5',
					needNewCode: 1,
					_: new Date().getTime()
			    },
			    jsonp: 'jsonpCallback'
			}).then(function (response) {
				var n = response.body.data;
                calculateBgColor(n.color, this);
                var albumid = n.id, albummid = n.mid+"";
                this.albumimg = "https://y.gtimg.cn/music/photo/mid_album_500/" + albummid.slice(-2, -1) + "/" + albummid.slice(-1) + "/" + albummid + ".jpg",
               	this.songlist = n.list;
               	this.isShow = false;
               	n.desc = _.escape(n.desc);
               	this.obj=n;
//             	debugger;
				store.commit('changeSongList', n.list);
				store.commit('changeSongIndex', 0)
    			store.commit('changeSong', n.list[0]);
			})
			var calculateBgColor = function(e, obj) {
	            function n(e) {
	                return e > 16 ? e.toString(16) : "0" + e.toString(16)
	            }
	            if (e) {
	                var t, i = (16711680 & e) >> 16, o = (65280 & e) >> 8, a = 255 & e;
	                if (!(i < 0 || o < 0 || a < 0 || i > 255 || o > 255 || a > 255)) {
	                	var l = n(i) + n(o) + n(a);
	                	obj.c_bg1 = '#' + l;
	                	obj.c_gradient = '#' + l;
	                }
	            }
	        }
			
		}
	}	
</script>

<style>
.summary__para {
    margin: 0 15px;
    text-align: justify;
    font-size: 14px;
    color: #fff;
}	
.wrap {
    padding-bottom: 100px;
    overflow: hidden;
    min-height: 100vh;
    box-sizing: border-box;
}	
body {
    font: 300 12px/1.5 sans-serif;
    color: grey;
    background-color: #fff
}

.mod_focus {
    position: relative;
    overflow: hidden
}

.focus__body {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3
}

.focus__info {
    display: -webkit-box;
    -webkit-box-align: center;
    margin: 0 15px 25px
}

.focus__text {
    -webkit-box-flex: 1
}

.focus__desc,.focus__tit {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px
}

.focus__tit {
    position: relative;
    height: 36px;
    overflow: hidden;
    font-size: 24px
}

.focus__tit_text {
    position: absolute;
    white-space: nowrap
}

.focus__bg {
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover
}

.focus__bg::after {
    content: "";
    display: block;
    padding-top: 100%
}

.focus__gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    background-image: -webkit-linear-gradient(top,transparent,currentColor 80%)
}

.focus__gradient::after {
    content: "";
    display: block;
    padding-top: 60%
}

.focus__gap {
    margin-right: 10px
}

.focus__play {
    position: relative;
    display: block;
    width: 42px;
    height: 42px;
    margin-left: 10px;
    border: solid 2px;
    border-radius: 42px
}

.focus__play::before {
    content: "";
    position: absolute;
    top: 12px;
    left: 16px;
    height: 0;
    width: 0;
    line-height: 999em;
    overflow: hidden;
    border-color: transparent transparent transparent currentColor;
    border-width: 9px 15px;
    border-style: solid;
    border-radius: 2px
}

.focus__play--pause::before {
    left: 14px;
    width: 5px;
    height: 18px;
    border-width: 0;
    background-color: currentColor
}

.focus__play--pause::after {
    content: "";
    position: absolute;
    top: 12px;
    left: 24px;
    width: 5px;
    height: 18px;
    border-radius: 2px;
    background-color: currentColor
}

.focus__play_text {
    opacity: 0
}

.mod_tit {
    position: relative;
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    margin: 25px 0;
    font-size: 18px
}

.tit__more {
    position: absolute;
    top: -6px;
    right: 10px;
    width: 40px;
    height: 40px;
    line-height: 999em;
    overflow: hidden
}

.tit__more::before {
    content: "";
    position: absolute;
    top: 17px;
    left: 15px;
    width: 7px;
    height: 7px;
    border-style: solid;
    border-width: 0 1px 1px 0;
    -webkit-transform: rotate(-45deg)
}

.tit__more::after {
    content: "";
    position: absolute;
    top: 12px;
    left: 12px;
    width: 16px;
    height: 16px;
    border-style: solid;
    border-width: 1px;
    border-radius: 999px
}

.mod_loading {
    position: relative;
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    height: 55px
}

.loading__text {
    margin-left: 5px;
    font-size: 12px;
    color: grey
}

.loading__icon {
    display: block;
    width: 20px;
    height: 20px;
    background: url(/static/icon_loading.png) no-repeat;
    background-size: cover;
    -webkit-animation: ani_loading 1s infinite
}

.mod_complete {
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    height: 55px;
    font-size: 14px
}

@-webkit-keyframes ani_loading {
    from {
        -webkit-transform: rotate(0)
    }

    8.32% {
        -webkit-transform: rotate(0)
    }

    8.33% {
        -webkit-transform: rotate(30deg)
    }

    16.65% {
        -webkit-transform: rotate(30deg)
    }

    16.66% {
        -webkit-transform: rotate(60deg)
    }

    24.99% {
        -webkit-transform: rotate(60deg)
    }

    25% {
        -webkit-transform: rotate(90deg)
    }

    33.32% {
        -webkit-transform: rotate(90deg)
    }

    33.33% {
        -webkit-transform: rotate(120deg)
    }

    41.65% {
        -webkit-transform: rotate(120deg)
    }

    41.66% {
        -webkit-transform: rotate(150deg)
    }

    49.99% {
        -webkit-transform: rotate(150deg)
    }

    50% {
        -webkit-transform: rotate(180deg)
    }

    58.32% {
        -webkit-transform: rotate(180deg)
    }

    58.33% {
        -webkit-transform: rotate(210deg)
    }

    66.65% {
        -webkit-transform: rotate(210deg)
    }

    66.66% {
        -webkit-transform: rotate(240deg)
    }

    74.99% {
        -webkit-transform: rotate(240deg)
    }

    75% {
        -webkit-transform: rotate(270deg)
    }

    83.32% {
        -webkit-transform: rotate(270deg)
    }

    83.33% {
        -webkit-transform: rotate(300deg)
    }

    91.65% {
        -webkit-transform: rotate(300deg)
    }

    91.66% {
        -webkit-transform: rotate(330deg)
    }

    99.99% {
        -webkit-transform: rotate(330deg)
    }

    to {
        -webkit-transform: rotate(360deg)
    }
}

.mod_loading_fixed {
    position: fixed;
    left: 0;
    top: 50%;
    width: 100%;
    margin-top: -26px;
    z-index: 100
}

.mod_loading_full {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: rgba(0,0,0,.5)
}

.mod_loading_full .loading__text {
    color: rgba(255,255,255,.6)
}

.mod_prompt {
    padding-top: 100px;
    text-align: center
}

.mod_prompt__img {
    display: block;
    margin: 0 auto 40px
}

.mod_prompt__tit {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 400
}

.mod_prompt__desc {
    margin: 0 50px;
    line-height: 14px
}

.c_txt1 {
    color: #fff
}

.c_txt2 {
    color: rgba(255,255,255,.6)
}

.c_bor1,.c_bor1::after {
    border-color: rgba(255,255,255,.15)
}

.c_ico1 {
    color: #fff
}
</style>