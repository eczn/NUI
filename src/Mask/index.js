// index.js
import style from './mask.css';
var $mask = document.getElementById("n-mask");
var classVal = $mask.getAttribute("class", classVal);
var Mask = {
    push(compon) {
        var componDom = compon.render();
        $mask.appendChild(componDom);
        $mask.setAttribute("class", `${style.create}`);
    },

    delete() {
        console.log("mask is" + classVal);
        classVal.replace(`${style.create}`, "");
        $mask.setAttribute("class", `${style.remove}`);
    }   

}

export { Mask }; 
