//定义一个转换模块
define(function(require, exports, module) {
	//公开一些转换逻辑
	exports.convertToNumber = function(input) {
		return parseFloat(input);
	}
})