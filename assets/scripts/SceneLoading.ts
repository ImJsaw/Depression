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
        let action = cc.sequence(
            cc.fadeTo(5,0),
            cc.callFunc(()=>{
                self.onAnimComplete();
            })
        )
        this.bg.runAction(action);
    }

    onAnimComplete(){
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
