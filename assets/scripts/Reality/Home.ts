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
export default class Home extends cc.Component {
    turnOnLight(){
        this.node.getChildByName("leadingRoleRoom").active = true
        this.node.getChildByName("darkRoom").active = false
    }

    turnOffLight(){
        this.node.getChildByName("darkRoom").active = true
        this.node.getChildByName("leadingRoleRoom").active = false
    }

    goToMyRoom(){
        this.node.children.forEach(node=>node.active=false)
        this.node.getChildByName("myRoom").active=true
    }

    goToLeadingRoleRoom(){
        this.node.children.forEach(node=>node.active=false)
        this.node.getChildByName("darkRoom").active=true
    }

    goToLivingRoom(){
        this.node.children.forEach(node=>node.active=false)
        this.node.getChildByName("overview").active=true
    }


}
