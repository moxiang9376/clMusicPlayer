/* 
dataArr = [
    {
    giftText: rewards[i].name,//抽奖奖品名称
    id: rewards[i].id//抽奖奖品的Id,后台传入
    }
]
*/
//绘制圆盘函数
function drawWheel(dataArr) {
    // vue的TS类型断言
    // var wheelBackImg = new Image()
    return new Promise(function (resolve, reject) {
        //双重promise
        //先缓存图片
        imgonLoad("https://extend.qnssl.xuemei99.com/1012816_20190820100650_373.").then(function (res) {
                var wheelBackImg = res
                var canvas = document.createElement("canvas")
                var w = 658,
                    h = 658;
                canvas.width = w;
                canvas.height = h;
                var ox = w / 2,
                    oy = h / 2; //圆心坐标
                var radius = 274; //扇形半径
                var textRadius = 220 // 绘制文本半径
                var fontSize = 36 - dataArr.length * 2 //转盘奖品文本的字体大小
                console.log(fontSize)
                var ctx = canvas.getContext("2d");
                //绘制背景图片
                ctx.drawImage(wheelBackImg, 0, 0, 658, 658)
                //根据圆盘总共有几个数组元素形成几个扇形区域
                //绘制扇形
                var chance = 1 / dataArr.length;
                var endAngle = 0
                var startAngle = Math.PI * 2 / 4 * 3 - chance * Math.PI * 2 / 2 //从270度剪掉半个扇形区域的弧度开始画扇形,初始指针会指向朝上的扇形的正中间位置
                var tx, ty, textAngle = ""
                ctx.save()
                for (var i = 0; i < dataArr.length; i++) {
                    //绘制扇形区域
                    ctx.save()
                    endAngle = startAngle + chance * Math.PI * 2; //扇形结束角度
                    ctx.beginPath();
                    ctx.moveTo(ox, oy);
                    ctx.arc(ox, oy, radius, startAngle, endAngle, false); //绘制扇形区域
                    //填充颜色
                    // ctx.fillStyle = randomColor()
                    ctx.fillStyle = "#FEE6C3"
                    ctx.fill();
                    //绘制线条
                    ctx.lineWidth = 2
                    ctx.strokeStyle = "#FF8310"
                    ctx.stroke()
                    ctx.closePath()
                    ctx.restore()
                    startAngle = endAngle; //下一个扇形的开始角度设定为当前扇形的结束角度
                }
                ctx.restore()

                var textAngle = Math.PI * 2 / 4 * 3 //初始化转盘奖品名称的坐标，从270deg开始（转盘正上方）
                var tx, ty, rotateAngle = ""
                //绘制奖品名称
                ctx.textAlign = "center"
                ctx.textBaseline = "middle"
                ctx.fillStyle = "#FF6640"
                // var fontSize = 26
                ctx.font = "bold " + fontSize + "px SimHei";

                for (var i = 0; i < dataArr.length; i++) {
                    ctx.save()
                    ctx.beginPath()
                    //计算转盘奖品文本的坐标
                    tx = Math.floor(ox + Math.cos(textAngle) * textRadius)
                    ty = Math.floor(oy + Math.sin(textAngle) * textRadius)
                    console.log(tx + "," + ty)
                    ctx.translate(tx, ty); //移动原点的位置
                    rotateAngle = textAngle + Math.PI / 2; //当前文本的旋转角度textAngle + 垂直角度90
                    ctx.rotate(rotateAngle) //旋转原点

                    //绘制转盘奖品名称
                    var giftText = dataArr[i].giftText
                    var giftTextArr = strSplit(giftText, 7)
                    for (var j = 0; j < giftTextArr.length; j++) {
                        ctx.fillText(giftTextArr[j], 0, fontSize * j)
                    }

                    textAngle = textAngle + chance * Math.PI * 2; //下一个转盘奖品文本的旋转角度
                    ctx.closePath()
                    ctx.restore()
                }
                ctx.clip();
                var shareImg = canvas.toDataURL("image/png", 1);
                resolve(shareImg)
            })
            .catch(function (err) {
                console.log(err)
                reject(err)
            })
    })
}
/* 
roundInfo = {
        rotations: 1, //旋转圈数，不填就转不到一圈
        time: 2, //旋转时间，不填就是3s
        chooseOne: 2 //那一个模块被选中，必填，从0deg开始算第一个,
        className://string,需要转动的类名名称，例子：class="price_wheel",calssName:"price_wheel"
    }
*/
//圆盘转动动画生成函数
function roundCartoon(roundInfo, dataArr) {
    return new Promise(function (resolve, reject) {
        if (roundInfo.rotations == undefined) {
            roundInfo.rotations = Number(1)
        }
        if (roundInfo.time == undefined) {
            roundInfo.time = 1
        }
        var chance = 1 / dataArr.length * 360
        var roundDeg = 360 - (roundInfo.chooseOne - 1) * chance //旋转到第几个扇形区域的正中间
        // 创建css3动画
        var runkeyframes =
            "@keyframes round {100% {-webkit-transform: rotate(" +
            roundDeg +
            "deg)}}";
        console.log(runkeyframes)
        // 创建style标签
        var style = document.createElement("style");
        // 设置style属性
        style.type = "text/css";
        // 将 keyframes样式写入style内
        style.innerHTML = runkeyframes;
        // 将style样式存放到head标签
        document.getElementsByTagName("head")[0].appendChild(style);
        // that.$refs.price_wheel.style.background = "red"
        // 插入动画
        var anim = "round " + roundInfo.time + "s ease-out"
        // var anim = "round  ease-in-out "
        document.getElementsByClassName(roundInfo.className)[0].style.animation = anim;
        document.getElementsByClassName(roundInfo.className)[0].style.animationFillMode = "forwards";
        var info = dataArr[roundInfo.chooseOne - 1].giftText

        var res = {
            roundInfo: roundInfo,
            info: info
        }
        resolve(res)
    })

}

