
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
            this.realityRoot.children.forEach((element)=>element.active = true);
        else 
            this.realityRoot.children.forEach((element)=>element.active = false);
    }
}
