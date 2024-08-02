<template>
	<div class="p-4 mb-3 rounded-4 bgc-container"	:style="[{minHeight: minHeight}]">
	  <h5 class="mb-3">
			<el-icon class="me-1 color-main"><Menu /></el-icon>
			{{ title }}
		</h5>
		<div :class="[{ 'text-center': center }]">
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
		title: {},
		minHeight: {},
		center: {},
	}
}
</script>