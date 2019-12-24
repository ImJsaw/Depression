import Game from "../Game";
import * as Define from "../Define";
import UIMgr from "../UIMgr";
import gMap from "../Mobile/app/gMap";

const { ccclass, property } = cc._decorator;

/**現實場景 */
@ccclass
export default class RealityEntry extends cc.Component {

    @property({type:cc.Enum(Define.RealityScene),serializable:true})
    sceneName : Define.RealityScene = Define.RealityScene.None;

    @property(gMap)
    mapInst : gMap = null;
    
    onClick(){
        UIMgr.Inst.realityMgr.changeScene(this.sceneName,true,()=>{
            UIMgr.Inst.realityMgr.backToOverView(Define.GameInfo.Inst.curRealityScene);
            this.mapInst.updateCursor(this.sceneName);  
            this.mapInst.endApp();
            this.mapInst.node.children.forEach( (element)=>element.active  = false);
            //return focus to pageMgr
            UIMgr.Inst.mobileMgr.pageMgr.setFocus(true);
        });
    }

    onLoad(){
        let self = this;
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
            self.onClick();
        });
    }
}
