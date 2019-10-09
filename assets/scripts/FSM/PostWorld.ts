import StateBase from "../components/StateBase";
import * as Define from "../Define";
import Game from "../Game";
import UIMgr from "../UIMgr";
import { GameState } from "../MainStateMgr";

const {ccclass, property} = cc._decorator;



@ccclass
export default class End extends StateBase {

    @property({type:cc.Enum(Define.GameState),serializable:true})
    public state:Define.GameState = Define.GameState.PostWorld;

    onLoad(){    
    }
    
    public stateInitialize(){
        cc.warn("Enter post!!!");
        UIMgr.Inst.showPost(true);
    }
    
    public stateRelease(){
        cc.warn("Leave post!!!");
        UIMgr.Inst.showPost(false);
    }

    public stateUpdate(dt: number){
    }

    worldComplete(){
        this.m_FSM.setState(Define.GameState.Mobile);
    }
    
}
