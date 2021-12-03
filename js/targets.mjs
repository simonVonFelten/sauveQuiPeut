let maxWidth = 3000;
let minWidth = -3000;
let sea = document.getElementById("sea");
let srcImg = "./images/target.png";
let srcImgBaguette = "./images/baguette.png";

let widthWindow = window.innerWidth;

class Target {

    constructor(x,baquette=false){
        this.x =x;
        this.baguette = baquette;
        this.element = document.createElement('img');
        if(baquette){
            this.element.src=srcImgBaguette;
            this.element.alt="naufragésBaguette";
        }else {
            this.element.src=srcImg;
            this.element.alt="naufragés";
        }
        this.element.style.left=this.x+"px";
        this.element.style.position="absolute";
        this.element.classList.add("target");
    }

    display(){
        sea.appendChild(this.element);
    }

    isBaguette(){
        return this.baguette;
    }

    move(x){
        this.x+=x;
        this.element.style.left=this.x+"px";
    }

    isShot(position){
        return this.x>=position-70 && this.x<=position;
    }

    isCaptured(position,isRight){
        console.log("pos " +position);
        console.log("x "+ this.x);
        if(isRight){
            return this.x>=position-90 && this.x<=position+90 ;
        }else{
            return this.x>=position-200 && this.x<=position ;
        }
    }

    getElement(){
        return this.element;
    }

}

let targets = [];
let targetsVerify = [];

export function initTargets(nbTargets){

    for(let i=0;i<nbTargets;i++){
        let t = new Target( Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth));
        if(Math.floor(Math.random()*20)==1){
            t = new Target( Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth),true);
        }
        t.display()
        targets.push(t);
        targetsVerify.push(t);
    }

}

export function moveTarget(moved,position,isShooted=true) {
    targets.forEach(target => target.move(moved));

    let shooted=0;
    if(isShooted){
        for (let i=0;i<targetsVerify.length;i++){
            if(targetsVerify[i].isShot(position)){
                targetsVerify[i].getElement().classList.add("transitionBottom");
                targetsVerify[i].getElement().style.bottom = "-100px";
                //sea.removeChild(targets[i].getElement());
                targetsVerify.splice(i,1);
                shooted++;
            }
        }
    }
    return shooted;

}

export function isTargetPos (positionFilet,position,isRight){
    let count=0;
    for (let i=0;i<targetsVerify.length;i++){
        if(targetsVerify[i].isCaptured(positionFilet,isRight)){
            if(targetsVerify[i].isBaguette()){
                count+=2;
            }else{
                count++;
            }
            let toMove =targetsVerify[i].getElement();
            toMove.classList.add("transitionLeft");
            toMove.style.left=position+"px";
            targetsVerify.splice(i,1);
            setTimeout(()=>{
                sea.removeChild(toMove);
            },2000)
        }
    }
    return count;
}