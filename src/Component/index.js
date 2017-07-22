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

	this.tplParser($component, config); 

	this.root = $component; 

	return $component; 
}

// 递归遍历树 
ComponentProto.tplParser = function(root, config){
	// 遍历子树 
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

