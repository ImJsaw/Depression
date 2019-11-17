import Game from "./Game";
import { GameState } from "./MainStateMgr";
import { ResourceIndex } from "./ResourcesMgr";
import MiscHelper from "./MiscHelper";


const { ccclass, property } = cc._decorator;

@ccclass
export default class SceneLoading extends cc.Component {

    @property(cc.Label) tipLabel: cc.Label = null;

    @property(cc.Node) loadingBar: cc.Node = null;
    @property(Number) minLoadingBarWidth: number = 20;
    @property(Number) maxLoadingBarWidth: number = 1170;

    @property(cc.Node) loadingBarHead: cc.Node = null;
    @property(cc.Node) loadingBarTrail: cc.Node = null;
    @property(Number) showLoadingBarTrailPos: number = -545;
    @property(Number) minLoadingBarHeadPos: number = -580;
    @property(Number) maxLoadingBarHeadPos: number = 570;

    @property(cc.Node) button: cc.Node = null;
    stateStr: string;
    progress: number;
    isLoading: boolean;


    onLoad() {
        if (!Game.Inst.init) {
            Game.Inst.mainStateMgr.changeState(GameState.Start);
            return;
        }
        Game.Inst.utils.resize();
        this.progress = 0;
        //this.tipLabel.string = this.stateStr;
        this.startPreloading();
    }

    start() {
        // Game.Inst.animationMgr.play("LogoAnim", 1.0, true);
    }

    startPreloading() {
        this.tipLabel.string = "0 / 100";
        this.loadingBar.setContentSize(this.minLoadingBarWidth,this.loadingBar.getContentSize().height);
        this.loadingBarHead.position = cc.v2(this.minLoadingBarHeadPos);
        this.loadingBarTrail.opacity = 0;

        this.isLoading = true;

        Game.Inst.resourcesMgr.preload(ResourceIndex.Game, (p) => {
            this.progress = p;

            if (this.progress >= 1.0) {
                this.onLoadComplete();
            }
        });
    }

    onLoadComplete() {
        if (!this.isLoading)
            return;

        this.isLoading = false;
        //this.stateStr = Game.Inst.text.get("SwitchingScene");
        
        if(this.button == null)
            this.button =this.node.getChildByName("Game");
        //this.button.opacity = 255;
        Game.Inst.mainStateMgr.changeState(GameState.Game);
    }
    
    enterGame(){
        Game.Inst.mainStateMgr.changeState(GameState.Game);
    }
    // called every frame, uncomment this function to activate update callback
    update(dt) {
        if (this.isLoading) {
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