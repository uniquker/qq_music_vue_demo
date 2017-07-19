<template>
	<div>
		<section id="js_mod_dialog" class="qui_dialog" v-show="isShow">
			<div class="qui_dialog__mask">
				<div class="qui_dialog__box">
					<div class="qui_dialog__hd">
						<h4 class="qui_dialog__tit">{{msg.title || 'QQ音乐'}}</h4></div>
					<div class="qui_dialog__bd">
						<p class="qui_dialog__para">{{msg.cont || '您需要先登录!'}}</p>
					</div>
					<div class="qui_dialog__ft">
						<a @click="cancel" class="qui_dialog__btn js_qui_dialog_btn" data-index="0" href="javascript:;">取消</a>
						<a @click="confirm" class="qui_dialog__btn js_qui_dialog_btn qui_dialog__btn--primary" data-index="1" href="javascript:;">确定</a>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	props: {
		isShow: Boolean,
		msg: Object
	},
	methods: {
		cancel: function () {
			console.log("cancel ...")
			this.$emit('cancel', false);
		},
		confirm: function () {
			console.log("confirm ...")
			this.$emit('confirm', false);
		}
	}
}
</script>

<style>
	.qui_dialog__mask {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 1000;
		display: -webkit-box;
		-webkit-box-pack: center;
		-webkit-box-align: center;
		background: rgba(0, 0, 0, .7)
	}
	
	.qui_dialog__box {
		position: relative;
		width: 296px;
		max-height: 80%;
		font: 300 12px/1.5 sans-serif;
		color: #777;
		border-radius: 3px;
		border-top: solid 4px #31c27c;
		background: #fff;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
	
	.qui_dialog__media {
		overflow: hidden;
		margin-top: -4px;
		border-radius: 3px 3px 0 0
	}
	
	.qui_dialog__img {
		display: block;
		width: 100%
	}
	
	.qui_dialog__bd {
		-webkit-box-flex: 1;
		overflow: auto;
		margin: 18px 0;
		-webkit-overflow-scrolling: touch
	}
	
	.qui_dialog__tit {
		margin: 32px 28px -12px;
		line-height: 26px;
		text-align: center;
		font-weight: 300;
		font-size: 20px;
		color: #000
	}
	
	.qui_dialog__para {
		margin: 6px 28px;
		text-align: justify;
		word-wrap: break-word;
		word-break: break-all;
		font-size: 16px
	}
	
	.qui_dialog__para--center {
		text-align: center
	}
	
	.qui_dialog__strong {
		color: #000
	}
	
	.qui_dialog__ft {
		position: relative;
		display: -webkit-box
	}
	
	.qui_dialog__ft::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1;
		height: 1px;
		background: #E2E3E7
	}
	
	.qui_dialog__btn {
		display: block;
		-webkit-box-flex: 1;
		position: relative;
		width: 0;
		height: 45px;
		line-height: 45px;
		text-align: center;
		text-decoration: none;
		font-size: 18px;
		color: #000;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		-webkit-user-select: none
	}
	
	.qui_dialog__btn:nth-child(2)::after {
		content: "";
		position: absolute;
		top: 1px;
		left: 0;
		bottom: 0;
		z-index: 1;
		width: 1px;
		background: #E2E3E7
	}
	
	.qui_dialog__btn--primary {
		color: #31c27c
	}
	
	.qui_dialog__btn_pill {
		display: block;
		height: 45px;
		margin: 0 28px 28px;
		line-height: 45px;
		text-align: center;
		text-decoration: none;
		font-size: 18px;
		color: #fff;
		border-radius: 45px;
		background: #31c27c;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		-webkit-user-select: none
	}
	
	.qui_dialog__close {
		position: absolute;
		left: 50%;
		bottom: -65px;
		width: 41px;
		height: 41px;
		-webkit-transform: translateX(-50%);
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		-webkit-user-select: none
	}
	
	.qui_dialog__close_txt {
		position: absolute;
		top: 3px;
		right: 3px;
		width: 33px;
		height: 33px;
		line-height: 999px;
		overflow: hidden;
		border: solid 1px #fff;
		border-radius: 33px
	}
	
	.qui_dialog__close_txt::after,
	.qui_dialog__close_txt::before {
		content: "";
		position: absolute;
		background: #fff;
		-webkit-transform: rotate(45deg)
	}
	
	.qui_dialog__close_txt::before {
		width: 1px;
		height: 17px;
		top: 8px;
		left: 16px
	}
	
	.qui_dialog__close_txt::after {
		width: 17px;
		height: 1px;
		top: 16px;
		left: 8px
	}
	
	@media only screen and (max-width:320px) {
		.qui_dialog__box {
			width: 272px
		}
		.qui_dialog__bd {
			margin: 12px 0
		}
		.qui_dialog__tit {
			margin: 28px 24px -8px;
			line-height: 24px;
			font-size: 18px
		}
		.qui_dialog__para {
			margin: 4px 24px;
			font-size: 14px
		}
		.qui_dialog__btn {
			height: 40px;
			line-height: 40px;
			font-size: 16px
		}
		.qui_dialog__btn_pill {
			height: 40px;
			margin: 0 24px 24px;
			line-height: 40px;
			font-size: 16px
		}
	}
	
	@media only screen and (-webkit-min-device-pixel-ratio:2) {
		.qui_dialog__ft::after {
			-webkit-transform: scaleY(.5)
		}
		.qui_dialog__btn:nth-child(2)::after {
			-webkit-transform: scaleX(.5)
		}
	}
	
	.qui_dialog__media {
		min-height: 142px
	}
	
	.qui_dialog__btn:focus {
		outline: 0
	}
	
	a.qui_dialog__btn {
		text-decoration: none
	}
</style>