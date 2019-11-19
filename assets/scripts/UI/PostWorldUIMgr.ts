
const { ccclass, property } = cc._decorator;

@ccclass
export default class PostWorldUIMgr extends cc.Component {


    @property(cc.Node) 
    postRoot: cc.Node = null;

    onLoad() {
        this.postRoot.active = true;
        this.showPostUI(false);
    }

    showPostUI( isOn : boolean){
        if( isOn) 
            this.postRoot.children.forEach((element)=>element.active = true);
        else 
            this.postRoot.children.forEach((element)=>element.active = false);
    }
}
