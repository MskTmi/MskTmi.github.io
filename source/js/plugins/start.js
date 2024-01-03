// 给主页添加scroll事件的监听器
if (window.location.pathname == "/") {
    window.addEventListener("scroll", function () {
        // 获取当前滚动条的位置
        var scrollPos = window.scrollY;
        // 判断是否满足显示或隐藏的条件
        if (scrollPos >= 400) {
            // 如果滚动条位置大于等于400显示live2d
            document.getElementById("live2d-widget").style.display = "block";
        } else {
            // 如果滚动条位置小于400隐藏live2d
            document.getElementById("live2d-widget").style.display = "none";
        }
    });
}