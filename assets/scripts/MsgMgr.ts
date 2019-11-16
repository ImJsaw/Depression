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
export default class MsgMgr extends cc.Component {
    private nameText: cc.Node
    private contentText: cc.Node
    private buttonGroup: cc.Node
    private buttons: Array<cc.Node> = []
    private static selectionChar = ['A', 'B', 'C', 'D']

    start () {
        this.nameText = cc.find('MsgBox/Name/Background/Text', this.node)
        this.contentText = cc.find('MsgBox/Content/Background/Text', this.node)
        this.buttonGroup = cc.find('MsgBox/Buttons', this.node)
        this.buttons.push(cc.find('ButtonA', this.buttonGroup))
        this.buttons.push(cc.find('ButtonB', this.buttonGroup))
        this.buttons.push(cc.find('ButtonC', this.buttonGroup))
        this.buttons.push(cc.find('ButtonD', this.buttonGroup))
    }

    normal (name: string, content: string) {
        this.buttonGroup.active = false
        this.nameText.getComponent(cc.Label).string = name
        this.contentText.getComponent(cc.Label).string = content
    }

    select (name: string, content: string, selections: Array<{label: string, action: string, data?: any}>) {
        this.buttonGroup.active = true
        this.buttons.forEach(n => {
            n.active = false
            n.getComponent(cc.Button).clickEvents = []
        })
        this.nameText.getComponent(cc.Label).string = name
        this.contentText.getComponent(cc.Label).string = content
        for (let i in selections) {
            this.buttons[i].active = true
            this.buttons[i].getComponentInChildren(cc.Label).string = MsgMgr.selectionChar[i] + '. ' + selections[i].label

            let tmpEventHandler = new cc.Component.EventHandler()
            tmpEventHandler.target = this.node
            tmpEventHandler.component = "MsgEvents"
            tmpEventHandler.handler = selections[i].action
            Object.assign(tmpEventHandler, selections[i].data)

            this.buttons[i].getComponent(cc.Button).clickEvents.push(tmpEventHandler)
        }
    }

    update (dt) {
        this.nameText.parent.width = this.nameText.width
        this.contentText.parent.width = this.contentText.width
        this.contentText.parent.height = this.contentText.height
    }
}
