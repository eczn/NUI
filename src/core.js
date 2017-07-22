// core.js
import { Popout } from './Popout'; 
import Nav from './Nav'; 
import Component from './Component'; 
import Mask from './Mask';
import css from './Mask/mask.css';
import {Toast} from './Popout/toast.js';


var test = new Component({
	name: 'test', 
	tpl: `<h1 class="${css.test}"> hello, world </h1>`, 
	style: '', 
	onInit: () => { console.log('oninit') },
	onDestroy: () => {console.log('delete')}
}); 

// var toast = new Toast({
// 	position: 'top', // top | bottom | middle
// 	content: 'this is content',
// });

window.Toast = Toast;
window.test = test; 
window.Nav = Nav; 
window.Component = Component; 
 
console.log(Nav);


