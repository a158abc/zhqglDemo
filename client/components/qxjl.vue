<template>
    <div id="qxjlpage">
        <div data-role="header">
            <h1>肇庆综合管廊系统Demo</h1>
            <div data-role="navbar">
                <ul>
                    <li><a href="#" class="ui-btn-active ui-state-persist"  data-icon="home">缺陷管理</a></li>
                    <li><a href="#xsjlpage"  data-icon="arrow-r">巡视管理</a></li>
                </ul>
            </div>
        </div>
        <div class="col-sm-12">
            <label style="margin-top: 1rem;color: gray;"  >添加缺陷信息</label>
        </div>
        <!-- 添加缺陷 -->
        <div style="margin: 1rem;background-color: #fff;">
            <form class="form-horizontal" role="form" >
                <label class="col-sm-2 control-label">线路名称：</label>
                <div class="col-sm-10">
                    <input class="form-control" type="text"  v-model="newqxjl.xlmc" >
                </div>
                <label class="col-sm-2 control-label">电压等级：</label>
                <div class="col-sm-10">
                    <select class="combobox" v-model="newqxjl.dydj">
                        <option value="500kV">500kV</option>
                        <option value="220kV">220kV</option>
                    </select>
                </div>
                <label class="col-sm-2 control-label">缺陷类别：</label>
                <div class="col-sm-10">
                    <select class="combobox" v-model="newqxjl.qxlb">
                        <option value="严重" selected="selected">严重</option>
                        <option value="危急">危急</option>
                        <option value="一般">一般</option>
                    </select>
                </div>
                <label class="col-sm-2 control-label">上报时间：</label>
                <div class="col-sm-10">
                    <input class="form-control" type="date"  v-model="newqxjl.sbrq" >
                </div>
                <label class="col-sm-2 control-label">发现人：</label>
                <div class="col-sm-10">
                    <input class="form-control" type="text"  v-model="newqxjl.fxr" >
                </div>
                <label class="col-sm-2 control-label">缺陷内容：</label>
                <div class="col-sm-10">
                    <input class="form-control" type="text"  v-model="newqxjl.qxnr" >
                </div>
                <label class="col-sm-2 control-label">缺陷附件：</label>
                <div class="col-sm-10">
                    <input class="form-control" type="text"  v-model="newqxjl.qxfj" >
                </div>
                <label class="col-sm-2 control-label">处理情况：</label>
                <div class="col-sm-10">
                    <input class="form-control" type="text"  v-model="newqxjl.clqk" >
                </div>
                <label class="col-sm-2 control-label">处理人员：</label>
                <div class="col-sm-10">
                    <input class="form-control" type="text"  v-model="newqxjl.clry" >
                </div>
                <label class="col-sm-2 control-label">处理日期：</label>
                <div class="col-sm-10">
                    <input class="form-control" type="date"  v-model="newqxjl.clrq" >
                </div>
                <label class="col-sm-2 control-label">遗留问题：</label>
                <div class="col-sm-10">
                    <input class="form-control" type="text"  v-model="newqxjl.ylwt" >
                </div>
                <label class="col-sm-2 control-label">验收人员：</label>
                <div class="col-sm-10">
                    <input class="form-control" type="text"  v-model="newqxjl.ysry" >
                </div>
                <label class="col-sm-2 control-label">填表人：</label>
                <div class="col-sm-10">
                    <input class="form-control" type="text"  v-model="newqxjl.tbr" >
                </div>
            </form>
            <div class="form-group">
                <button class="btn btn-primary" type="button"  @click="addqxjl()">添加缺陷记录</button>
            </div>
        </div>
        <label style="margin-top: 1rem;color: gray" class="col-sm-12" >查询</label>
        <!-- 查询 -->
        <form class="form-horizontal" role="form">
            <label class="col-sm-2 control-label">线路名称：</label>
            <div class="col-sm-10">
                <input class="form-control" type="text" v-model="searchqxjl.xlmc">
            </div>
            <label class="col-sm-2 control-label">电压等级：</label>
            <div class="col-sm-4">
                <select class="combobox" v-model="searchqxjl.dydj">
                    <option value="">全部</option>
                    <option value="500kV">500kV</option>
                    <option value="220kV">220kV</option>
                </select>
            </div>
            <label class="col-sm-2 control-label">缺陷类别：</label>
            <div class="col-sm-4">
                <select class="combobox" v-model="searchqxjl.qxlb">
                    <option value="">全部</option>
                    <option value="严重" >严重</option>
                    <option value="危急">危急</option>
                    <option value="一般">一般</option>
                </select>
            </div>
            <label class="col-sm-2 control-label">上报时间：</label>
            <div class="col-sm-10">
                <input class="form-control" type="date" v-model="searchqxjl.sbsj">
            </div>
            <label class="col-sm-2 control-label">处理情况：</label>
            <div class="col-sm-8">
                <input class="form-control" type="text" v-model="searchqxjl.clqk">
            </div>
            <div class="col-sm-2">
                <button class="btn btn-primary" type="button" @click="searchqx">查询</button>
            </div>
        </form>
        <label style="margin-top: 1rem;color: gray;" class="col-sm-12" >查询结果</label>
        <div class="ui-content table-responsive">
            <table class="table table-bordered">
                <thead>
                <tr>
                    <td>线路名称</td>
                    <td>电压等级</td>
                    <td>缺陷类别</td>
                    <td>上报时间</td>
                    <td>发现人</td>
                    <td>缺陷内容</td>
                    <td>缺陷附件</td>
                    <td>处理情况</td>
                    <td>处理人员</td>
                    <td>处理日期</td>
                    <td>遗留问题</td>
                    <td>验收人员</td>
                    <td>填表人</td>
                    <td>操作</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(qxjl,index) in qxjls" @click="clickQxjlGridItem(qxjl)">
                    <td>{{qxjl.xlmc}}</td>
                    <td>{{qxjl.dydj}}</td>
                    <td>{{qxjl.qxlb}}</td>
                    <td>{{qxjl.sbrq}}</td>
                    <td>{{qxjl.fxr}}</td>
                    <td>{{qxjl.qxnr}}</td>
                    <td>{{qxjl.qxfj}}</td>
                    <td>{{qxjl.clqk}}</td>
                    <td>{{qxjl.clry}}</td>
                    <td>{{qxjl.clrq}}</td>
                    <td>{{qxjl.ylwt}}</td>
                    <td>{{qxjl.ysry}}</td>
                    <td>{{qxjl.tbr}}</td>
                    <td><button @click="deleteqxjl(qxjl)">删除</button></td>
                </tr>
                <tr>
                    <td class="text-center text-muted" colspan="14" v-show="qxjls.length==0">
                        暂无数据...
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

    export default {
        data(){
            return{
                qxjls:[],
                newqxjl:{xlmc:"",dydj:"500kV",qxlb:"一般",sbrq:"",fxr:"",qxnr:"",qxfj:"",clqk:"",clry:"",clrq:""
                    ,ylwt:"",ysry:"",tbr:""},
                searchqxjl:{xlmc:"",dydj:"500kV",qxlb:"一般",sbsj:"",clqk:""}
            }
        },
        methods:{
            getqxjl:function(){
                this.$http.get('queryqxjl',{}).then(function(res){
                    this.qxjls = res.body;
                    //console.log(JSON.stringify(res))
                },function(){
                    console.log('请求失败处理');   //失败处理
                });
            },
            searchqx:function () {
                this.$http.post('searchqx',this.searchqxjl).then(function(res){
                    this.qxjls = res.body;
                    //console.log(JSON.stringify(res))
                },function(){
                    console.log('请求失败处理');   //失败处理
                });
            },
            addqxjl:function(){
                if(this.newqxjl.xlmc===""){
                    alert("线路名称不能为空");
                    return;
                }
                if(this.newqxjl.sbrq===""||this.newqxjl.clrq===""){
                    alert("时间日期不能为空");
                    return;
                }
                this.$http.post('addqxjl',this.newqxjl).then(function(res){
                    this.qxjls = res.body;
                    this.getqxjl();
                },function(){
                    console.log('请求失败处理');   //失败处理
                });
                // this.qxjls.unshift(this.newqxjl);
                this.newqxjl = {xlmc:"",dydj:"500kV",qxlb:"",sbrq:"",fxr:"",qxnr:"",qxfj:"",clqk:"",clry:"",clrq:""
                    ,ylwt:"",ysry:"",tbr:""};
            },
            modifyqxjl:function () {
                this.$http.post('modqxjl',this.newqxjl).then(function(res){
                    this.qxjls = res.body;
                    this.getqxjl();
                },function(){
                    console.log('请求失败处理');   //失败处理
                });
            },
            deleteqxjl:function(qxjl){
                this.$http.post('deleteqxjl',{id:qxjl.id}).then(function(res){
                    this.qxjls = res.body;
                    this.getqxjl();
                },function(){
                    console.log('请求失败处理');   //失败处理
                });
            },
            clickQxjlGridItem:function(qxjl){
                this.newqxjl = qxjl;
                //  document.getElementById("oddNum").parent().find("tr.focus").toggleClass("focus");//取消原先选中行
                //   $(this).toggleClass("focus");//设定当前行为选中行
            }
        }
    }

    //vue.getqxjl();
</script>
