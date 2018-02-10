 let mysql = require("mysql");
//let Client = require("easymysql");
let http = require('http');
let express = require('express');
let app = module.exports = express();
let bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


let conn = mysql.createConnection({
    host: 'localhost',
    user:"root",
    password:"root",
    port:"3306",
    database : 'zhqgl'
});

conn.connect();
//查询 mysql的方式
app.get('/queryqxjl', function (req, res) {
    let querySql="select * from gl_qxjl";
    conn.query(querySql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        res.send(result);
    });
    //conn.end();
});

// 查询
 app.post('/searchqx', function (req, res) {
     let obj = req.body;
     let xlmc = obj.xlmc;let dydj = obj.dydj; let qxlb = obj.qxlb;let sbsj=obj.sbsj;let clqk = obj.clqk;
     let querySql="select * from gl_qxjl where ";
     if(xlmc.length!==0)
     {
         querySql = querySql+ "xlmc like '%"+xlmc+"%' and ";
     }
     if(dydj.length!==0)
     {
         querySql = querySql+ "dydj like '%"+dydj+"%' and ";
     }
     if(qxlb.length!==0)
     {
         querySql = querySql+ "qxlb like '%"+qxlb+"%' and ";
     }
     if(sbsj.length!==0)
     {
         querySql = querySql+ "sbsj like '%"+sbsj+"%' and ";
     }
     if(clqk.length!==0)
     {
         querySql = querySql+ "clqk like '%"+clqk+"%' ";
     }
     querySql = String(querySql).trim();
     if(String(querySql).lastIndexOf("and") === (querySql.length - 3) )
     {
         querySql = querySql.substring(0, querySql.length - 3)
     }
     if(String(querySql).lastIndexOf("where") === (querySql.length - 5))
     {
         querySql = querySql.substring(0, querySql.length - 5)
     }
     console.log("查询sql："+querySql);
     conn.query(querySql,function (err, result) {
         if(err){
             console.log('[SELECT ERROR] - ',err.message);
             return;
         }
         res.send(result);
     });
 });

//增
app.post('/addqxjl', function (req, res) {
    console.log(JSON.stringify(req.body));
    let obj = req.body;
    let addSql = 'INSERT INTO gl_qxjl(`xlmc`, `dydj`, `qxlb`, `sbrq`, `fxr`, `qxnr`, `clqk`, `clry`, `clrq`, `ylwt`, `ysry`, `tbr`)VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
    let addSqlParams = [obj.xlmc, obj.dydj, obj.qxlb, obj.sbrq, obj.fxr,obj.qxnr, obj.clqk, obj.clry, obj.clrq, obj.ylwt, obj.ysry, obj.tbr];
    conn.query(addSql,addSqlParams,function (err, result) {
         if(err){
             console.log('[SELECT ERROR] - ',err.message);
             return;
         }
         res.send({"msg":"insert success"});
     });
    //conn.end();
});

 //修改
 app.post('/modqxjl', function (req, res) {
     console.log(JSON.stringify(req.body));
     let obj = req.body;
     let modSql = 'UPDATE INTO gl_qxjl set xlmc=?,dydj=?, qxlb=?, sbrq=?, fxr=?, qxnr=?, clqk=?, clry=?, clrq=?, ylwt=?, ysry=?, tbr=?';
     let modSqlParams = [obj.xlmc, obj.dydj, obj.qxlb, obj.sbrq, obj.fxr,obj.qxnr, obj.clqk, obj.clry, obj.clrq, obj.ylwt, obj.ysry, obj.tbr];
     conn.query(addSql,addSqlParams,function (err, result) {
         if(err){
             console.log('[SELECT ERROR] - ',err.message);
             return;
         }
         res.send({"msg":"insert success"});
     });
     //conn.end();
 });

 //删除
 app.post('/deleteqxjl', function (req, res) {
     console.log(JSON.stringify(req.body));
     let delid = req.body.id;
     let delSql = 'DELETE FROM gl_qxjl where id= ' + delid+ '';
     console.log(delSql);
     conn.query(delSql,function (err, result) {
         if(err){
             console.log('[DELETE ERROR] - ',err.message);
             return;
         }
         res.send({"msg":"delete success"});
     });
    // conn.end();
 });

