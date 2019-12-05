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
export default class GhostCursor extends cc.Component {

    onMouseLeave (_) {
        cc.find('Canvas/Cursor').position.x = -1024
        cc.find('Canvas/Cursor').position.y = -1024
        window.console.log('eqeqw')
    }

    onMouseMove (evt) {
        evt.stopPropagation()
        let mousePosition = this.node.convertToNodeSpaceAR(evt.getLocation());
        window.console.log(mousePosition)
        evt.position.x = mousePosition.x
        evt.position.y = mousePosition.y
    }
}
