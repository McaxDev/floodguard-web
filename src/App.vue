<template>
	<!-- 左侧导航栏 -->
	<el-menu v-if="showMenu" default-active="1" :collapse="collapseMenu" class="bgc-subtle">
		<div class="text-center my-4">
			<div v-if="!collapseMenu">FloodGuard</div>
			<el-icon v-else><Ship /></el-icon>
		</div>

		<!-- 导航栏菜单的每个元素 -->
		<router-link v-for="(item, index) in $router.options.routes" :key="index" :to="item.path" custom v-slot="{ navigate, isActive }">
			<el-menu-item :index="index" @click="navigate" :class="['rounded-4', {'is-active text-light fw-bold bgc-main': isActive}]">
				<el-icon><component :is="item.icon" /></el-icon>
				<span>{{ item.name }}</span>
			</el-menu-item>
		</router-link>

		<!-- 左下角隐藏菜单按钮 -->
		<el-menu-item class="position-absolute bottom-0 w-100" @click="toggleCollapseMenu">
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
			collapseMenu: window.innerWidth < 1200
		}
	},
	methods: {
		toggleCollapseMenu() {
			this.collapseMenu = !this.collapseMenu
		},
		handleResize() {
			this.showMenu = window.innerWidth > 768
			this.collapseMenu = window.innerWidth < 1200
		}
	},
	mounted() {
		window.addEventListener('resize', this.handleResize())
    console.log(this.$router.options.routes)
	},
	beforeUnmount() {
		window.removeEventListener('resize', this.handleResize())
	}
}
</script>