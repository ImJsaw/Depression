
const { ccclass, property } = cc._decorator;

@ccclass
export default class RealityUIMgr extends cc.Component {


    @property(cc.Node) 
    realityRoot: cc.Node = null;
    

    onLoad() {
        this.showRealityeUI(false);
    }

    showRealityeUI( isOn : boolean){
        if( isOn) 
            this.realityRoot.opacity = 255;
        else 
            this.realityRoot.opacity = 0;
    }
}
