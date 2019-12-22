import Game from "./Game";
import { GameState } from "./MainStateMgr";
import { ResourceIndex } from "./ResourcesMgr";
import MiscHelper from "./MiscHelper";


const { ccclass, property } = cc._decorator;

@ccclass
export default class SceneLoading extends cc.Component {

    // @property(cc.VideoPlayer) openingVideo : cc.VideoPlayer = null;
    @property(cc.Node) bg : cc.Node = null;
    @property(cc.Label) progressLabel : cc.Label = null;
    @property(cc.Node) darkPhone : cc.Node = null;
    @property(cc.Node) lightPhone : cc.Node = null;
    @property(cc.Node) grab : cc.Node = null;
    @property(cc.Node) hand : cc.Node = null;
    @property(cc.Node) shakeEffect : cc.Node = null;
    @property(cc.Node) lightEffect : cc.Node = null;
    @property(cc.Node) mask : cc.Node = null;

    progress : number = 0;
    isLoadingComplete: boolean;
    isVideoComplete: boolean;

    onLoad() {
        if (!Game.Inst.init) {
            Game.Inst.mainStateMgr.changeState(GameState.Start);
            return;
        }
        Game.Inst.utils.resize();
        cc.log("start preloading");
        this.startPreloading();
        this.startAnime();
        // this.registerVideo();
        //hide all
        this.darkPhone.opacity = 0;
        this.lightPhone.opacity = 0;
        this.lightEffect.opacity = 0;
        this.shakeEffect.opacity = 0;
        this.grab.opacity = 0;
        this.hand.opacity = 0;
        this.mask.opacity = 0;
        
    }

    registerVideo(){
        // this.openingVideo.node.active = true;
        // this.isVideoComplete = true;
        // this.openingVideo.node.on("ready-to-play",this.startVideo, this);
        // this.openingVideo.node.on("completed",this.onVideoComplete,this);
    }

    // startVideo(){
    //     cc.log("start vid");
    //     this.openingVideo.play();
    // }

    startAnime(){
        let self = this;
        this.isVideoComplete = false;
        
        this.showDarkPhone(2, ()=>{
            self.showLightPhone(2,()=>{
                self.grabbingPhone(2, ()=>{
                    self.grabedPhone(2,2, ()=>self.onAnimComplete());
                });
            });
        })
    }

    showDarkPhone(duration : number, onFinished?){
        let self = this;
        let action = cc.sequence(
            cc.fadeTo(duration,255),
            cc.callFunc(()=>{
                //show shake
                self.shakeEffect.opacity = 255;
                if(onFinished != undefined)
                onFinished();
            })
        )
        this.darkPhone.runAction(action);
    }

    showLightPhone(duration : number, onFinished?){
        let self = this;
        let action = cc.sequence(
            cc.fadeTo(duration,255),
            cc.callFunc(()=>{
                // self.shakeEffect.opacity = 0;
                self.lightEffect.opacity = 255;
                if(onFinished != undefined)
                onFinished();
            })
        )
        this.lightPhone.runAction(action);
    }

    grabbingPhone(duration : number, onFinished?){
        let self = this;
        let action = cc.sequence(
            cc.moveTo(0,0,-1000),
            cc.fadeTo(0,255),
            cc.moveTo(duration,0,-170),
            cc.callFunc(()=>{
                if(onFinished != undefined)
                onFinished();
            })
        )
        this.hand.runAction(action);
    }

    grabedPhone(maskDuration : number, handDuration : number, onFinished?){
        let self = this;
        //show mask
        let maskAction = cc.sequence(
            cc.fadeTo(maskDuration,255),
            cc.show()
        )
        //handPhone
        let handAction = cc.sequence(
            cc.delayTime(maskDuration),
            cc.fadeTo(handDuration,255),
            //hide
            cc.delayTime(0.5),
            cc.fadeTo(handDuration,0),
            cc.callFunc(()=>{
                if(onFinished != undefined)
                onFinished();
            })
        )
        this.mask.runAction(maskAction);
        this.grab.runAction(handAction);
    }

    onAnimComplete(){
        cc.log("anim complete");
        this.isVideoComplete = true;
        if(this.isLoadingComplete){
            Game.Inst.mainStateMgr.changeState(GameState.Game);
        }
    }

    // onVideoComplete(){
    //     cc.log("vid complete");
    //     this.openingVideo.node.active = false;
    //     this.bg.active = false;
    //     //check goto game
    //     this.isVideoComplete = true;
    //     if(this.isLoadingComplete){
    //         Game.Inst.mainStateMgr.changeState(GameState.Game);
    //     }
    // }

    startPreloading() {
        this.isLoadingComplete = false;

        Game.Inst.resourcesMgr.preload(ResourceIndex.Game, (p) => {
            this.progress = p;
            if (this.progress >= 1.0) {
                this.onLoadComplete();
            }
        });
    }

    onLoadComplete() {
        this.isLoadingComplete = true;
        //check goto game
        if(this.isVideoComplete){
            Game.Inst.mainStateMgr.changeState(GameState.Game);
        }
    }
    
    enterGame(){
        Game.Inst.mainStateMgr.changeState(GameState.Game);
    }

    update(){
        this.progressLabel.string = (this.progress*100).toString() + "%";
    }
    
}
