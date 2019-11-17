// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property (cc.Node) effect: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:
    private mouseDetacted = false;
    onLoad() {
        this.node.on(cc.Node.EventType.MOUSE_ENTER, function (event){
            this.mouseDetacted = true;
        }, this);

        this.node.on(cc.Node.EventType.MOUSE_LEAVE, function (event){
            this.mouseDetacted = false;
        }, this);
    }

    update (dt) {
        if(this.mouseDetacted == true) {
            this.effect.opacity += 51;
            
        
            cc.log("mouse enter");
        }
        else {
            this.effect.opacity -= 51;
            cc.log("mouse leave");
        }
    }
}
