<template>
	<!-- 左侧导航栏 -->
	<el-menu v-if="showMenu" default-active="1" :collapse="collapseMenu" class="nav-galss" style="padding: 10px;">
		<div class="text-center my-4">
			<div v-if="!collapseMenu">FloodGuard</div>
			<el-icon v-else><Ship /></el-icon>
		</div>

		<!-- 导航栏菜单的每个元素 -->
		<router-link v-for="(item, index) in $router.options.routes" :key="index" :to="item.path" custom v-slot="{ navigate, isActive }">
			<el-menu-item :index="index" @click="navigate" :class="['rounded-4', {'is-active fw-bold': isActive}]" class="nav-btn" :style="{'color':isActive?'#fff':''}" style="margin-top: 5px;">
				<el-icon><component :is="item.icon" /></el-icon>
				<span>{{ item.name }}</span>
			</el-menu-item>
		</router-link>

		<!-- 左下角隐藏菜单按钮 -->
		<el-menu-item :class="['rounded-4', {'is-active': collapseMenu}]" class="position-absolute btn-collapseMenu" @click="toggleCollapseMenu">
			<el-icon>
				<Hide v-if="collapseMenu" />
				<View v-else />
			</el-icon>
			<span>折叠</span>
		</el-menu-item>
	</el-menu>

	<!-- 右侧内容部分 -->
	<div class="flex-grow-1 overflow-y-auto p-4 bgc-bg">
		<RouterView />
	</div>
</template>
  
<script>
import '@/style.css';
// import { $router.options.routes } from '@/router/index.js'

export default{
	data() {
		return {
			showMenu: window.innerWidth > 768,
			collapseMenu: window.innerWidth < 1200,
		}
	},
	provide() {
		return {
			toggleSidebarShow: this.toggleSidebarShow
		}
	},
	methods: {
		toggleCollapseMenu() {
			this.collapseMenu = !this.collapseMenu
		},
		toggleSidebarShow(){
			console.log('Toggling sidebar in ancestor component');
      		this.showMenu = !this.showMenu;
		},
		handleResize() {
			this.showMenu = window.innerWidth > 768
			this.collapseMenu = window.innerWidth < 1200
		}
	},
	mounted() {
		window.addEventListener('resize', this.handleResize())
    	// console.log(this.$router.options.routes)
	},
	beforeUnmount() {
		window.removeEventListener('resize', this.handleResize())
	}
}
</script>

<style>
.el-menu--collapse{
	width: calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding)*2+20);
}
</style>