import Mask from '../Mask';

//Toast.prototype
class ToastPro {
    render() {
        console.log(this.position + " , " + this.content);
    }
}

//构造函数Toast 继承ToastPro的方法
class Toast extends ToastPro {
    constructor({position = 'top', content = 'HelloWorld'}) {
        console.log(super());
        this.position = position;
        this.content = content;
    }

    sayName() {
        console.log(`position is :${position}, content is : "${content}"`);
    }
}


export { Toast }