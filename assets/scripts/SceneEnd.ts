import Game from "./Game";
import { GameState } from "./MainStateMgr";
import { ResourceIndex } from "./ResourcesMgr";
import MiscHelper from "./MiscHelper";


const { ccclass, property } = cc._decorator;

@ccclass
export default class SceneEnd extends cc.Component {

    @property(cc.Node) secretPerson : cc.Node = null;
    @property(cc.Node) secretBG : cc.Node = null;
    @property(cc.Node) selfTxt : cc.Node = null;
    @property(cc.Node) endPerson : cc.Node = null;
    @property(cc.Node) endBG : cc.Node = null;
    @property(cc.Node) endTxt : cc.Node = null;
    @property(cc.Node) mask : cc.Node = null;
    @property(cc.Node) endMask : cc.Node = null;

    secretDuration : number = 6.5;
    endingDuration : number = 8.5;

    onLoad() {
        //show bg on start
        this.secretPerson.opacity = 0;
        this.secretBG.opacity = 255;
        this.selfTxt.opacity = 0;
        this.endPerson.opacity = 0;
        this.endBG.opacity = 0;
        this.endTxt.opacity = 0;
        this.mask.opacity = 0;
        this.endMask.opacity = 0;
        this.startAnime();
    }

    onStart(){
        
    }

    hideSecret(){
        this.secretPerson.opacity = 0;
        this.secretBG.opacity = 0;
        this.selfTxt.opacity = 0;
    }

    hideEnd(){
        this.endPerson.opacity = 0;
        this.endBG.opacity = 0;
        this.endTxt.opacity = 0;
    }

    startAnime(){
        let self = this;
        cc.log("startAnime");
        this.playSecretAnime(0,8);
        this.playEndAnime(8,0);
        this.playEnding(48);
    }

    playSecretAnime(delay : number, duration : number){
        let self = this;
        let personDuration : number = 1.5;
        let scaleDuration : number = 3;
        let scaleSize : number = 2;
        let maskDuration : number = 2;
        //show secret person at 1s
        let personAction = cc.sequence(
            cc.delayTime(1),
            cc.fadeTo(personDuration,255),
            cc.delayTime(2),
            cc.scaleTo(scaleDuration,scaleSize)
        );
        //show secret person at 1s
        let bgAction = cc.sequence(
            cc.delayTime(1+personDuration + 2),
            cc.scaleTo(scaleDuration,scaleSize)
        );
        //dark mask
        let maskAction = cc.sequence(
            cc.delayTime(1.2+personDuration + scaleDuration),
            cc.fadeTo(maskDuration,255)
        )
        this.secretPerson.runAction(personAction);
        this.secretBG.runAction(bgAction);
        this.mask.runAction(maskAction);
    }

    playEndAnime(delay : number, duration : number){
        let self = this;
        let maskDuration : number = 2;
        let personDuration : number = 1.5;
        let txtUp : cc.Vec2 = new cc.Vec2(0,1950);
        let personAction = cc.sequence(
            cc.delayTime(delay),
            cc.callFunc(()=>self.hideSecret()),
            cc.fadeTo(0,180),
            cc.fadeTo(maskDuration+personDuration,255),
            cc.fadeTo(personDuration/2, 150),
            cc.fadeTo(personDuration/2,255)
        );
        let bgAction = cc.sequence(
            cc.delayTime(delay),
            cc.fadeTo(personDuration,255)
        );
        let maskAction = cc.sequence(
            cc.delayTime(delay),
            cc.fadeTo(maskDuration,0),
            cc.delayTime(personDuration*2),
            cc.fadeTo(2,180)
        )
        let txtAction = cc.sequence(
            cc.delayTime(delay+maskDuration+personDuration*2),
            cc.fadeTo(2,255),
            cc.delayTime(2),
            cc.moveBy(25,txtUp)
        )
        this.endPerson.runAction(personAction);
        this.endBG.runAction(bgAction);
        this.mask.runAction(maskAction);
        this.selfTxt.runAction(txtAction);
    }

    playEnding(delay : number){
        let maskAction = cc.sequence(
            cc.delayTime(delay),
            cc.fadeTo(2,255)
        );
        let txtAction = cc.sequence(
            cc.delayTime(delay + 3),
            cc.fadeTo(1,255)
        );
        this.endMask.runAction(maskAction);
        this.endTxt.runAction(txtAction);
    }

    onAnimComplete(){
        Game.Inst.mainStateMgr.changeState(GameState.Start);
        
    }
    
    
}
