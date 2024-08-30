<template>
    <div class="setting">
        <div class="box-style p-2 pt-3 pb-3 h-100">
            <div>
                <div class="pe-2" style="width: 200px;border-right: 1px solid #efefef;height: 100%;max-height: 100%;overflow: auto;">
                    <div class="m-2" v-for="item in options" :key="item.id">
                        <div class="active-btn" :class="activeOption===item.key?'is-active':''" @click="choseMenu(1,item,null)">{{ item.title }}</div>
                        <div class="left-menu-child" v-if="item.children" :style="{'display':activeOption===item.key?'block':'none'}">
                            <div class="active-btn" :class="activeOptionChildren===itemx.key?'is-active':''" @click="choseMenu(2,item,itemx)" v-for="itemx in item.children">
                                {{ itemx.title }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ps-2" style="flex-grow: 1;max-height: 100%;overflow: auto">
                <div v-if="activeOption==='basic'">
                    基础
                </div>
                <div v-if="activeOption==='datas'">
                    <div class="menu-tag">
                        <div style="flex-grow: 1;">接口地址</div>
                        <div style="flex-grow: 3;display: flex;flex-direction: row;align-items: center;">
                            <el-input size="large" v-model="config.api" placeholder="请输入请求地址"></el-input>
                            <el-popover title="提示">
                                <template #reference>
                                    <el-icon class="ms-2" color="#646464"><InfoFilled /></el-icon>
                                </template>
                                <span> 请求地址应同步前端部署，确认是启用了https </span>
                            </el-popover>
                        </div>
                    </div>

                    <div class="menu-tag">
                        <div style="flex-grow: 1;">数据来源区域</div>
                        <div style="flex-grow: 3;display: flex;flex-direction: row;align-items: center;justify-content: end;">
                            <el-radio-group v-model="config.map.type">
                                <el-radio value="province" size="large">省份</el-radio>
                                <el-radio value="city" size="large">城市</el-radio>
                            </el-radio-group>
                            <el-select class="ms-4" v-if="config.map.type==='city'" v-model="config.map.city" placeholder="Select" size="large" style="width: 240px">
                                <el-option v-for="item in cityData" :key="item.properties.adcode" :label="item.properties.name" :value="item.properties.adcode"/>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div v-if="activeOption==='others'">
                    其他
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import '@/assets/css/active-btn.css'
import { RDBSource } from 'district-data'

export default{
	data(){
		return{
            // options:[
            //     {
            //         title:'基础',
            //         key:'basic',
            //         children:[
            //             {
            //                 title:'后端服务器',
            //                 key:'backendServer',
            //             }
            //         ]
            //     },
            //     {
            //         title:'其他',
            //         key:'others',
            //         children:[
            //             {
            //                 title:'其他1',
            //                 key:'oth1.1',
            //             }
            //         ]
            //     }
            // ],
            options:[
                {
                    title:'基础',
                    key:'basic',
                },
                {
                    title:'数据源',
                    key:'datas',
                },
                {
                    title:'其他',
                    key:'others',
                }
            ],
            activeOption:'basic',
            activeOptionChildren:'',
            mapSourse:null,
            cityData:null,
            config:{
                api:'',
                map:{
                    type:'province',
                    city:420100
                }
            }
		}
	},
    mounted(){
        this.mapSourse = new RDBSource({
            version: 2024,
            type: 'gcj02',
        })

        // this.mapSourse.getChildrenData({
        //     parentAdcode:420000,
        //     parentLevel:'province',
        //     childrenLevel:'province'
        // })

        // 获取湖北省所有的市
        const query = {
            parentAdcode:420000,
            parentLevel:'province',
            childrenLevel:'city'
        }
        this.mapSourse.getChildrenData(query)
            .then(res=>{
                this.cityData=res.features
                console.log(this.cityData)
            })
    },
    methods:{
        choseMenu(index,item,itemx){
            // console.log(index,item,itemx)
            this.activeOption=item.key
            this.activeOptionChildren=index===2?itemx.key:''
        }
    }
}
</script>

<style scoped>
.setting{
    height: 100%;
    .box-style{
        background: #fff;
        border-radius: 20px;
        box-shadow: 5px 2px 12px 1px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-between;
    }
    .left-menu-child{
        margin-left: 10px;
    }
    .active-btn{
        margin: 2px;
    }
    .menu-tag{
        display: flex;
        padding: 10px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #efefef;
    }
}
</style>

<style>
.el-popover.el-popper{
    border: none;
    border-radius: 10px;
}
.el-popper.is-light, .el-popper.is-light .el-popper__arrow:before{
    background: #ffffff6b;
	backdrop-filter: blur(10px);
    box-shadow: 5px 5px 12px 1px rgba(0, 0, 0, 0.1);
}
.el-popper.is-light, .el-popper.is-light .el-popper__arrow:before{
    background: #ffffff6b;
}
.el-popper,.el-popper .el-popper__arrow:before{
    border: none;
}
</style>