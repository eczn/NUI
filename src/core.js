// core.js
import { Popout } from './Popout'; 
import Nav from './Nav'; 
import Component from './Component'; 


var test = new Component({
	name: 'test', 
	tpl: '<h1> hello, world </h1>', 
	style: ' test h1 { color: red } ', 
	onInit: () => { console.log('oninit') },
	onDestroy: () => {console.log('delete')}
}); 


window.test = test; 
window.Nav = Nav; 
window.Component = Component; 
 
console.log(Nav);


