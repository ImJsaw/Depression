import Game from "../Game";
import * as Define from "../Define";
import mapInfo from "./mapInfoMgr";

const { ccclass, property } = cc._decorator;

/**map icon */
@ccclass
export default class mapIcon extends cc.Component {

    @property({type:cc.Enum(Define.RealityScene),serializable:true})
    scene : Define.RealityScene = Define.RealityScene.None;

    @property(mapInfo)
    infoMgr : mapInfo = null;
    
    onClick(){
        this.infoMgr.showInfo(this.scene);
    }

    onLoad(){
        let self = this;
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
            self.onClick();
        });
    }
    
}
