<template>
	<!-- 已登录的用户中心 -->
	<div v-if="userInfo.$state.isLogin">
		个人中心
	</div>

	<!-- 未登录的用户中心 -->
	<div v-else class="h-100 test" style="position: relative">
		<div class="logres-bg">
			<css-doodle>
				@grid: 1 / 100% 100% / #E9ECEF;
				background-size: 300px 300px;
				background-image: @doodle(
					@grid: 6 / 100%;
					@size: 4px;
					font-size: 4px;
					color: hsl(@r240, 30%, 50%);
					box-shadow: @m3x5(
					calc(4em - @nx*1em) @ny(*1em)
						@p(@m3(currentColor), @m2(#0000)),
					calc(2em + @nx*1em) @ny(*1em)
						@lp
					);
				);
			</css-doodle>
		</div>
		<div class="d-flex justify-content-center align-items-center h-100" style="position: relative;">
			<transition name="slide-up">
				<div v-if="logOrRes==='log'" class="logres-outbox w-50" style="max-width: 400px;min-width: 350px;position: absolute;">
					<div class="logres-box">
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="top">
							<h3 class="mt-3 mb-3">请登录</h3>
							<el-form-item label="用户名" prop="userName">
								<el-input size="large" v-model="ruleForm.userName"></el-input>
							</el-form-item>
							<el-form-item label="密码" prop="password">
								<el-input size="large" v-model="ruleForm.password"></el-input>
							</el-form-item>
							<el-form-item label="验证码" prop="code">
								<el-input size="large" v-model="ruleForm.code">
									<template #suffix>
										<el-button link @click="getImgCode"><img style="width: auto;height: 26px;" :src="imgCode"/></el-button>
									</template>
								</el-input>
							</el-form-item>
							<el-form-item class="mb-0">
								<el-button size="large" class="w-100" type="primary" @click="submitForm('ruleForm')">登录</el-button>
							</el-form-item>
							<el-form-item class="mt-2">
								<small>没有账号？</small><el-button type="primary" link @click="()=>{logOrRes='res'}"><small>点我注册</small></el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
				<div v-else-if="logOrRes==='res'" class="logres-outbox w-50" style="max-width: 400px;min-width: 350px;">
					<div class="logres-box">
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="top">
							<h3 class="mt-3 mb-3">注册账号...</h3>
							<el-form-item label="用户名" prop="userName">
								<el-input size="large" v-model="ruleForm.userName"></el-input>
							</el-form-item>
							<el-form-item label="密码" prop="password">
								<el-input size="large" v-model="ruleForm.password"></el-input>
							</el-form-item>
							<el-form-item label="邮箱" prop="email">
								<el-input size="large" v-model="ruleForm.email"></el-input>
							</el-form-item>
							<el-form-item label="邮箱验证码" prop="code">
								<el-input size="large" v-model="ruleForm.code">
									<template #suffix>
										<el-button link @click="getcode" :disabled="codeDisabled">{{ codeText }}</el-button>
									</template>
								</el-input>
							</el-form-item>
							<el-form-item label="简介" prop="introduction">
								<el-input size="large" v-model="ruleForm.introduction"></el-input>
							</el-form-item>
							<el-form-item class="mb-0">
								<el-button size="large" class="w-100" type="primary" @click="submitForm('ruleForm')">注册</el-button>
							</el-form-item>
							<el-form-item class="mt-2">
								<small>已有账号？</small><el-button type="primary" link @click="()=>{logOrRes='log'}"><small>点我登录</small></el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import { Transition } from 'vue'
import { userStore } from '../stores/user'

import http from '../utils/http'
import jsCookie from 'js-cookie'

export default{
    data(){
		return{
			userInfo:userStore(),
			logOrRes:'log',
			codeText:'点击获取验证码',
			countDown:'',
			captchaID:'',
			imgCode:'',
			codeDisabled:false,
			ruleForm: {
				userName: '',
				password:'',
			},
			rules: {
				userName: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{ min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
				],
				email:[
					{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
					{ 
						type: 'email', 
						message: '请输入有效的邮箱地址', 
						trigger: ['blur', 'change'] 
					}
				],
				code: [
					{ required: true, message: '请输入验证码', trigger: 'blur' },
					{ min: 6, max: 6, message: '请输入六位验证码', trigger: 'blur' }
				],
			},
		}
    },
	mounted(){
		this.getImgCode()
	},
	methods:{
		submitForm(formName){
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if(this.logOrRes==='log'){
						const query = {
							Username:this.ruleForm.userName,
							Password:this.ruleForm.password,
							CaptchaId:this.captchaID,
							CaptchaValue:this.ruleForm.code,
						}
						http.post('/login',query)
							.then(res=>{
								console.log(res)
								this.$message({
									message: res.data.msg,
									type: 'success',
									plain: true,
								})
								const userInfox = {
									admin:res.data.data.admin,
									email:res.data.data.email,
									username:res.data.data.userName,
								}
								jsCookie.set('X-Floodguard-Token',res.data.data.token)
								this.userInfo.login(userInfox)
							})
							.catch(err=>{
								this.$message({
									message: res.data.msg,
									type: 'error',
									plain: true,
								})
								this.getImgCode()
							})
					}else if(this.logOrRes==='res'){
						const query = {
							Username:this.ruleForm.userName,
							Password:this.ruleForm.password,
							email:this.ruleForm.email,
							Authcode:this.ruleForm.code,
						}
						http.post('/signup',query)
							.then(res=>{
								console.log(res)
								this.$message({
									message: res.data.msg,
									type: 'success',
									plain: true,
								})
							})
					}
				} else {
					console.log('error submit!!');
					return false;
				}
			})
		},
		getcode(){
			const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
			if(regex.test(this.ruleForm.email)){
				this.codeDisabled = true
				this.countDown = 60
				this.codeText=`请${this.countDown}秒后再试`

				http.get(`/email?email=${this.ruleForm.email}`)
					.then(res => {
						this.$message({
							message: res.data.msg,
							type: 'success',
							plain: true,
						})
						console.log(res)
					})

				let interval = setInterval(() => {
					this.countDown--
					this.codeText=`请${this.countDown}秒后再试`
					if (this.countDown <= 0) {
						this.codeText='获取邮箱验证码'
						clearInterval(interval)
						this.codeDisabled = false
					}
				}, 1000)
			}else{
				this.$message({
					message: '请输入正确邮箱',
					type: 'error',
					plain: true,
				})
			}
		},
		getImgCode(){
            http.get('/captcha',{responseType: 'blob'})
            .then(res=>{
                var imageBlob = new Blob([res.data], { type: 'image/png' })
                var imageUrl = URL.createObjectURL(imageBlob)
                this.captchaID=res.headers.get('X-Captcha-Id')
                this.imgCode=imageUrl
            })
        }
	},
	watch:{
		logOrRes(newVal){
			this.$refs['ruleForm'].resetFields()
		}
	}
}
</script>

<style scoped>
.logres-box{
	padding: 40px;
	/* background: #ffffff; */
	background: #ffffffc2;
	backdrop-filter: blur(7px);
	border-radius: 10px;
	box-shadow: 2px 2px 12px 1px rgba(0, 0, 0, 0.15);
}
.logres-outbox{
	
}
.logres-bg{
	height: 100%;
	width: 100%;
	position: absolute;
}
/* .test{
	background-image: url(../assets/map.jpg);background-size: contain;background-position: center;background-repeat: no-repeat;
} */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>