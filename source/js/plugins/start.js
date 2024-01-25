// 给主页添加scroll事件的监听器

window.onload = function () {
    window.mikoto = document.getElementById("live2d-widget");

    window.mikoto.style.opacity = 1;
    if (window.location.pathname == "/") {
        // 在封面图上隐藏
        window.mikoto.style.bottom = "-400px";
        window.addEventListener("scroll", function () {
            // 获取当前滚动条的位置
            var scrollPos = window.scrollY;
            // 随着滚动条下移live2d
            if (scrollPos >= 400) {
                // 如果滚动条位置大于等于400的位置显示live2d
                window.mikoto.style.bottom = "0px";
            } else {
                // 如果滚动条位置小于400隐藏live2d
                window.mikoto.style.bottom = scrollPos - 400 + "px";
            }
        });
    }

    //窗口小于1650不显示mikoto
    displayLive2d(1650);
    // 监听窗口大小变化事件
    window.addEventListener("resize", function () {
        displayLive2d(1650);
    });
}

function displayLive2d(width) {
    //是否小于指定窗口大小
    if (window.innerWidth < width) {
        window.mikoto.style.display = "none";
    } else {
        // 否则，显示元素
        window.mikoto.style.display = "block";
    }
}