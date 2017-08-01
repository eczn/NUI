// core.js
import { Popout } from './Popout'; 
import { Nav } from './Nav'; 
import { Component } from './Component'; 
import Mask from './Mask';
import css from './Mask/mask.css';
import {Toast} from './Popout/toast.js';


import { Alert } from './Alert'; 

var test = new Component({
	name: 'nav-push-pop-test', 
	tpl: `
		<div class="${css.test}">
			<header>Hello</header>
			<h1 @click="hi">
				{{ wow }} {{ VERSION }}
			</h1>

			<button @click="toPush"> Push ! </button>
			<button @click="toPop"> Pop ! </button>

			<input :bind="inp" />

			<img src="{{ img }}"/>
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
		VERSION: '0.0.1', 
		img: 'http://ogz5pg6y8.bkt.clouddn.com/vally/images/car-on-way-to-gdut.jpg',
		inp: 'wow'
	},
	hi: function(){
		alert('hi'); 
	}
}); 

// var toast = new Toast({
// 	position: 'top', // top | bottom | middle
// 	content: 'this is content',
// });
Nav.push(test); 

window.Toast = Toast;
window.test = test; 
window.Nav = Nav; 
window.Component = Component; 

var N = {
	Alert, 
	Component
}

window.N = N; 

export default N; 