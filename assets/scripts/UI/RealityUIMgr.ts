
const { ccclass, property } = cc._decorator;

@ccclass
export default class RealityUIMgr extends cc.Component {


    @property(cc.Node) 
    realityRoot: cc.Node = null;
    

    onLoad() {
        this.showRealityUI(false);
    }

    showRealityUI( isOn : boolean){
        if( isOn) 
            //this.realityRoot.opacity = 255;
            this.realityRoot.y-=2000;
        else 
            //this.realityRoot.opacity = 0;
            this.realityRoot.y+=2000;
    }
}
