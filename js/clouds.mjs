let maxWidth =2000;
let maxHeight = 50;
let cloudsElement = document.getElementById("clouds");
let srcImg = "./images/cloud.png";
let srcAvion = "./images/avion.png";
let srcAvionEn = "./images/avionEn.png";

let widthWindow = window.innerWidth;
let hasPlane=false;


class Cloud {

    constructor(x,y){
        this.x =x;
        this.y =y;
        this.element = document.createElement('img');
        this.element.src=srcImg;
        this.element.alt="nuage";
        this.element.style.left=this.x+"px";
        this.element.style.top=this.y+"px";
        this.element.style.position="absolute";
    }

    display(){
        cloudsElement.appendChild(this.element);
    }

    move(x){
        this.x+=x;
        this.element.style.left=this.x+"px";
    }
}

let clouds = [];

export function initClouds(){

    let nbNuages = Math.floor(Math.random() * 10)+1;
    for(let i=0;i<nbNuages;i++){
        let c = new Cloud( Math.floor(Math.random() * maxWidth),Math.floor(Math.random()*maxHeight));
        c.display()
        clouds.push(c);
    }

}

export function moveCloud(moved,position,langFr) {
    clouds.forEach(cloud => cloud.move(moved));

    let rand = Math.floor(Math.random() * 20);

    if(rand==1){
        let nbNuages = Math.floor(Math.random() * 3)+1;
        if(moved>0){
            //gauche
            for(let i=0;i<nbNuages;i++){
                let c = new Cloud( Math.floor(-Math.random() * maxWidth)+position-widthWindow,Math.floor(Math.random()*maxHeight));
                c.display()
                clouds.push(c);
            }
        }else{
            //droite
            for(let i=0;i<nbNuages;i++){
                let c = new Cloud( Math.floor(Math.random() * maxWidth)+position+widthWindow,Math.floor(Math.random()*maxHeight));
                c.display()
                clouds.push(c);
            }

        }
    }

    if(Math.floor(Math.random()*200)==1 && !hasPlane){
        hasPlane=true;
        console.log("queen!");
        let element = document.createElement('img');
        if(langFr){
            element.src=srcAvion;
        }else{
            element.src=srcAvionEn;
        }
        element.alt="avion";
        element.style.position="absolute";
        element.style.top=Math.floor(Math.random()*maxHeight)+"px";
        element.style.left=widthWindow+500+"px";
        cloudsElement.appendChild(element);
        element.classList.add("transitionLeftLong");
        setTimeout(()=>{
            element.style.left="-1000px";
        },10);
        setTimeout(()=>{
            hasPlane=false;
        },20000);


    }
}