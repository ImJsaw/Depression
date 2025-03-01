import StateBase from "../components/StateBase";
import * as Define from "../Define";
import Game from "../Game";
import UIMgr from "../UIMgr";
import { GameState } from "../MainStateMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Reality extends StateBase {

    @property({type:cc.Enum(Define.GameState),serializable:true})
    public state:Define.GameState = Define.GameState.Reality;

    onLoad(){
        UIMgr.Inst.realityMgr.changeScene(Define.RealityScene.None);
        //initial start scene
        Define.GameInfo.Inst.curRealityScene = Define.RealityScene.home;
    }
    
    public stateInitialize(){
        cc.warn("Enter Reality!!!");
        Define.GameInfo.Inst.curState = Define.GameState.Reality;
        UIMgr.Inst.showReality(true);
        //change to current scene
        UIMgr.Inst.realityMgr.changeScene(Define.GameInfo.Inst.curRealityScene);
    }
    
    public stateRelease(){
        cc.warn("Leave Reality!!!");
        UIMgr.Inst.showReality(false);    
    }

    public stateUpdate(dt: number){
    }

    openMobile(){
        this.m_FSM.setState(Define.GameState.Mobile);
    }
    
}
