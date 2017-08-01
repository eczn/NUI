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

var exp = /{{(.*?)}}/g

function dataBinding(root, config){
	Array.from(root.childNodes).concat(Array.from(root.attributes)).filter(e => e.nodeType === 3 || e.nodeType === 2).forEach(node => {
		if (node.nodeType === 3){
			var matches = node.wholeText.match(exp);
			var tpl = node.wholeText
			
			, render = () => node.data = tpl.replace(exp, replacer.bind(config.data)); 
		} else {
			var matches = node.value.match(exp); 
			var tpl = node.value; 
			var render = () => node.value = tpl.replace(exp, replacer.bind(config.data)); 
		}
		
		if (!matches) return; 

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
					value: attr.value.trim(), 
					eventBind: true
				}
			} else if (attr.name.startsWith(':')) {
				return {
					name: attr.name.slice(1), 
					value: attr.value.trim(), 
					bind: true
				}
			} else {
				return false; 
			}
		}).filter(e => e).forEach(attr => {
			if (attr.eventBind && (attr.value in config)){
				child.addEventListener(attr.name, config[attr.value]); 
			} else if (attr.bind){
				// 数据绑定 
				var preVal = config.data[attr.value]; 
				child.value = preVal; 


				Object.defineProperty(config.data, attr.value, {
					get(){
						return preVal; 
					},
					set(newVal){
						preVal = newVal; 
						child.value = preVal; 
						return newVal; 
					}
				})

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

