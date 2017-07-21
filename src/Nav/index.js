// index.js

var navStack = []; 

var $Nav = document.getElementById('n-nav'); 

var Nav = {
	push: function(compo){
		compo.config.onInit && compo.config.onInit(); 
		navStack.push(compo); 
		
		var node = compo.render(); 
		$Nav.appendChild(node); 
	}, 
	pop: function(){
		var toDelete = navStack.pop(); 
		toDelete.remove(); 
		return toDelete; 
	}
}; 

export default Nav; 
