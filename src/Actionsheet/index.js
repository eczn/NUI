// index.js

import asStyle from './actionsheet.css';
import { Component } from '../Component';

var ActionSheet = {
	create: function(){
		let htmlContent = '';
		htmlContent += `<div class="asTitle">${btns.title}</div>`;
		btns.content.forEach((e) => {
			htmlContent += `<div class="asContent">${e}</div>`;
		});
		htmlContent += `<div>取消</div>`;
		console.log(htmlContent);
	},

	delete: function(){
		console.log("delete");
	}
}

var btns = {
	title: "这是一个标题",
	content: ["操作1", "操作2"]
}

export {
	ActionSheet
}
