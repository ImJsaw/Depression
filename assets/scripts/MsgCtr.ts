// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass} = cc._decorator;

@ccclass
export default class MsgCtr extends cc.Component {
    script1() {
        cc.find('Canvas/Msg').getComponent('MsgMgr').play('sunnyAndPunk')
    }

    sunnyAndPunk(){
        cc.find('Canvas/Msg').getComponent('MsgMgr').play('sunnyAndPunk')
    }

    demo(){
        cc.find('Canvas/Msg').getComponent('MsgMgr').play('demo')
    }

    switch(){
        cc.find('Canvas/Msg').getComponent('MsgMgr').play('switch')
    }

    notebook(){
        cc.find('Canvas/Msg').getComponent('MsgMgr').play('notebook')
    }

    wallPaper(){
        cc.find('Canvas/Msg').getComponent('MsgMgr').play('wallPaper')
    }

    secret(){
        cc.find('Canvas/Msg').getComponent('MsgMgr').play('secret')
    }

    book(){
        cc.find('Canvas/Msg').getComponent('MsgMgr').play('book')

    }
}
