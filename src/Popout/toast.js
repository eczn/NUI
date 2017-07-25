import { Popout } from './';
import { Component }  from '../Component';
import { Mask } from '../Mask';
//Toast.prototype 继承Popout的方法
class ToastPro extends Popout{

}

//构造函数Toast 继承ToastPro的方法
class Toast extends ToastPro {
    constructor(config) {
        super();
        this.toast = new Component(config);
        // let {position = "top", content =  "默认内容", tpl = "<h1>FUCK</h1>"} = config;
        // this.toast.name = ""
        // this.toast.tpl = `
        // <div>
        //     <p class="${position}">
        //         ${content}
        //     </p>
        // </div>`;

        
        console.log(this.toast);
    }

    present() {
        Mask.push(this.toast);
    }

    sayName() {
        console.log(`position is :${this.toast.position}, content is : "${this.toast.content}"`);
    }
    

}


export { Toast }