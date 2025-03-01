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
export default class DemoIG extends cc.Component {

    onLoad(){
        let self = this;
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            let delta = event.touch.getDelta();
            //make map move with touch
            self.moveIg(delta.y);
        });
    }

    moveIg(y : number){
        this.node.y += y;
        //handle border
        if(this.node.y > 2743)
            this.node.y = 2743;
        if(this.node.y < 0)
            this.node.y = 0;
    }

}
