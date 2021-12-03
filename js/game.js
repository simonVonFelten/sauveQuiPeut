"use strict";

import {boatRight,boatLeft,boatJump,throwFilet,getFilet,drownFilet} from "./boat.mjs";
import {initClouds,moveCloud} from "./clouds.mjs";
import {initTargets,moveTarget,isTargetPos,getNbTargets} from "./targets.mjs";
let position=window.innerWidth/2;
let isLookingRight=false;
const jumpDistance=15;
let score=0;
let scoreElement = document.getElementById("score")
let isJumping=false;
let isFilet=false;

let isFr=false;

function afficherScore(){
    scoreElement.innerHTML="";
    if(isFr){
        let scoreE = document.createElement("p");
        scoreE.innerText="Score du jeu = "+score;
        let restE = document.createElement("p");
        restE.innerText="Naufragés restants = "+getNbTargets();
        scoreElement.appendChild(scoreE);
        scoreElement.appendChild(restE);
    }else{
        let scoreE = document.createElement("p");
        scoreE.innerText="Game score = "+score;
        let restE = document.createElement("p");
        restE.innerText="Shipwrecked remaining = "+getNbTargets();
        scoreElement.appendChild(scoreE);
        scoreElement.appendChild(restE);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function moveAll(dist,jump){
    boatJump(jump);
    moveCloud(dist, position,isFr);
    moveTarget(dist, window.innerWidth / 2,false);
    await sleep(20);
}

document.addEventListener('DOMContentLoaded', (event) => {
    initClouds();
    initTargets(15);

    document.getElementById("lang").addEventListener('click',()=>{
        if (isFr){
            document.getElementById("lang").innerText="English";
        }else{
            document.getElementById("lang").innerText="Français";
        }
       isFr=!isFr;
        afficherScore();
    });

    document.addEventListener('keydown',async  (event) => {
        const nomTouche = event.key;

        if (nomTouche == "ArrowRight"&&!isJumping&&!isFilet) {
            isLookingRight = true;
            boatRight();
            moveCloud(-20, position,isFr);
            let res=moveTarget(-20, window.innerWidth / 2);
            if(res>0){
                score -=res*2;
                afficherScore();
            }

        }

        if (nomTouche == "ArrowLeft"&&!isJumping&&!isFilet) {
            isLookingRight = false;
            boatLeft();
            moveCloud(20, position,isFr);
            let res=moveTarget(20, window.innerWidth / 2);
            if(res>0){
                score -=res*2;
                afficherScore();
            }
        }

        if (nomTouche == "ArrowUp"&&!isJumping&&!isFilet) {
            isJumping=true;
            if(isLookingRight){
                for (let i=0; i < jumpDistance; i++) {
                    await moveAll(-i*2,i*10);
                }
                for (let i=jumpDistance; i >= 0; i--) {
                    await moveAll(-i*2,i*10);
                }
            }else{
                for (let i=0; i < jumpDistance; i++) {
                    await moveAll(i*2,i*10);
                }
                for (let i=jumpDistance; i >= 0; i--) {
                    await moveAll(i*2,i*10);
                }
            }

            let res=moveTarget(0, window.innerWidth / 2);
            if(res>0){
                score -=res*2;
                afficherScore();
            }
            isJumping=false;

        }

        if(nomTouche ==" "&&!isFilet){
            isFilet=true;
            let distance = await throwFilet(Math.floor(Math.random()*20)+10);
            setTimeout(()=>{
               isFilet=false;
            },3000);
            let res=0;
            if(isLookingRight){
                res=isTargetPos(distance+position,position,isLookingRight);
            }else{
                res=isTargetPos(position-distance,position,isLookingRight);
            }

            if(res>0){
                score +=res*5;
                afficherScore();
                getFilet();
            }else{
                drownFilet()
            }

        }

    });

})
