---
title: JS更改选中文本样式
tags:
  - 记录
  - JavaScript
categories:
  - 记录
  - JavaScript
copyright: false
abbrlink: 1338592505
date: 2023-10-10 16:53:41
updated: 2023-10-10 16:53:41
cover: /posts/2023/1338592505/js封面.png
---
# 方法

```JavaScript
$('p').mouseup(function(){
    var s=window.getSelection();
    s=s.toString();
    s=s.replace(/([\'\"\<\>\[\]\/\?\.\*\+\^\$\!])/g,'\\$1');
    var reg=new RegExp(s);
    console.log(reg);
    var h=$(this).html();
    if(reg.test(h)){
        var reg1=new RegExp('^(.*?)('+s+')(.*?)$');
        $(this).html(h.replace(reg1,'$1<em>$2</em>$3'));
        console.log(reg1);
    }
});
```
![](./JS更改选中文本样式/鼠标选中更改文本样式.png)

# 来源

​转自百度知道大佬：[tsotsi](https://zhidao.baidu.com/usercenter?uid=56de4069236f25705e798e07&role=ugc)

![](./JS更改选中文本样式/来源.png)

