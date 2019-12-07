// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class GhostCursor extends cc.Component {
    start() {
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
    }

    onMouseLeave(_) {
        cc.find('Canvas/Cursor').setPosition(-4096, -2048)
    }

    onMouseMove(evt) {
        evt.stopPropagation()
        let mousePosition = this.node.convertToNodeSpaceAR(evt.getLocation());
        //let mousePosition = evt.getLocation();
        mousePosition = mousePosition.add(this.node.position);
        cc.find('Canvas/Cursor').setPosition(mousePosition.x, mousePosition.y)
    }
    onMouseDown(_) {
        cc.find('Canvas/Cursor').setPosition(-4096, -2048)
    }


}
