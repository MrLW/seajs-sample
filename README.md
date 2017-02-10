## 一、什么是seajs
seajs是一个准守CMD规范的。

## 二、快速入门

### 简单例子

在seajs中，模块的引入需要是完整的相对路径来写。

seajs.use('js的文件路径', fn):seajs的入口模块

实例：
```
测试html文件
//seajs的入口模块：使用use
        seajs.use('./01_add', function(calc) {
                    var ta = document.getElementById('txt_a');
                    var tb = document.getElementById('txt_b');
                    var tres = document.getElementById('txt_res');
                    var btn = document.getElementById('btn');
                    var op = document.getElementById('sel_op');
                    btn.onclick = function () {
                        tres.value = calc.add(ta.value , tb.value) ;
                    }
        })
```

```
被导入的模块:01_add.js

//定义一个模块
/**
 *  
 * @param   require :导入其它模块
 * @param   exports ：将该模块导出给其它模块使用
 * @param   module：也可以用作导出模块给其它模块使用
 * @return          
 */
define(function(require,
    exports, module) {
    //在一个模块里引入另一个模块
    var convertor = require('./01_convertor.js');
    //这里的模块是私有空间
    function add(a, b) {
        return convertor.convertToNumber(a) + convertor.convertToNumber(b);
    }

    // 暴露模块的公共成员
    exports.add = add;
})
```


在被导入的模块中，使用define来创建一个模块有三个参数如上。

### 导出模块的三种方法。

方法一：就是上面使用的那种，适合只是简单暴露集中方法的。
```
exports.add = add;
```

方法二:使用module:这种使用导出一个整体对象，而这个对象又包含很多方法。

```
module.exports = {
    add: add
};
```

方法三、直接return。很少用。
```
return {
    add: add
};
```

### 异步请求

```
//这个是define()函数里面的代码。
require.async('./01_convertor', function(convertor) {
    this.convertor = convertor;
})
```

当然上面那个例子不适合用异步

### 使用第三方库

以jquery为例，jquery本身并不支持cmd，只支持amd，因此需要我们改动源码

```
  // 适配CMD
  if (typeof define === "function" && !define.amd) {
    // 当前有define函数，并且不是AMD的情况
    // jquery在新版本中如果使用AMD或CMD方式，不会去往全局挂载jquery对象
    define(function() {
      return jQuery.noConflict(true);
    });
  }
```

