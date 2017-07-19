<template>
<div>
	<head-comp curTab='0'></head-comp>
	<div id="main">
		<swiper class="my-swipe" :options="swiperOption">
		  <swiper-slide class="silde" v-for="item in sliderData" :key="item.alt">
		    <router-link :to="{name: 'Album',params: {id: item.alt,albumid: item.albumid}}">
		      <img :src="item.src " :alt="item.alt" />
		    </router-link>
		  </swiper-slide>
		  <div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>

	<div class="radio-wrap section-wrap">
		<h3 class="sub-title">电台</h3>
		<ul class="radio-list">
			<li v-for="radio in radioList" v-on:click="radioFn(radio.radioid)">
				<div>
					<div class="radio-img-wrap rel">
						<img :src="radio.picUrl" class="cover-img" alt="" onerror="javascript:this.src='https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/default_pic.jpg';" />
						<span class="icon-play"></span>
					</div>
					<p class="radio-name">{{radio.Ftitle}}</p>
				</div>
			</li>
		</ul>
	</div>

	<div class="radio-wrap section-wrap hot">
		<h3 class="sub-title">热门歌单</h3>
		<ul class="radio-list">
			<router-link tag="li" v-for="item in songList" :to="{name: 'SongSheet', params: {id: item.id}}">
				<div>
					<div class="radio-img-wrap rel">
						<img :src="item.picUrl" class="cover-img" alt="" onerror="javascript:this.src='https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/default_pic.jpg';" />
						<span class="icon-play"></span>
					</div>
					<p class="radio-name">{{item.songListDesc}}</p>
					<p>{{item.songListAuthor}}</p>
				</div>
			</router-link>
		</ul>
	</div>
	<div class="more-info">
		<a href="" class="go2app">去客户端发现更多好音乐&gt;</a>
		<a href="" class="go2pc">查看电脑版网页</a>
		<img class="logo" src="https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/logo_footer.png?max_age=19830212&d=20151105145423" alt="">
		<p class="copy-right">Copyright © 1998 - 2017 Tencent. All Rights Reserved.</p>
	</div>
</div>
</template>

<script>
	import HeadComp from '../../components/header/index'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import store from '../../vuex/store'

	export default {
		data () {
	      return {
	        sliderData: [],
	        radioList: [],
	        songList: [],
	        swiperOption: {
				autoplay: 3500,
				setWrapperSize :true,
				pagination : '.swiper-pagination',
				paginationClickable :true,
				mousewheelControl : true,
				observeParents:true,
			}
	      }
	    },
		components: {
			HeadComp,
			swiper,
			swiperSlide
		},
		methods: {
			radioFn: function(id){
				this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_radiosonglist.fcg?labelid='+id, {
				    params: {
				    },
				    jsonp: 'jsonpCallback'
				}).then(function (response) {
					if(!response.body){
						return;
					}
					var n = response.body;
					if (n && 0 == n.code && n.data && !(n.data.length < 1)) {
                        for (var a = [], r = 0, i = n.data.length; r < i; r++)
                            n.data[r].songid=n.data[r].id,a.push(n.data[r].id);
                        a.sort(function(n, a) {
                            return Math.random() - Math.random()
                        });

                        store.commit('changeSongIndex', 0)
                        store.commit('changeSongList', n.data)
            			store.commit('changeSong', n.data[0]);
            			
                        this.$router.push({
				        	path: '/playing/'+a[0]
				      	})
                        
                    }
				})
				
			}
		},
		beforeMount () {
			this.$http.jsonp('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', {
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
			  	let slider = response.data.data.slider;
			    for (let i = 0; i < slider.length; i++) {
			    	var ids = slider[i].linkUrl.substr(slider[i].linkUrl.indexOf("=")+1);
			    	console.log(ids)
		        	this.sliderData.push({src: slider[i].picUrl, 
		        		alt: slider[i].id, 
		        		href: slider[i].linkUrl,
		        		albumid: slider[i].id==10883?ids:'v'
		        	})
			    }
				this.songList = response.data.data.songList;
			    this.radioList = response.data.data.radioList;
			})
		},

		mounted () {

		}
	}
</script>

<style lang="less">
	#app {
		background-color: #f4f4f4;
		min-height: 100%;
	}
	ul {
		margin: 0;
		padding: 0;
	}
	#main {
		.swiper-pagination {
			bottom: 0;
		}
		.swiper-wrapper {
			img {
				width: 100%;
				display: block;
			}
		}
		.swiper-pagination-bullet-active {
			background-color: #fff;
		}
		.product {
			margin-top: 15px;
			background-color: #fff;
			.product-title {
				border-bottom: 1px solid #eee;
				height: 1.8rem;
				line-height: 1.8rem;
				font-size: 0.8rem;
				padding-left: 0.8rem;
				font-weight: normal;
			}
		}
	}

	.section-wrap {
		padding: 0.7rem 0 0 0.5rem;
		.sub-title {
			font-size: 0.8rem;
			margin-bottom: 0.5rem;
			font-weight: normal;
		    height: 1.4rem;
			line-height: 1.4rem;
			&:before{
				content:"";
				border-left: 3px solid #31C27C;
				display: inline-block;
				vertical-align: middle;
				height: 1rem;
   				padding: 0 3px 0 0;
			}
		}
	}

	.radio-wrap {
		.radio-list {
			overflow: hidden;
			list-style: none;
			li {
				width: 50%;
				box-sizing: border-box;
				padding-right: 0.4rem;
				float: left;
				margin-bottom: 1rem;
				
				>div{
					background-color: #fff;
				}

				.icon-play {
					position: absolute;
					right: 0.5rem;
					bottom: 0.5rem;
					width: 1.2rem;
					height: 1.2rem;
					background: url(../../assets/list_sprite.png) no-repeat;
					background-size: cover;
				}
				.cover-img {
					width: 100%;
					display: block;
				}
				&:last-child {
					margin: 0;
				}

				p{
					font-size: .6rem;
					margin-top: -.4rem;
					padding: 0 .4rem .2rem;
				}
				
				.radio-name {
					font-size: 0.7rem;
					height: 1.6rem;
					line-height: 1.6rem;
					padding: 0.2rem 0.4rem;
				}
			}
		}
	}
	.radio-wrap.hot .radio-list li .radio-name {
	    font-size: 0.7rem;
	    background-color: #fff;
	    height: 1.6rem;
	    padding: 0.2rem 0.4rem;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}
	.more-info {
		text-align: center;
		font-size: 0.7rem;
		color: rgba(0,0,0,.6);
		a {
			display: block;
			color: rgba(0,0,0,.6);
			line-height: 2rem;
		}
		.go2pc {
			color: #000;
		}

		.logo {
			width: 4rem;
			margin-top: 0.6rem;
		}

		.copy-right {
			line-height: 3rem;
			font-size: 0.6rem;
		}
	}
</style>
