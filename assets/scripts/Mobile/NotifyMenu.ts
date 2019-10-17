import MessagePrefab from "../components/MessagePrefab";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NotifyMenu extends cc.Component {

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

    /**目前訊息流水號派發 */
    private curMsgSerialNum : number = 1;

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
        //generate new msg
        let node = cc.instantiate(this.msgPrefab);
        node.parent = this.msgRoot;
        node.y = 200;

        //manage serial num
        node.getComponent(MessagePrefab).init(this.curMsgSerialNum);
        this.curMsgSerialNum++;

        //move all exist msg down
        this.msgRoot.children.forEach(element=>{
            element.getComponent(MessagePrefab).moveDown();
        })
    }

    /**broadcast msg remove to all msg prefab */
    removeMsg( serialNum : number){
        cc.log("[Msg]remove " + serialNum);
        //move all exist msg down
        this.msgRoot.children.forEach(element=>{
            element.getComponent(MessagePrefab).removeBroadcast(serialNum);
        })
    }



}
