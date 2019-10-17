
const { ccclass, property } = cc._decorator;

/**提示視窗物件 */
@ccclass
export default class Page extends cc.Component {

    private duration : number = 0.2;

    private pageInterval : number = 600;
    
    onLoad() {
    }

    moveRight(deltaX : number){
        let action = cc.moveBy(this.duration, new cc.Vec2(this.pageInterval - deltaX,0) ).easing(cc.easeCubicActionInOut())
        this.node.runAction(action);
    }

    moveLeft(deltaX : number){
        let action = cc.moveBy(this.duration, new cc.Vec2(-this.pageInterval - deltaX,0) ).easing(cc.easeCubicActionInOut())
        this.node.runAction(action);
    }

    backToOrigin(deltaX){
        let action = cc.moveBy(this.duration, new cc.Vec2(-deltaX,0) ).easing(cc.easeCubicActionInOut())
        this.node.runAction(action);
    }

}
