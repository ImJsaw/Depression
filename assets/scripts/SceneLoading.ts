import Game from "./Game";
import { GameState } from "./MainStateMgr";
import { ResourceIndex } from "./ResourcesMgr";
import MiscHelper from "./MiscHelper";


const { ccclass, property } = cc._decorator;

@ccclass
export default class SceneLoading extends cc.Component {

    @property(cc.VideoPlayer) openingVideo : cc.VideoPlayer = null;

    @property(cc.Label) tipLabel: cc.Label = null;

    @property(cc.Node) loadingBar: cc.Node = null;
    @property(Number) minLoadingBarWidth: number = 20;
    @property(Number) maxLoadingBarWidth: number = 1170;

    @property(cc.Node) loadingBarHead: cc.Node = null;
    @property(cc.Node) loadingBarTrail: cc.Node = null;
    @property(Number) showLoadingBarTrailPos: number = -545;
    @property(Number) minLoadingBarHeadPos: number = -580;
    @property(Number) maxLoadingBarHeadPos: number = 570;

    stateStr: string;
    progress: number;
    isLoadingComplete: boolean;
    isVideoComplete: boolean;

    onLoad() {
        if (!Game.Inst.init) {
            Game.Inst.mainStateMgr.changeState(GameState.Start);
            return;
        }
        Game.Inst.utils.resize();
        this.progress = 0;
        this.startPreloading();
        this.registerVideo();
    }

    start() {
        // Game.Inst.animationMgr.play("LogoAnim", 1.0, true);
    }

    registerVideo(){
        this.openingVideo.node.active = true;
        this.isVideoComplete = false;
        this.openingVideo.node.on("ready-to-play",this.startVideo, this);
        this.openingVideo.node.on("completed",this.onVideoComplete,this);
    }

    startVideo(){
        this.openingVideo.play();
        this.isVideoComplete = true;
    }

    onVideoComplete(){
        this.openingVideo.node.active = false;
        //check goto game
        this.isVideoComplete = true;
        if(this.isLoadingComplete){
            Game.Inst.mainStateMgr.changeState(GameState.Game);
        }
    }

    startPreloading() {
        this.tipLabel.string = "0 / 100";
        this.loadingBar.setContentSize(this.minLoadingBarWidth,this.loadingBar.getContentSize().height);
        this.loadingBarHead.position = cc.v2(this.minLoadingBarHeadPos);
        this.loadingBarTrail.opacity = 0;

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

    // called every frame, uncomment this function to activate update callback
    update(dt) {
        if (this.isLoadingComplete) {
            this.tipLabel.string = Math.floor(this.progress * 100).toString() + " / 100";
            this.loadingBar.setContentSize(cc.misc.lerp(this.minLoadingBarWidth,this.maxLoadingBarWidth,this.progress),this.loadingBar.getContentSize().height);
            this.loadingBarHead.position = cc.v2(cc.misc.lerp(this.minLoadingBarHeadPos,this.maxLoadingBarHeadPos,this.progress));
            this.loadingBarTrail.opacity = cc.misc.lerp(0,255,MiscHelper.inverseLerp(this.minLoadingBarHeadPos,this.showLoadingBarTrailPos,this.loadingBarHead.position.x));
        }
        else {
            this.tipLabel.string = "100 / 100";
            this.loadingBar.setContentSize(this.maxLoadingBarWidth,this.loadingBar.getContentSize().height);
            this.loadingBarHead.position = cc.v2(this.maxLoadingBarHeadPos);
            this.loadingBarTrail.opacity = 255;
        }

    }
}
