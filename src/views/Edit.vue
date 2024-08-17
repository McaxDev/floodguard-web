<template>
  <div class="w-100 h-100 d-flex flex-column">
    <div class="d-flex justify-content-between align-items-center p-2 box-style">
      <h3 class="m-0 ms-2">后台管理</h3>
      <div class="custom-style-panle-edit">
        <el-segmented v-model="activePanel" :options="panelOptions" size="large"/>
      </div>
    </div>
    <div class="flex-grow-1 mt-4 box-style pb-3 d-flex flex-column" style="overflow-y: auto;position: relative;">
      <div style="position: sticky;background: #ffffff;padding: 20px;width: 100%;top: 0px;"></div>
      <table class="w-100 p-2 mb-auto" style="margin-top: -40px;">
        <thead>
          <tr>
            <td v-for="item in fields" :key="item.key">{{ item.title }}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,id) in datas" :key="id" @contextmenu.prevent="rightClick($event,item)">
            <td v-for="field in fields" :key="field.key">{{ item[field.key] }}</td>
          </tr>
        </tbody>
      </table>
      <div class="edit-el-pagination mt-auto">
        <el-pagination background layout="prev, pager, next" :total="50" />
      </div>
    </div>
    <div v-if="isRightClickMenuShow" class="right-click-menu" :style="{'position':'fixed','left':rightClickMenu.x,'top':rightClickMenu.y}">
      <div class="right-click-menu-item">编辑</div>
      <div class="right-click-menu-item">删除</div>
    </div>
  </div>
</template>
  
<script>
export default{
  data(){
    return{
      rightClickMenu:{},
      isRightClickMenuShow:false,
      activePanel:'内涝事件',
      panelOptions:['内涝事件','历史信息','公告','地区','传感器状态','传感器','用户'],
      fields:[
        {
          key:'id',
          title:'编号'
        },
        {
          key:'name',
          title:'名字'
        },
        {
          key:'birth',
          title:'出生年月'
        },
        {
          key:'gender',
          title:'性别'
        },
      ],
      datas: [
        {
            id: '001',
            name: 'Alice Johnson',
            birth: '1992-07-16',
            gender: 'Female'
        },
        {
            id: '002',
            name: 'Bob Smith',
            birth: '1985-09-23',
            gender: 'Male'
        },
        {
            id: '003',
            name: 'Carol Taylor',
            birth: '1990-11-12',
            gender: 'Female'
        },
        {
            id: '004',
            name: 'David Lee',
            birth: '1988-04-05',
            gender: 'Male'
        },
        {
            id: '005',
            name: 'Eva Roberts',
            birth: '1995-01-09',
            gender: 'Female'
        },
        {
            id: '006',
            name: 'Frank Green',
            birth: '1982-06-30',
            gender: 'Male'
        },
        {
            id: '007',
            name: 'Gloria Adams',
            birth: '1989-03-17',
            gender: 'Female'
        },
        {
            id: '008',
            name: 'Henry Miller',
            birth: '1993-08-25',
            gender: 'Male'
        },
        {
            id: '009',
            name: 'Ivy Wilson',
            birth: '1991-05-29',
            gender: 'Female'
        },
        {
            id: '010',
            name: 'Jack Brown',
            birth: '1986-12-16',
            gender: 'Male'
        }
      ]
    }
  },
  mounted() {
    // 鼠标左键点击
    window.addEventListener('click', this.rightClickClose)
    // 鼠标滚轮
    window.addEventListener('wheel', this.rightClickClose)
  },
  methods: {
    rightClick(e,item){//展示右键菜单
      // console.log(e.clientY,window.innerHeight,window.innerWidth-e.clientX)
      this.isRightClickMenuShow=true
      this.rightClickMenu={
        x:`${window.innerWidth-e.clientX<=200?e.clientX-160:e.clientX}px`,
        y:`${window.innerHeight-e.clientY<=120?e.clientY-100:e.clientY}px`
      }
      console.log(item)
    },
    rightClickClose(){//关闭右键菜单
      this.isRightClickMenuShow=false
      this.rightClickMenu={
        x:`0px`,
        y:`0px`
      }
      this.nowRightClickChose=null
    },
  },
}
</script>

<style scoped>
.box-style{
  background: #fff;
  border-radius: 20px;
  box-shadow: 5px 2px 12px 1px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 6px;
}

td {
  padding: 10px;
  /* background: #fff; */
}

tr {
  border-radius: 12px;
  transition: 0.2s ease;
  overflow: hidden;
  &:hover{
    box-shadow: 5px 2px 12px 1px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  &:active{
    /* box-shadow: inset 2px 2px 12px 1px rgba(0, 0, 0, 0.1); */
    background: #efefef;
    box-shadow:none;
  }
}

thead{
  position: sticky;
  font-weight: bold;
  background: #ffffff50;
  backdrop-filter: blur(8px);
  box-shadow: 5px 2px 12px 1px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  top: 15px;
}

thead tr{
  &:hover{
    box-shadow: none;
    cursor:auto;
  }
  &:active{
    background: none;
  }
}

tr td:first-child {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

tr td:last-child {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
}

.right-click-menu{
  background: #ffffff57;
  backdrop-filter: blur(6px);
  border-radius: 15px;
  box-shadow: 5px 2px 12px 1px rgba(0, 0, 0, 0.1);
  padding: 5px;
  width: 200px;
  .right-click-menu-item{
    padding: 8px;
    padding-left: 12px;
    margin: 4px;
    border-radius: 15px;
    transition: 0.2s ease;
    &:hover{
      cursor: pointer;
      box-shadow: 5px 2px 12px 1px rgba(0, 0, 0, 0.1);
    }
    &:active{
      box-shadow: inset 2px 2px 12px 1px rgba(0, 0, 0, 0.1);
      /* background: #0d6dfd10;
      &:last-child{
        background: #ff000010;
      } */
    }
  }
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

.edit-el-pagination{
  position: sticky;
  bottom: 0;
  transition: 0.2s ease;
  display: flex;
  justify-content: end;
  padding-right: 10px;
  .el-pagination{
    padding: 5px;
    background: #ffffff50;
    backdrop-filter: blur(8px);
    box-shadow: 5px 2px 12px 1px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }
  .number{
    transition: 0.2s ease;
    border-radius: 10px;
    color: #434343;
    background: #ffffff00 !important;
    margin: 0 5px !important;
    &:hover{
      box-shadow: 5px 2px 12px 1px rgba(0, 0, 0, 0.1);
      color: #434343;
    }
    &:active{
      box-shadow: inset 2px 2px 12px 1px rgba(0, 0, 0, 0.1);
    }
  }
  button{
    transition: 0.2s ease;
    border-radius: 10px;
    background: #ffffff00 !important;
    margin: 0 5px !important;
    &:hover{
      box-shadow: 5px 2px 12px 1px rgba(0, 0, 0, 0.1);
      color: #0d6dfd;
    }
    &:active{
      box-shadow: inset 2px 2px 12px 1px rgba(0, 0, 0, 0.1);
    }
  }
  .is-active{
    background: #fff !important;
    border-radius: 10px;
  }
}
</style>