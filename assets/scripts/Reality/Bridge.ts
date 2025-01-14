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
export default class Bridge extends cc.Component {
    goToBridge() {
        this.node.children.forEach(node => node.active = false)
        this.node.getChildByName("overview").active = true;
    }
    goToBasketBall() {
        this.node.children.forEach(node => node.active = false)
        this.node.getChildByName("basketballCourt").active = true;
    }
    goToBasketBallBack() {
        this.node.children.forEach(node => node.active = false)
        this.node.getChildByName("basketballCourtBack").active = true;
    }

}
