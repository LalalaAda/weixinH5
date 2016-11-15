/**
 * jQuery plugin template
 */

/**
 * 将插件封装在一个闭包里面，防止外部代码污染  冲突
 */
(function ($) {
    /**
     * 定义一个插件 Plugin
     */
    var Plugin,
        privateMethod;  //插件的私有方法，也可以看做是插件的工具方法集

    /**
     * 这里是插件的主体部分
     * 这里是一个自运行的单例模式。
     * 这里之所以用一个 Plugin 的单例模式 包含一个 Plugin的类，主要是为了封装性，更好的划分代码块
     * 同时 也 方便区分私有方法及公共方法
     * PS：但有时私有方法为了方便还是写在了Plugin类里，这时建议私有方法前加上"_"
     */
    Plugin = (function () {

        /**
         * 插件实例化部分，初始化时调用的代码可以放这里
         * @param element 传入jq对象的选择器，如 $("#J_plugin").plugin() ,其中 $("#J_plugin") 即是 element
         * @param options 插件的一些参数神马的
         * @constructor
         */
        function Plugin(element, options) {
            //将dom jquery对象赋值给插件，方便后续调用
            this.$element = $(element);

            //将插件的默认参数及用户定义的参数合并到一个新的obj里
            this.settings = $.extend({}, $.fn.plugin.defaults,options);
            //如果将参数设置在dom的自定义属性里，也可以这样写
            this.settings = $.extend({}, $.fn.plugin.defaults, this.$element.data(), options);

            //初始化调用一下
            this.init();
        }

        /**
         * 写法一
         * 插件的公共方法，相当于接口函数，用于给外部调用
         */
        Plugin.prototype.doSomething = function () {
            /**
             * 方法内容
             */
        };

        /**
         * 写法二
         * 将插件所有函数放在prototype的大对象里
         * @type {{}}
         */
        Plugin.prototype = {

            init:function(){
                console.log('init');
            },

            doSomething2:function(){

            }
        };

        return Plugin;

    })();

    /**
     * 插件的私有方法
     */
    privateMethod = function () {

    };

    /**
     * 这里是将Plugin对象 转为jq插件的形式进行调用
     * 定义一个插件 plugin
     */
    $.fn.plugin = function (options) {
        return this.each(function () {
            var $me = $(this),
                instance = $me.data('plugin');
            if(!instance){
                //将实例化后的插件缓存在dom结构里（内存里）
                $me.data('plugin', new Plugin(this, options));
            }

            /**
             * 优雅处： 如果插件的参数是一个字符串，则 调用 插件的 字符串方法。
             * 如 $('#id').plugin('doSomething') 则实际调用的是 $('#id).plugin.doSomething();
             * doSomething是刚才定义的接口。
             * 这种方法 在 juqery ui 的插件里 很常见。
             */
            if ($.type(options) === 'string') instance[options]();
        });
    };

    /**
     * 插件的默认值
     */
    $.fn.plugin.defaults = {
        property1: 'value',
        property2: 'value'
    };

    /**
     * 优雅处： 通过data-xxx 的方式 实例化插件。
     * 这样的话 在页面上就不需要显示调用了。
     * 可以查看bootstrap 里面的JS插件写法
     */
    $(function () {
        return new Plugin($('[data-plugin]'));
    });
})(JQuery);

// -------------

/**
 * zepto plugin template
 */

/**
 * 将插件封装在一个闭包里面，防止外部代码污染  冲突
 */
(function ($) {
    /**
     * 定义一个插件 Plugin
     */
    var Plugin,
        privateMethod;  //插件的私有方法，也可以看做是插件的工具方法集

    /**
     * 这里是插件的主体部分
     * 这里是一个自运行的单例模式。
     * 这里之所以用一个 Plugin 的单例模式 包含一个 Plugin的类，主要是为了封装性，更好的划分代码块
     * 同时 也 方便区分私有方法及公共方法
     * PS：但有时私有方法为了方便还是写在了Plugin类里，这时建议私有方法前加上"_"
     */
    Plugin = (function () {

        /**
         * 插件实例化部分，初始化时调用的代码可以放这里
         * @param element 传入jq对象的选择器，如 $("#J_plugin").plugin() ,其中 $("#J_plugin") 即是 element
         * @param options 插件的一些参数神马的
         * @constructor
         */
        function Plugin(element, options) {
            //将插件的默认参数及用户定义的参数合并到一个新的obj里
            this.settings = $.extend({}, $.fn.plugin.defaults, options);
            //将dom jquery对象赋值给插件，方便后续调用
            this.$element = $(element);
            //初始化调用一下
            this.init();
        }

        /**
         * 写法一
         * 插件的公共方法，相当于接口函数，用于给外部调用
         */
        Plugin.prototype.doSomething = function () {
            /**
             * 方法内容
             */
        };

        /**
         * 写法二
         * 将插件所有函数放在prototype的大对象里
         * @type {{}}
         */
        Plugin.prototype = {

            init:function(){

            },

            doSomething2:function(){

            }
        };

        return Plugin;

    })();

    /**
     * 插件的私有方法
     */
    privateMethod = function () {

    };

    /**
     * 这里是将Plugin对象 转为jq插件的形式进行调用
     * 定义一个插件 plugin
     * zepto的data方法与jq的data方法不同
     * 这里的实现方式可参考文章：http://trentrichardson.com/2013/08/20/creating-zepto-plugins-from-jquery-plugins/
     */
    $.fn.plugin = function(options){
        return this.each(function () {
            var $this = $(this),
                instance = $.fn.plugin.lookup[$this.data('plugin')];
            if (!instance) {
                //zepto的data方法只能保存字符串，所以用此方法解决一下
                $.fn.plugin.lookup[++$.fn.plugin.lookup.i] = new Plugin(this,options);
                $this.data('plugin', $.fn.plugin.lookup.i);
                instance = $.fn.plugin.lookup[$this.data('plugin')];
            }

            if (typeof options === 'string') instance[options]();
        })
    };

    $.fn.plugin.lookup = {i: 0};

    /**
     * 插件的默认值
     */
    $.fn.plugin.defaults = {
        property1: 'value',
        property2: 'value'
    };

    /**
     * 优雅处： 通过data-xxx 的方式 实例化插件。
     * 这样的话 在页面上就不需要显示调用了。
     * 可以查看bootstrap 里面的JS插件写法
     */
    $(function () {
        return new Plugin($('[data-plugin]'));
    });
})(zepto);