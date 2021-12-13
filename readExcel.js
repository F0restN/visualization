const fs = require('fs'); //文件模块
const path = require('path'); //系统路径模块
const xlsx = require('node-xlsx');

let data = {
    "code":0,
    "nodes": [],
    "links": [],
    "categories": []
};
let sheets = xlsx.parse('/Users/drakezhou/WebstormProjects/Visulization/files/referenceInfo.xls');

let year = 1978;
let x = -10;
let flag = 1;
let sign = -1;
let count = 1;
for (let row of sheets[0]['data']){
    let id = row[0];
    let title = row[2];
    let currentYear = row[4];

    let nodeObj = {
        "id": `${id}`,
        "name": `${title}`,
        "symbolSize": 20,
        "x": x,
        "y": 580-((2021-year)*10),
        "value": 15,
        "category": 0
    }
    data.nodes.push(nodeObj);

    count ++;
    if (count%2 === 1){
        x = (x * -1) + 10;
    } else {
        x = x * -1
    }

}

//把data对象转换为json格式字符串
var content = JSON.stringify(data);

//指定创建目录及文件名称，__dirname为执行当前js文件的目录
var file = path.join(__dirname, 'test.json');

//写入文件
fs.writeFile(file, content, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log('文件创建成功，地址：' + file);
});