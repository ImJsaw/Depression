
const { ccclass, property } = cc._decorator;

@ccclass
export default class PostWorldUIMgr extends cc.Component {


    @property(cc.Node) 
    postRoot: cc.Node = null;

    onLoad() {
        this.showPostUI(false);
    }

    showPostUI( isOn : boolean){
        if( isOn) 
            this.postRoot.opacity = 255;
        else 
            this.postRoot.opacity = 0;
    }
}
