//定义一个模块
/**
 * 	
 * @param   require :导入其它模块
 * @param   exports ：将该模块导出给其它模块使用
 * @param   module
 * @return          
 */
define(function(require,
	exports, module) {
	//在一个模块里引入另一个模块
	//这是同步
	// var convertor = require('./01_convertor.js');
	//异步加载
	var convertor = null ;
	require.async('./01_convertor', function(convertor) {
		this.convertor = convertor;
	})
	console.log('convertor:' + convertor);
	//这里的模块是私有空间
	function add(a, b) {
		return convertor.convertToNumber(a) + convertor.convertToNumber(b);
	}

	// 暴露模块的公共成员
	// 第一种方式
	// exports.add = add;
	// 第二种方法
	// module.exports = {
	// 	add: add
	// };
	// 第三种方法
	return {
		add: add
	};
})