let boat = document.getElementById("boat");
let heightBoat = parseInt(window.getComputedStyle(boat).bottom.replace('px',''));

let filet=null;

export function boatRight() {
    boat.classList.add("flip");
}

export function boatLeft(){
    boat.classList.remove("flip");
}

export function boatJump(y){
    boat.style.bottom=heightBoat+y+"px";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async  function throwFilet(force){
    let element = document.createElement('img');
    element.src="./images/filet.png";
    element.id="filet";
    boat.appendChild(element);
    element.classList.add("scale");
    let count=0;
    for (let i=0; i < force; i++) {
        element.style.left=-i*20+"px";
        element.style.bottom=i*5+"px";
        count=i*20;
        await sleep(20);
     }
     for (let i=force; i > 0; i--) {
        element.style.bottom=i*5+"px";
        await sleep(20);
    }
    filet = element;

     return count;
}

export function drownFilet(){
    setTimeout(()=>{
        filet.classList.add("transitionBottom");
        filet.style.bottom="-500px";
        setTimeout(()=>{
            boat.removeChild(filet);
        },2000);
    },1000);
}

export function getFilet(){
    filet.classList.add("transitionLeft");
    filet.style.left="0px";
    setTimeout(()=>{
        boat.removeChild(filet);
     },2000);
}