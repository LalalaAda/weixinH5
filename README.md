# weixinH5
微信端H5页面



###修改原始引用的flexible.js
    
在mb_sample.html即，移动端H5模板页面中原先使用的淘宝flexible.js
````javascript    
    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {//只对iPhone做了处理！！！！
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {                
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }
````
    **改为：**
````javascript
    if (!dpr && !scale) {
    //devicePixelRatio这个属性是可以获取到设备的dpr
    var devicePixelRatio = win.devicePixelRatio;
    //判断dpr是否为整数
    var isRegularDpr = devicePixelRatio.toString().match(/^[1-9]\d*$/g)
    if (isRegularDpr) {
    // 对于是整数的dpr，对dpr进行操作
     if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {                
        dpr = 3;
    } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
        dpr = 2;
    } else {
        dpr = 1;
    }
    } else {
        // 对于其他的dpr，人采用dpr为1的方案
        dpr = 1;
        }
        scale = 1 / dpr;
    }
````
****




____
#####长期收集网址
  IOS和Android APP界面设计相关 [http://www.tuicool.com/articles/vymQJ3](http://www.tuicool.com/articles/vymQJ3)
