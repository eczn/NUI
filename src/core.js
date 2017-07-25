// core.js
import { Popout } from './Popout';
import { Nav } from './Nav';
import { Component } from './Component';
import { Mask } from './Mask';
import css from './Mask/mask.css';

import { ActionSheet } from './ActionSheet';

var test = new Component({
	name: 'nav-push-pop-test',
	tpl: `
		<div>
			<h1 class="${css.test}">
				hello, world
			</h1>
			<button @click="toPush"> Push ! </button>
			<button @click="toPop"> Pop ! </button>
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
	toPush(e){
		Nav.push(test);
	},
	toPop(e){
		Nav.pop();
	},
	as(e){
		ActionSheet.create();
	}
});

Nav.push(test);

window.test = test;
window.Nav = Nav;
window.Component = Component;
window.ActionSheet = ActionSheet;

