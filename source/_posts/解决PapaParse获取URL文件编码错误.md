---
title: 解决PapaParse获取URL文件编码错误
date: 2023-10-12 17:21:30
updated: 2023-10-12 17:21:30
tags:
  - 记录
  - JavaScript
  - PapaParse
categories:
  - 记录
  - JavaScript
  - PapaParse
cover: ./解决PapaParse获取URL文件编码错误/封面.png
---
​
`PapaParse` 这个插件虽说强大，可以快速将CSV文件转为JSON格式来渲染表格，但是某些地方真的让人很难受，比如它自带的encoding配置只能对通过input上传的本地文件起作用，而通过URL远程取到的文件不支持...

# 解决方案

先用 `XMLHttpRequest()` 获取到文件，然后设置 `FileReader()` 改变文件的编码，最后使用PapaParse直接解析。

要改变文件编码得先知道文件类型，这里给出我的两个解决方案，任选其一即可

## 使用`jschardet` 插件解决
```JavaScript
//解析文件类型
function checkEncoding(path) {                        //path是文件的路径
    return new Promise(function (resolve) {           //使用Promise对象避免出现同异步问题
        $.get(path, function (data, status) {
            if (status == 'success') {
                var encoding = jschardet.detect(data);
                encoding = encoding.encoding;
                if (encoding === 'windows-1252') {    //这边根据自己的配置更改即可
                    encoding = 'GB2312';
                } else if (encoding === 'ascii') {
                    encoding = 'UTF-8';
                }
                resolve(encoding);                    //最后返回文件编码类型
            }
        });
    });
}
```
> 好处是在前端就能应对大多数情况，但有些文件会识别失败...

## 在后端用 C# 解决：
```c#
using System;
using System.IO;
using System.Text;
using System.Web;

public class CheckEncoding : IHttpHandler {

    public void ProcessRequest(HttpContext context) {
        context.Response.ContentType = "text/plain";
        var path = context.Request["path"];
        try {
            string ReadPath = HttpContext.Current.Server.MapPath("~/" + path + "");
            byte[] bom = File.ReadAllBytes(ReadPath);
            var encoding = GetBytesEncoding(bom);
            context.Response.Write(encoding.BodyName);
        } catch (Exception e) {
            context.Response.Write("{\"fail\":\"" + e + "\"}");
        }
    }

    public static Encoding GetBytesEncoding(byte[] bs) {
        int len = bs.Length;
        if (len >= 3 && bs[0] == 0xEF && bs[1] == 0xBB && bs[2] == 0xBF) {
            return Encoding.GetEncoding("gbk");
        }
        int[] cs = { 7, 5, 4, 3, 2, 1, 0, 6, 14, 30, 62, 126 };
        for (int i = 0; i < len; i++) {
            int bits = -1;
            for (int j = 0; j < 6; j++) {
                if (bs[i] >> cs[j] == cs[j + 6]) {
                    bits = j;
                    break;
                }
            }
            if (bits == -1) {
                return Encoding.GetEncoding("gbk");
            }
            while (bits-- > 0) {
                i++;
                if (i == len || bs[i] >> 6 != 2) {
                    return Encoding.GetEncoding("gbk");
                }
            }
        }
        return Encoding.UTF8;
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}
```
> 完美解决

gb2312加utf-8格式就能解决我这边绝大多数的中文编码问题，在无BOM码的情况下只判断是否为utf-8还是相对容易点的

## 成功解决
解析CSV文件，将其转为JSON
```JavaScript
//解析CSV
function parseCSV(path, encoding) {                   //（路径，编码类型）
    return new Promise(function (resolve) {           //同样使用Promise()防止异步问题
        //通过ajax请求到文件
        let request = new XMLHttpRequest();
        request.open('GET', path, true);              //目标url
        request.responseType = 'blob';
        request.onload = () => {
            let file = request.response;
            let reader = new FileReader();
            reader.readAsText(file, encoding);        //编码
            reader.onload = () => {
                Papa.parse(reader.result, {           //主角登场（配角太抢戏了...
                    complete: function (results) {
                        resolve(results.data);
                    }
                });
            }
        }
        request.send();
    })
}
```
小小的demo：
```JavaScript
async function main(path){   //（路径）  //await 需要在async中使用
    //获取文件格式
    let encoding = await checkEncoding(path);
    //获取标准答案
    let criteriaAnswer = await parseCSV(path, encoding);
    //渲染表格
    paintingTable(criteriaAnswer,"teacherPaperAnswer"); //用id定位渲染目标
}
```

## JSON文件渲染CSV表格
```JavaScript
//渲染表格
function paintingTable(File, location) {
    $("#" + location + "").empty();
    let table = '<table class="table table-bordered" style="zoom:0.8";>';
    for (let j = 0; j < File.length; j++) {
        if (j == 0) {
            table += '<thead><tr style="white-space: nowrap;"><th scope="col">#</th>';
            for (let k in File[j]) {
                table += '<th scope="col">' + k + '</th>';
            }
            table += '</tr></thead><tbody style="white-space: pre;">';
        }
        table += '<tr><th scope="row" style="vertical-align: middle;">' + Number(j + 1) + '</th>';
        for (let k in File[j]) {
            table += '<td style="vertical-align: middle; padding:0 20px; border: inset;background:#FFFFFF;"><div style="text-align:left;">' + File[j][k] + '</div></td>';
        }
        table += '</tr>';
    }
    table += '</tbody>';
    $("#" + location + "").append(table);
}
```
> 最后赠送一个JSON文件渲染CSV表格
