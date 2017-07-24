// core.js
import { Popout } from './Popout'; 
import { Nav } from './Nav'; 
import { Component } from './Component'; 
import { Mask } from './Mask';
import css from './Mask/mask.css';
import {Toast} from './Popout/toast.js';


var test = new Component({
	name: 'nav-push-pop-test', 
	tpl: `
		<div>
			<h1 class="${css.test}">
				hello, world
			</h1>
			<button @click="toPush"> Push ! </button>
			<button @click="toPop"> Pop ! </button>
		</div>
	`, 
	style: '', 
	onInit(){
		// console.log(this.root); 
	},
	onDestroy(){
		console.log('delete')
	},
	toPush(e){
		Nav.push(test); 
	}, 
	toPop(e){
		Nav.pop(); 
	}
});
var toast = new Toast({
	name: 'wow',
	tpl:`<div>fuck</div>`,
	style: '',
	onInit(){
		// console.log(this.root); 
	},
	onDestroy(){
		console.log('delete')
	},
}) 

Nav.push(test); 

window.toast = toast;
window.test = test; 
window.Nav = Nav; 
window.Component = Component; 

