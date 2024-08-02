<template>
	<div :class="['d-flex align-items-center rounded mb-4 mx-4 p-2 bgc-container', {'justify-content-between': right}]">
		<el-button @click="toggleSidebarShow" class="bi bi-list">菜单</el-button>
		<div>
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default{
    data(){
		return{

		}
    },
	props:{
		right:{
			type: {},
			default: {},
		},
	},
	methods:{
		toggleSidebarShow(){
			
		}
	}
}
</script>