//////////////////////////////////巡视记录///////////////////////////////////////////////////////////

 //查询 mysql的方式
 app.get('/queryXsjl', function (req, res) {
     let querySql="select * from gl_xsjl";
     conn.query(querySql,function (err, result) {
         if(err){
             console.log('[SELECT ERROR] - ',err.message);
             return;
         }
         res.send(result);
     });
 });

 // 查询
 app.post('/searchXs', function (req, res) {
     let obj = req.body;
     let xsqy = obj.xsqy;let xsrq = obj.xsrq; let xcr = obj.xcr;
     let querySql="select * from gl_xsjl where ";
     if(xsqy.length!==0)
     {
         querySql = querySql+ "xsqy like '%"+xsqy+"%' and ";
     }
     if(xsrq.length!==0)
     {
         querySql = querySql+ "xsrq like '%"+xsrq+"%' and ";
     }
     if(xcr.length!==0)
     {
         querySql = querySql+ "xcr like '%"+xcr+"%' and ";
     }
     querySql = String(querySql).trim();
     if(String(querySql).lastIndexOf("and") === (querySql.length - 3))
     {
         querySql = querySql.substring(0, querySql.length - 3)
     }
     if(String(querySql).lastIndexOf("where") === (querySql.length - 5))
     {
         querySql = querySql.substring(0, querySql.length - 5)
     }
     console.log("查询sql："+querySql);
     conn.query(querySql,function (err, result) {
         if(err){
             console.log('[SELECT ERROR] - ',err.message);
             return;
         }
         res.send(result);
     });
 });

 //增
 app.post('/addXsjl', function (req, res) {
     console.log("addxsjl:"+JSON.stringify(req.body));
     let obj = req.body;
     let addSql = 'INSERT INTO gl_xsjl(`xsqy`, `fxwt`, `clyj`, `xcr`, `xssj`)VALUES(?,?,?,?,?)';
     let addSqlParams = [obj.xsqy, obj.fxwt, obj.clyj, obj.xcr, obj.xsrq];
     conn.query(addSql,addSqlParams,function (err, result) {
         if(err){
             console.log('[SELECT ERROR] - ',err.message);
             return;
         }
         res.send({"msg":"insert success"});
     });
 });

 //修改
 app.post('/modXsjl', function (req, res) {
     console.log(JSON.stringify(req.body));
     let obj = req.body;
     let modSql = 'UPDATE INTO gl_xsjl set xsqy=?,fxwt=?,clyj=?,xcr=?,xssj=?';
     let modSqlParams = [obj.xsqy, obj.fxwt, obj.clyj, obj.xcr, obj.xsrq];
     conn.query(addSql,addSqlParams,function (err, result) {
         if(err){
             console.log('[SELECT ERROR] - ',err.message);
             return;
         }
         res.send({"msg":"insert success"});
     });
 });

 //删除
 app.post('/deleteXsjl', function (req, res) {
     console.log(JSON.stringify(req.body));
     let delid = req.body.id;
     let delSql = 'DELETE FROM gl_xsjl where id= ' + delid+ '';
     console.log(delSql);
     conn.query(delSql,function (err, result) {
         if(err){
             console.log('[DELETE ERROR] - ',err.message);
             return;
         }
         res.send({"msg":"delete success"});
     });
 });


///////////////////////////*****************************////////////////////////////////////////

//静态目录
app.use(express.static('./client'));
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});

// 定制404 页面
app.use(function(req, res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});
// 定制500 页面
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

/*
 * Create and start HTTP server.
 */
if (!module.parent) {
    /*
     * This is only done when this module is run directly, e.g. `node .` to allow for the
     * application to be used in tests without binding to a port or file descriptor.
     */
    server = http.createServer(app);
    server.listen(process.env.PORT || 8001);
    server.on('listening', function () {
        console.log('Server listening on http://localhost:%d', this.address().port);
    });

}

