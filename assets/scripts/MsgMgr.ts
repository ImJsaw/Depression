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
    private static selectionChar = ['A', 'B', 'C', 'D']
    private nextButton: cc.Node
    private nameText: cc.Node
    private contentText: cc.Node
    private buttonGroup: cc.Node
    private buttons: Array<cc.Node> = []
    private scripts: Object = {}
    private playing: string
    private playingProcess: number

    async start () {
        this.nextButton = cc.find('MsgBox/Next', this.node)
        this.nameText = cc.find('MsgBox/Name/Background/Text', this.node)
        this.contentText = cc.find('MsgBox/Content/Background/Text', this.node)
        this.buttonGroup = cc.find('MsgBox/Buttons', this.node)
        this.buttons.push(cc.find('ButtonA', this.buttonGroup))
        this.buttons.push(cc.find('ButtonB', this.buttonGroup))
        this.buttons.push(cc.find('ButtonC', this.buttonGroup))
        this.buttons.push(cc.find('ButtonD', this.buttonGroup))

        this.node.on('click', this.next)
        await this.load('腳本/example.json')

        this.node.active = false
        
        window['playScript'] = (name) => this.play(name)
        window['stopScript'] = () => this.close()
    }

    load (file: string) {
        return new Promise((res, rej) => {
            cc.loader.loadRes(file, (err, obj) => {
                if (err) console.error(err)
                if (this.scripts) {
                    Object.keys(obj.json).forEach(e => {
                        this.scripts[e] = obj.json[e]
                    })
                } else {
                    this.scripts = obj.json
                }
                res(this.scripts)
            })
        })
    }

    play (script: string, init: number = 0) {
        this.node.active = true
        this.playing = script
        this.playingProcess = init
        if (this.scripts[this.playing][this.playingProcess].selections) {
            // @ts-ignore
            this.select(this.scripts[this.playing][this.playingProcess])
        } else {
            // @ts-ignore
            this.normal(this.scripts[this.playing][this.playingProcess])
        }
    }

    close () {
        this.node.active = false
    }

    next () {
        if (this.scripts[this.playing][this.playingProcess].selections) return false
        
        this.playingProcess += 1 
        if (this.scripts[this.playing][this.playingProcess].selections) {
            // @ts-ignore
            this.select(this.scripts[this.playing][this.playingProcess])
        } else if (this.scripts[this.playing].length <= this.playingProcess) {
            this.node.active = false
            return false
        } else {
            // @ts-ignore
            this.normal(this.scripts[this.playing][this.playingProcess])
        }
        return true
    }

    normal (obj: {name: string, content: string}) {
        this.nextButton.active = true
        this.buttonGroup.active = false
        this.nameText.getComponent(cc.Label).string = obj.name
        this.contentText.getComponent(cc.Label).string = obj.content
    }

    select (obj: {name: string, content: string, selections: Array<{content: string, event: string, data?: any}>}) {
        this.nextButton.active = false
        this.buttonGroup.active = true
        this.buttons.forEach(n => {
            n.active = false
            n.getComponent(cc.Button).clickEvents = []
        })
        this.nameText.getComponent(cc.Label).string = obj.name
        this.contentText.getComponent(cc.Label).string = obj.content
        for (let i in obj.selections) {
            this.buttons[i].active = true
            this.buttons[i].getComponentInChildren(cc.Label).string = MsgMgr.selectionChar[i] + '. ' + obj.selections[i].content

            let tmpEventHandler = new cc.Component.EventHandler()
            tmpEventHandler.target = this.node
            tmpEventHandler.component = "MsgEvents"
            tmpEventHandler.handler = obj.selections[i].event
            Object.assign(tmpEventHandler, obj.selections[i].data)

            this.buttons[i].getComponent(cc.Button).clickEvents.push(tmpEventHandler)
        }
    }

    update (dt) {
        this.nameText.parent.width = this.nameText.width
        this.contentText.parent.width = this.contentText.width
        this.contentText.parent.height = this.contentText.height
    }
}
