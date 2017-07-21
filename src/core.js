// core.js
import { Popout } from './Popout'; 
import Nav from './Nav'; 
import Component from './Component'; 
import { Mask } from './Mask';
import css from './Mask/mask.css';

var test = new Component({
	name: 'test', 
	tpl: `<h1 class="${css.test}"> hello, world </h1>`, 
	style: '', 
	onInit: () => { console.log('oninit') },
	onDestroy: () => {console.log('delete')}
}); 


window.test = test; 
window.Nav = Nav; 
window.Component = Component; 
 
console.log(Nav);


