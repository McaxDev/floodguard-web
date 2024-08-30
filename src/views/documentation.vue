<template>
  <div class="w-100 h-100 d-flex flex-column">
    <div class="d-flex justify-content-between align-items-center p-2 box-style">
      <h3 class="m-0 ms-2">后台管理</h3>
      <div class="custom-style-panle-edit">
        <el-segmented v-model="activePanel" :options="panelOptions" size="large"/>
      </div>
    </div>
    <div class="flex-grow-1 mt-4 box-style pb-3 d-flex flex-column" style="overflow-y: auto;position: relative;">
      <div class="markdown-body p-4" v-html="renderedMarkdown"></div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import 'github-markdown-css'

export default{
  data(){
    return{
      activePanel:'sensor',
      panelOptions:[
        {"label": "传感器", "value": "sensor"},
        {"label": "上传数据", "value": "upload"},
      ],
      renderedMarkdown:'',
    }
  },
  mounted(){
    this.getMdFile()
  },
  methods:{
    async getMdFile(){
      const response = await fetch(`/document/${this.activePanel}.md`)
      const text = await response.text()
      const md = new MarkdownIt()
      this.renderedMarkdown = md.render(text)
    }
  },
  watch:{
    activePanel(newVal){
      this.getMdFile()
    }
  }
}
</script>

<style scoped>
.box-style{
  background: #fff;
  border-radius: 20px;
  box-shadow: 5px 2px 12px 1px rgba(0, 0, 0, 0.1);
}
</style>

<style>
.custom-style-panle-edit{
  transition: 0.2s ease !important;
  .el-segmented {
    --el-segmented-item-selected-color: #0d6dfd;
    --el-segmented-item-selected-bg-color: #0d6dfd00;
    --el-segmented-bg-color:#fff;
    --el-border-radius-base: 16px;
    --el-segmented-padding:1px;
    --el-segmented-item-hover-color:#434343;
    --el-segmented-item-hover-bg-color:rgba(0,0,0,0);
    --el-segmented-item-active-bg-color:rgba(0,0,0,0);
    /* box-shadow: 5px 2px 12px 1px rgba(0, 0, 0, 0.1); */
    .el-segmented__item{
      transition: 0.2s ease;
      height: 40px;
      margin: 0 3px;
      &:hover{
        box-shadow: 5px 2px 12px 1px rgba(0, 0, 0, 0.1);
      }
      &:active{
        box-shadow: inset 2px 2px 12px 1px rgba(0, 0, 0, 0.1);
      }
    }
    .el-segmented__item-selected{
      box-shadow: 5px 2px 10px 2px rgba(0, 0, 0, 0.1);
      /* box-shadow: inset 5px 2px 12px 1px rgba(0, 0, 0, 0.1); */
    }
  }
}
</style>