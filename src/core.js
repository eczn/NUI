// core.js
import { Popout } from './Popout'; 
import { Nav } from './Nav'; 
import { Component } from './Component'; 
import { Mask } from './Mask';
import css from './Mask/mask.css';

import { Alert } from './Alert'; 

var test = new Component({
	name: 'nav-push-pop-test', 
	tpl: `
		<div class="${css.test}">
			<header>Hello</header>
			<h1>
				{{ wow }} ({{ VERSION }})
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
		console.log('toPush'); 
		Nav.push(test); 
	}, 
	toPop(e){
		Nav.pop(); 
	}, 
	data: {
		wow: '数据绑定',
		VERSION: '0.0.1'
	}
}); 

Nav.push(test); 

window.test = test; 
window.Nav = Nav; 
window.Component = Component; 

var N = {
	Alert, 
	Component
}

window.N = N; 

export default N; 