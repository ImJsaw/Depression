import StateBase from "../components/StateBase";
import * as Define from "../Define";
import Game from "../Game";
import UIMgr from "../UIMgr";
import { GameState } from "../MainStateMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class End extends StateBase {

    @property({type:cc.Enum(Define.GameState),serializable:true})
    public state:Define.GameState = Define.GameState.Reality;

    onLoad(){
        
    }
    
    public stateInitialize(){
        cc.warn("Enter Reality!!!");
        UIMgr.Inst.showReality(true);
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
