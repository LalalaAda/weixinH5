-----------
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
#####微信长度
  |型号|长宽      |微信可视长宽|
  |----|:--------:|:------:|
  |ip4 |640*960   |wxH 866 |
  |ip5 |640 1136  |wxH 1042|
  |ip6 |750 1334  |wxH 1206|

#####rem与border-radius 50%
    在微信浏览器中，常常rem值的长宽元素设置border-radius:50%不能
变成圆形  需要全部采用px值才行
eg:
~~.circle{width: 0.33333rem; height: 0.33333rem; border-radius: 50%;}~~
.circle{width:20px;height:20px;border-radius: 50%;}

##### 易企秀处理模板
原稿 根据640的稿子写css 然后再根据机型的比例宽高对比320/486更改对应的
viewport
<meta name="viewport" content="width=320, initial-scale=scale, maximum-scale=scale, user-scalable=no">
````javascript
    function setScale(){
        if(window.top !== window){
           return;
        }
        var scale = 1;
        var width = document.documentElement.clientWidth || 320;
        var height = document.documentelement.clientHeight || 486;
        if(width/height >= 320/486){
            scale = height/486;
        }else{
            scale = width/320;
        }
        var content = 'width=320, initial-sacle='+ scale +',maximum-scale='+
                      scale +', user-scalable=no';
        document.getElementById('viewport').setAttribute('content', content);
    }
````
参考附图 易企秀h5scale.png
