// 给主页添加scroll事件的监听器
window.onload = function () {
    if (window.location.pathname == "/") {
        // 在封面图上隐藏
        document.getElementById("live2d-widget").style.bottom = "-400px";
        window.addEventListener("scroll", function () {
            // 获取当前滚动条的位置
            var scrollPos = window.scrollY;
            // 随着滚动条下移live2d
            if (scrollPos >= 400) {
                // 如果滚动条位置大于等于400显示live2d
                document.getElementById("live2d-widget").style.bottom = "0px";
            } else {
                // 如果滚动条位置小于400隐藏live2d
                document.getElementById("live2d-widget").style.bottom = scrollPos - 400 + "px";
            }
        });
    }
    document.getElementById("live2d-widget").style.opacity = 1;

    // 监听窗口大小变化事件
    window.addEventListener("resize", function () {
        var width = window.innerWidth;

        // 如果页面宽度小于1650px，隐藏元素
        if (width < 1650) {
            document.getElementById("live2d-widget").style.display = "none";
        } else {
            // 否则，显示元素
            document.getElementById("live2d-widget").style.display = "block";
        }
    });
}