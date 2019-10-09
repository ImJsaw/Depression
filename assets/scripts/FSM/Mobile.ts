import StateBase from "../components/StateBase";
import * as Define from "../Define";
import Game from "../Game";
import UIMgr from "../UIMgr";
import { GameState } from "../MainStateMgr";

const {ccclass, property} = cc._decorator;



@ccclass
export default class End extends StateBase {

    @property({type:cc.Enum(Define.GameState),serializable:true})
    public state:Define.GameState = Define.GameState.Mobile;
    onLoad(){
        
    }
    
    public stateInitialize(){
        cc.warn("Enter Mobile!!!");
        UIMgr.Inst.mobileMgr.showMobileUI(true);
    }
    
    public stateRelease(){
        cc.warn("Leave Mobile!!!");
        UIMgr.Inst.mobileMgr.showMobileUI(false);    
    }

    public stateUpdate(dt: number){
    }

    change(){
        this.m_FSM.setState(Define.GameState.PostWorld);
    }

    backReality(){
        this.m_FSM.setState(Define.GameState.Reality);
    }
    
}
