import * as Define from "../Define";
import RealityChild from "../components/RealityChild";
import Reality from "../FSM/Reality";
import UIMgr from "../UIMgr";
const { ccclass, property } = cc._decorator;

@ccclass
export default class RealityUIMgr extends cc.Component {


    @property(cc.Node) 
    realityRoot: cc.Node = null;
    
    @property(Reality)
    realityStateMachine : Reality = null;

    onLoad() {
        this.showRealityUI(false);
    }

    showRealityUI( isOn : boolean){
        if( isOn) 
            this.realityRoot.children.forEach((element)=>element.active = true);
        else 
            this.realityRoot.children.forEach((element)=>element.active = false);
    }

    changeScene( sceneName : Define.RealityScene , transiton : boolean = false){
        let self = this;
        if(!transiton){
            this.gotoScene(sceneName);
            return;
        }
        cc.warn("transition/////////////");
        UIMgr.Inst.transitionAnim(()=>{
            self.gotoScene(sceneName);
            UIMgr.Inst.mobileMgr.gotoReality();
        })
        
    }

    private gotoScene(sceneName : Define.RealityScene){
        Define.GameInfo.Inst.curRealityScene = sceneName;
        this.realityRoot.children.forEach((element)=>{
            if(element.getComponent(RealityChild).getSceneName() == sceneName){
                element.active = true;
            }
            else 
                element.active = false;
        })
    }

    openMobile(){
        this.realityStateMachine.openMobile();
    }
}
