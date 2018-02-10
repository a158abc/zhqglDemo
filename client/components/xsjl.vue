<template>
    <div data-role="page" id="xsjlpage">
        <label style="margin-top: 1rem;color: gray" class="col-sm-12" >添加巡视信息</label>
        <div style="margin: 1rem;">
            <form class="form-horizontal" role="form">
                <label class="col-sm-2 control-label">巡视区域：</label>
                <div class="col-sm-10">
                    <input class="form-control" type="text"  v-model="newxsjl.xsqy" >
                </div>
                <label class="col-sm-2 control-label">发现问题：</label>
                <div class="col-sm-10">
                    <input class="form-control" type="text"  v-model="newxsjl.fxwt" >
                </div>
                <label class="col-sm-2 control-label">处理意见：</label>
                <div class="col-sm-10">
                    <input class="form-control" type="text"  v-model="newxsjl.clyj" >
                </div>
                <label class="col-sm-2 control-label">巡视日期：</label>
                <div class="col-sm-10">
                    <input class="form-control" type="date"  v-model="newxsjl.xsrq" >
                </div>
                <label class="col-sm-2 control-label">巡查人：</label>
                <div class="col-sm-10">
                    <input class="form-control" type="text"  v-model="newxsjl.xcr" >
                </div>
            </form>
            <div class="form-group">
                <button class="btn btn-primary" type="button"  @click="addqxjl()">添加缺陷记录</button>
            </div>
        </div>
        <label style="margin-top: 1rem;color: gray" class="col-sm-12" >查询</label>
        <form class="form-horizontal" role="form">
            <label class="col-sm-2 control-label">巡视区域：</label>
            <div class="col-sm-10">
                <input class="form-control" type="text" v-model="searchxs.xsqy">
            </div>
            <label class="col-sm-2 control-label">巡查时间：</label>
            <div class="col-sm-10">
                <input class="form-control" type="date" v-model="searchxs.xsrq">
            </div>
            <label class="col-sm-2 control-label">巡视人：</label>
            <div class="col-sm-8">
                <input class="form-control" type="text" v-model="searchxs.xcr">
            </div>
            <div class="col-sm-2">
                <button class="btn btn-primary" type="button" @click="searchXsjl">查询</button>
            </div>
        </form>
        <label style="margin-top: 1rem;color: gray;" class="col-sm-12" >查询结果</label>
        <div class="ui-content table-responsive">
            <table class="table table-bordered">
                <thead>
                <tr class="text-center">
                    <td>巡视区域</td>
                    <td>发现问题</td>
                    <td>处理意见</td>
                    <td>巡视日期</td>
                    <td>巡查人</td>
                    <td>操作</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(xsjl,index) in xsjls" @click="clickXsjlGridItem(xsjl)" class="text-center">
                    <td>{{xsjl.xsqy}}</td>
                    <td>{{xsjl.fxwt}}</td>
                    <td>{{xsjl.clyj}}</td>
                    <td>{{xsjl.xsrq}}</td>
                    <td>{{xsjl.xcr}}</td> <!--@click="deleteXsjl(xsjl)" -->
                    <td><button  data-toggle="modal" data-target="#layerxs">删除</button></td>
                </tr>
                <tr>
                    <td class="text-center text-muted" colspan="14" v-show="xsjls.length==0">
                        暂无数据...
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <!-- 弹出 模态框-->
        <div role="dialog" class="modal fade" id="layerxs">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">确认删除？</h4>
                    </div>
                    <div class="modal-body text-right">
                        <button class="btn btn-primary btn-sm" data-dismiss="modal">取消</button>
                        <button class="btn btn-danger btn-sm" data-dismiss="modal">确定</button>
                    </div>
                </div>
            </div>
         </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                xsjls:[],
                newxsjl:{xsqy:"",fxwt:"",clyj:"",xsrq:"",xcr:""},
                searchxs:{xsqy:"",xsrq:"",xcr:""}
            }
        },
        methods:{
            getXsjl:function(){
                this.$http.get("queryXsjl",{}).then(function(res){
                    this.xsjls = res.body;
                },function(){
                    console.log('请求失败处理');   //失败处理
                });
            },
            searchXsjl:function(){
                this.$http.post("searchXs",this.searchxs).then(function(res){
                    this.xsjls = res.body;
                },function(){
                    console.log('请求失败处理');   //失败处理
                });
            },
            addXsjl:function(){
                if(this.newxsjl.xsqy===""){
                    alert("巡视区域不能为空");
                    return;
                }
                if(this.newxsjl.xsrq===""){
                    alert("时间日期不能为空");
                    return;
                }
                this.$http.post("addXsjl",this.newxsjl).then(function(res){
                    //this.xsjls = res.body;
                    this.getXsjl();
                },function(){
                    console.log('请求失败处理');   //失败处理
                });
                // this.qxjls.unshift(this.newqxjl);
                this.newxsjl = {xsqy:"",fxwt:"",clyj:"",xsrq:"",xcr:""};
            },
            modifyXsjl:function () {
                this.$http.post("modXsjl",this.newxsjl).then(function(res){
                    // this.qxjls = res.body;
                    this.getXsjl();
                },function(){
                    console.log('请求失败处理');   //失败处理
                });
            },
            deleteXsjl:function(xsjl){
                this.$http.post("deleteXsjl",{id:xsjl.id}).then(function(res){
                    //this.qxjls = res.body;
                    this.getXsjl();
                },function(){
                    console.log('请求失败处理');   //失败处理
                });
            },
            clickXsjlGridItem:function(xsjl){
                console.log(xsjl);
                this.newxsjl = xsjl;
                //  document.getElementById("oddNum").parent().find("tr.focus").toggleClass("focus");//取消原先选中行
                //   $(this).toggleClass("focus");//设定当前行为选中行
            }
        }
    }
</script>
