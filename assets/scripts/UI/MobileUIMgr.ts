
const { ccclass, property } = cc._decorator;

@ccclass
export default class MobileUIMgr extends cc.Component {


    @property(cc.Node) 
    mobileRoot: cc.Node = null;
    

    onLoad() {
        this.showMobileUI(false);
    }

    showMobileUI( isOn : boolean){
        if( isOn) 
            this.mobileRoot.opacity = 255;
        else 
            this.mobileRoot.opacity = 0;
    }
}
