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

	return $component; 
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

}

Component.prototype = ComponentProto; 



export default Component; 

