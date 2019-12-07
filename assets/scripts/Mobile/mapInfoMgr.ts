import Game from "../Game";
import * as Define from "../Define";
import mapInfo from "./mapInfo";

const { ccclass, property } = cc._decorator;

/**ig profile */
@ccclass
export default class mapInfoMgr extends cc.Component {

    showInfo(scene : Define.RealityScene){
        this.node.children.forEach((element)=>{
            if(element.getComponent(mapInfo).getScene() == scene){
                element.active = true;
            }
            else
                element.active = false;
        })
    }

    onLoad(){
        //hide all
        this.showInfo(Define.RealityScene.None);
    }
    
}
