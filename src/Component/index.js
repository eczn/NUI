// index.js
var ComponentProto = {}; 

ComponentProto.render = function(){
	var config = this.config; 

	var $component = document.createElement(config.name);
	$component.setAttribute('id', config.componentId); 
	$component.innerHTML = `
		${config.tpl}
		
		<!-- style goes here -->
		<style>
			${config.style}
		</style>
	`; 

	window.h = $component; 
	this.tplParser($component, config); 
	
	this.root = $component; 

	return $component; 
}

var replacer = function(match, p1, p2, p3, offset, string){
	return this[p1.trim()]; 
}

function dataBinding(root, config){
	// 筛选文本结点 
	Array.from(root.childNodes).filter(e => e.nodeType === 3).forEach(text => {
		var exp = /{{(.*?)}}/g
		  , matches = text.wholeText.match(exp);
		
		// 未有数据绑定 则返回
		if (!matches) return; 

		//  否则 
		var tpl = text.wholeText
		//  数据渲染 
		  , render = () => text.data = tpl.replace(exp, replacer.bind(config.data)); 
		
		//  首次渲染
		render();
		
		//  根据 matches 里的匹配对象进行 setter getter 绑定 
		matches.map(e => e.slice(2, -2).trim()).forEach(varName => {
			var preVal = config.data[varName]; 
			Object.defineProperty(config.data, varName, {
				get(){
					return preVal; 
				}, 
				set(newVal){
					preVal = newVal; 
					render(); 
					return newVal; 
				}
			});
		}); 
	})
}

// 递归遍历树 
ComponentProto.tplParser = function(root, config){
	// 遍历子树 

	// 数据绑定 
	dataBinding(root, config);

	Array.from(root.children).forEach(child => {
		// child 的属性 attributes 
		Array.from(child.attributes).map(attr => {
			if (attr.name.startsWith('@')){
				return {
					name: attr.name.slice(1), 
					value: attr.value, 
					eventBind: true
				}
			} else {
				return false; 
			}
		}).filter(e => e).forEach(attr => {
			if (attr.eventBind && (attr.value in config)){
				child.addEventListener(attr.name, config[attr.value]); 
			}
		}); 

		ComponentProto.tplParser(child, config); 
	})
}

ComponentProto.remove = function(){
	this.config.onDestroy && this.config.onDestroy(); 

	document.getElementById(this.config.componentId).outerHTML = ''; 
}

// config : {
//     name: 's', 
//     tpl: '<h1></h1>',
//     style: 'h1 {  }',
//     onInit: () => console.log('init'), 
//     onDestroyed: () => console.log('destroyed')
// } 
//
var idInc = 0; 
var idBase = 'n-component'; 
var idGenerator = function(){
	idInc ++ ; 
	return `${idBase}-${idInc}`; 
}

function Component(config){
	// save config 
	this.config = config; 
	
	config.componentId = idGenerator(); 

	config.onDestroy = config.onDestroy.bind(this); 
	config.onInit = config.onInit.bind(this); 
}

Component.prototype = ComponentProto; 



export {
	Component
} 

