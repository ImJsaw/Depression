import Game from "../Game";
import * as Define from "../Define";

const { ccclass, property } = cc._decorator;

/**現實場景 */
@ccclass
export default class RealityChild extends cc.Component {

    @property({type:cc.Enum(Define.RealityScene),serializable:true})
    sceneName : Define.RealityScene = Define.RealityScene.None;
    
    getSceneName() : Define.RealityScene{
        return this.sceneName;
    }
}
