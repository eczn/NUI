// core.js
import { Popout } from './Popout';
import { Nav } from './Nav';
import { Component } from './Component';
import { Mask } from './Mask';

import css from './Mask/mask.css';
import {Toast} from './Popout/toast.js';


import { Alert } from './Alert';

import { ActionSheet } from './ActionSheet';

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

			<textarea :bind="t"></textarea>
			<input :bind="inp" type="text" />
	
			<p> {{ t }} </p> 
			<p> {{ inp }} </p>

			<img src="{{ img }}"/>
			<button @click="as"> ActionSheet ! </button>
		</div>
	`,
	style: '',
	onInit(){
		// console.log(this.root);
	},
	onDestroy(){
		console.log('delete')
	},
	dataModel(){
		return {
			wow: '数据绑定',
			VERSION: '0.0.1', 
			img: 'http://ogz5pg6y8.bkt.clouddn.com/vally/images/car-on-way-to-gdut.jpg',
			inp: 'wow', 
			t: ''
		}
	},
	methods: {
		toPush(e){
			console.log('toPush');
			Nav.push(test);
		},
		toPop(e){
			Nav.pop();
		},
		ttt(e){

		},
		hi: function(){
			alert('hi'); 
			VERSION: '0.0.1'
		},
		as(e){
			ActionSheet.create();
		}
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

window.Toast = Toast;
window.test = test;
window.Nav = Nav;
window.Component = Component;
window.ActionSheet = ActionSheet;

var N = {
	Alert,
	Component
}

window.N = N;

export default N;
