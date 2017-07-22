// index.js

// Import CSS ClasName 
import navStyle from './nav.css'; 



var navStack = []; 

var $Nav = document.getElementById('n-nav'); 

var idInc = 0; 
var idBase = 'n-nav'; 
var idGenerator = function(){
	idInc ++ ; 
	return `${idBase}-${idInc}`; 
}

function getTop(){
	return navStack[navStack.length - 1]; 
}

var Nav = {
	push: function(compo){
		var node = this.navGenerator(
			compo.render()
		); 
		navStack.push(node); 

		compo.config.onInit && compo.config.onInit(); 
		
		// var node = compo.render(); 
		this.navRender(); 
	}, 
	pop: function(){
		// Do Not Pop When Stack Just Have A Root Component  
		if (navStack.length === 1) return; 
		var toDelete = navStack.pop(); 

		toDelete.setAttribute(
			'class',
			navStyle['n-nav-container'] + ' ' + navStyle['n-nav-pop']
		);
		setTimeout(() => {
			toDelete.remove(); 
		}, 1200); 

		return toDelete; 
	}, 
	popToRoot: function(){
		if (navStack.length < 2) return; 

		// Remove 
		navStack.slice(1).forEach(compo => compo.remove()); 

		// popToRoot And Render 
		navStack = [
			navStack[0]
		]; 
	}, 
	setRoot: function(compo){
		navStack[0] = compo; 
	},
	navRender: function(node = getTop()){
		
		$Nav.appendChild(node); 
	},
	clear: function(){
		$Nav.innerHTML = ''; 
	}, 
	navGenerator(componentDOM){
		// componentDOM = anComponent.render(); 
		// inner; 
		var zIdx = idInc + 500; 
		var id = idGenerator(); 
		var navInner = document.createElement('div'); 
		navInner.setAttribute('class', 'n-nav-inner'); 
		navInner.setAttribute('id', id);
		navInner.style.zIndex = zIdx; 
		navInner.appendChild(componentDOM); 

		// Outside 
		var navContainer = document.createElement('div'); 
		navContainer.setAttribute('class', navStyle['n-nav-container']); 
		navContainer.appendChild(navInner); 
		
		// navContainer.getElementById('id').appendChild(componentDOM); 

		return navContainer; 
	}
}; 

export {
	Nav
}