//圆盘选中动画
function chooseCartoon(roundInfo, dataArr) {
    return new Promise(function (resolve, reject) {
        if (roundInfo.rotations == undefined) {
            roundInfo.rotations = Number(0)
        }
        if (roundInfo.time == undefined) {
            roundInfo.time = 3
        }
        var chance = 1 / dataArr.length * 360
        var roundDeg = roundInfo.rotations * 360 + (roundInfo.chooseOne - 1) * chance //旋转到第几个扇形区域的正中间
        console.log(roundDeg)

        // 创建css3动画
        // var runkeyframes =
        //     "@keyframes round {100% {-webkit-transform: rotate(" +
        //     roundDeg +
        //     "deg)}}";
        // 创建停留样式

        // // 创建style标签
        // var style = document.createElement("style");
        // // 设置style属性
        // style.type = "text/css";
        // // 将 keyframes样式写入style内
        // style.innerHTML = runkeyframes;
        // 将style样式存放到head标签
        // document.getElementsByTagName("head")[0].appendChild(style);
        // var stop = "rotate(" + roundDeg + "deg);"
        document.getElementsByClassName(roundInfo.className)[0].style.transform = "rotate(" + roundDeg + "deg)"

        // that.$refs.price_wheel.style.background = "red"
        // // 插入动画
        // var anim = "round " + roundInfo.time + "s linear infinite"
        // // var anim = "round  ease-in-out "
        // document.getElementsByClassName(roundInfo.className)[0].style.animation = anim;
        // document.getElementsByClassName(roundInfo.className)[0].style.animationFillMode = "forwards";
        var info = dataArr[roundInfo.chooseOne - 1].giftText

        var res = {
            roundInfo: roundInfo,
            info: info
        }
        resolve(res)
    })
}


//绘制圆盘测试函数
function drawTest() {
    return new Promise(function (resolve, reject) {
        var canvas = document.createElement("canvas")
        var w = 658,
            h = 658;
        canvas.width = w;
        canvas.height = h;
        var ox = w / 2,
            oy = h / 2; //圆心坐标
        var radius = 274; //半径
        var ctx = canvas.getContext("2d");
        //绘制背景图片
        // ctx.drawImage(wheelBackImg, 0, 0, 658, 658)

        //绘制扇形区域
        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.arc(ox, oy, radius, Math.PI * 2, Math.PI * 0.5, false);
        ctx.closePath();
        ctx.fillStyle = "green"
        ctx.fill()


        ctx.lineWidth = 10;
        ctx.strokeStyle = "red"
        ctx.stroke()
        var shareImg = canvas.toDataURL("image/png", 1);
        resolve(shareImg)
    })
}


//随机颜色
function randomColor() {
    var R = Math.floor(Math.random() * 255);
    var G = Math.floor(Math.random() * 255);
    var B = Math.floor(Math.random() * 255);
    var color = "rgb(" + R + "," + G + "," + B + ")";
    return color;
}

// export default {
//     drawWheel,
//     roundWheel


/* 图片缓存函数 */
/* 图片缓存失败返回false */
function imgonLoad(url) {
    return new Promise(function (resolve, reject) {
        var newImage = new Image()
        newImage.setAttribute('crossOrigin', 'anonymous');
        newImage.src = url
        newImage.onload = function () {
            resolve(newImage)
        }
        newImage.onerror = function () {
            reject(false)
        }
    })
}

function strSplit(text, number) {
    var strArr = []
    for (var i = 0; i < text.length; i = i + number) {
        var str = text.substring(i, i + number)
        strArr.push(str)
    }
    return strArr
}

export default{
    drawWheel
}