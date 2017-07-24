// index.js
import style from './mask.css';

var Mask = {
    push(compon) {
        var componDom = compon.render();
        var $mask = document.getElementById("n-mask");
        $mask.appendChild(componDom);
    }

}

export { Mask }; 
