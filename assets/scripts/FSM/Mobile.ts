import StateBase from "../components/StateBase";
import * as Define from "../Define";
import Game from "../Game";
import UIMgr from "../UIMgr";
import { GameState } from "../MainStateMgr";
import line from "../Mobile/app/line";
import gMap from "../Mobile/app/gMap";

const {ccclass, property} = cc._decorator;

@ccclass
export default class End extends StateBase {

    @property({type:cc.Enum(Define.GameState),serializable:true})
    public state:Define.GameState = Define.GameState.Mobile;
    private mobileRoot : cc.Node = null;
    
    private delta : cc.Vec2 = new cc.Vec2(0,0);
    private startPos : cc.Vec2 = new cc.Vec2(0,0);
    private endPos : cc.Vec2 = new cc.Vec2(0,0);
    //觸發拖曳閾值
    private threshold : number = 20;

    private isNotifyMenuShow : boolean = false;

    onLoad(){
        
    }
    
    public stateInitialize(){
        this.mobileRoot = UIMgr.Inst.mobileMgr.mobileRoot;
        cc.warn("Enter Mobile!!!");
        UIMgr.Inst.showMobile(true);
        this.isDragEventAvaliable(true);
    }
    
    public stateRelease(){
        cc.warn("Leave Mobile!!!");
        UIMgr.Inst.showMobile(false);    
        this.isDragEventAvaliable(false);
    }

    public stateUpdate(dt: number){
    }

    change(){
        this.m_FSM.setState(Define.GameState.PostWorld);
    }

    backReality(){
        this.m_FSM.setState(Define.GameState.Reality);
    }

    isDragEventAvaliable(isOn : boolean){
        if(isOn) this.registerDragEvent();
        else this.unRegDragEvent();
    }

    registerDragEvent(){
        let self = this;
        this.mobileRoot.on(cc.Node.EventType.TOUCH_START, function (event) {
            // cc.log("start");
            //reset delta
            self.delta = new cc.Vec2(0,0);
            //log start point
            self.startPos = event.getLocation();
        });
        this.mobileRoot.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var delta = event.touch.getDelta();
            self.delta.x += delta.x;
            self.delta.y += delta.y;
        });
        //release mouse inside
        this.mobileRoot.on(cc.Node.EventType.TOUCH_END, function (event) {
            // cc.log("[Mobile]delta : " + self.delta.x + " , " + self.delta.y);
            //log start point
            self.endPos = event.getLocation();
            if( Math.abs(self.delta.x) > self.threshold || Math.abs(self.delta.y) > self.threshold ){
                self.dragEvent( self.startPos, self.endPos , Math.abs(self.delta.y/self.delta.x));
            }
        });
        //release mouse outside
        this.mobileRoot.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            // cc.log("drag cancel");
        });
    }

    unRegDragEvent(){
        cc.log("unregister drag event");
        this.mobileRoot.off(cc.Node.EventType.TOUCH_START);
        this.mobileRoot.off(cc.Node.EventType.TOUCH_MOVE);
        this.mobileRoot.off(cc.Node.EventType.TOUCH_END);
        this.mobileRoot.off(cc.Node.EventType.TOUCH_CANCEL);
    }

    /**
     * handle drag event
     * @param start drag start point
     * @param end drag end point
     * @param tengent drag angle
     */
    dragEvent(start : cc.Vec2, end : cc.Vec2, tengent : number){
        // cc.log("drag trigger");
        if(tengent > 1 && start.y > end.y && !this.isNotifyMenuShow){
            this.showNotifyMenu(true);
        }
        if(tengent > 1 && start.y < end.y && this.isNotifyMenuShow){
            this.showNotifyMenu(false);
        }
    }

    /**
     * 顯示下拉通知欄
     * @param isOn 
     */
    showNotifyMenu(isOn : boolean){
        UIMgr.Inst.mobileMgr.showNotifyMenu(isOn, ()=> this.isNotifyMenuShow = isOn );
    }

}
