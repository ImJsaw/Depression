import StateBase from "../components/StateBase";
import * as Define from "../Define";
import Game from "../Game";
import UIMgr from "../UIMgr";
import { GameState } from "../MainStateMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class End extends StateBase {

    @property({type:cc.Enum(Define.GameState),serializable:true})
    public state:Define.GameState = Define.GameState.End;
    onLoad(){
        
    }
    
    public stateInitialize(){
        cc.warn("END!!!");
    }

    public stateRelease(){

    }

    public stateUpdate(dt: number){
    }

    openMobile(){
        this.m_FSM.setState(Define.GameState.Mobile);
    }
    
}
