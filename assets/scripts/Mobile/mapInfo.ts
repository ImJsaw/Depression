import Game from "../Game";
import * as Define from "../Define";

const { ccclass, property } = cc._decorator;

/**ig profile */
@ccclass
export default class mapInfo extends cc.Component {

    @property({type:cc.Enum(Define.RealityScene),serializable:true})
    scene : Define.RealityScene = Define.RealityScene.None;

    getScene() : Define.RealityScene{
        return this.scene;
    }
    
}
