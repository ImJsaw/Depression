import MessagePrefab from "../components/MessagePrefab";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    /**整個下拉選單root node */
    @property(cc.Node)
    root : cc.Node = null;

    /**提示訊息root node */
    @property(cc.Node)
    msgRoot : cc.Node = null;

    /**notify prefab */
    @property(cc.Prefab)
    msgPrefab : cc.Prefab = null;

    private showPos : cc.Vec2 = new cc.Vec2(0,0);
    private hidePos : cc.Vec2 = new cc.Vec2(0,1000);
    /**animation duration */
    private duration : number = 1;

    onLoad(){
        this.root.position = this.hidePos;
    }

    start () {

    }

    showUI(isOn : boolean){
        let start : cc.Vec2;
        let end : cc.Vec2;
        if( isOn){
            start = this.hidePos;
            end = this.showPos;
        }
        else {
            start = this.showPos;
            end = this.hidePos;
        }

        let action = cc.sequence(
            cc.moveTo(0,start),
            cc.moveTo(this.duration, end).easing(cc.easeCubicActionInOut())
        )
        this.root.runAction(action);
    }

    getNotify(){
        let moveVec : cc.Vec2 = new cc.Vec2(0,-200); 

        let node = cc.instantiate(this.msgPrefab);
        node.parent = this.msgRoot;
        node.y = 200;

        let action = cc.moveBy(this.duration, moveVec ).easing(cc.easeCubicActionInOut())
        this.msgRoot.children.forEach(element=>{
            // element.runAction(action);
            // element.y -= 200;
            element.getComponent(MessagePrefab).moveDown();
        })
        
    }

}
