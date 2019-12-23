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
export default class MsgMgr extends cc.Component {
    private speakerImage: Object = {}
    private speaker: cc.Node
    private static selectionChar = ['A', 'B', 'C', 'D']
    private nextButton: cc.Node
    private nameText: cc.Node
    private contentText: cc.Node
    private buttonGroup: cc.Node
    private buttons: Array<cc.Node> = []
    private scripts: Object = {}
    private playing: string
    private playingProcess: number
    private afterLoad: Function

    async onLoad() {
        this.node.y += 2000;

        this.nextButton = cc.find('MsgBox/Next', this.node)
        this.speaker = cc.find('Speaker', this.node)
        this.nameText = cc.find('MsgBox/Name/Background/Text', this.node)
        this.contentText = cc.find('MsgBox/Content/Background/Text', this.node)
        this.buttonGroup = cc.find('MsgBox/Buttons', this.node)
        this.buttons.push(cc.find('ButtonA', this.buttonGroup))
        this.buttons.push(cc.find('ButtonB', this.buttonGroup))
        this.buttons.push(cc.find('ButtonC', this.buttonGroup))
        this.buttons.push(cc.find('ButtonD', this.buttonGroup))

        this.node.on('click', this.next)

        window['playScript'] = (name) => this.play(name)
        window['stopScript'] = () => this.close()

        this.node.active = false

        this.node.y -= 2000;

        if (this.afterLoad) this.afterLoad()
    }

    load(file: string) {
        cc.log(file)
        return new Promise((res, rej) => {
            cc.loader.loadRes(file, (err, obj) => {
                if (err) console.error(err)
                if (this.scripts) {
                    Object.keys(obj.json).forEach(e => {
                        this.scripts[e] = obj.json[e]
                        this.autoloadSpeaker(this.scripts[e])
                    })
                } else {
                    this.scripts = obj.json
                }
                res(this.scripts)
            })
        })
    }

    autoloadSpeaker(script) {
        return Promise.all(script.map(e => this.loadSpeakerImage(e.speaker)))
    }

    loadSpeakerImage(file: string) {
        return new Promise((res, rej) => {
            if (this.speakerImage && this.speakerImage[file]) res(this.speakerImage[file])
            cc.loader.loadRes('人物/' + file, cc.SpriteFrame, (err, obj) => {
                if (err) rej(err)
                if (!this.speakerImage) {
                    this.speakerImage = {}
                }
                this.speakerImage[file] = obj
                res(this.speakerImage)
            })
        })
    }

    play(script: string, force: boolean = false, init: number = 0) {
        if (!this.node) {
            this.afterLoad = () => this.play(script, force, init)
            return
        }
        if (this.node.active && !force) {
            cc.warn('reject to play script ' + script)
            return // reject to play another script if there already one playing
            // you can set force to true to force play
        }
        this.playing = script
        this.playingProcess = init
        if (this.scripts[this.playing] == undefined) return;
        if (this.scripts[this.playing] == null) return;
        this.node.active = true
        if (this.scripts[this.playing][this.playingProcess].selections) {
            // @ts-ignore
            this.select(this.scripts[this.playing][this.playingProcess])
        } else {
            // @ts-ignore
            this.normal(this.scripts[this.playing][this.playingProcess])
        }
        this.speaker.getComponent(cc.Sprite).spriteFrame = this.speakerImage[this.scripts[this.playing][this.playingProcess].speaker]
    }

    close() {
        this.node.active = false
    }

    next(evt) {
        evt.stopPropagation()
        if (this.scripts[this.playing][this.playingProcess].selections) {
            return false // reject play next if is in selection
        }
        this.playingProcess += 1

        if (this.scripts[this.playing].length <= this.playingProcess) {
            this.node.active = false
            return false
        } else if (this.scripts[this.playing][this.playingProcess].selections) {
            // @ts-ignore
            this.select(this.scripts[this.playing][this.playingProcess])
        } else {
            // @ts-ignore
            this.normal(this.scripts[this.playing][this.playingProcess])
        }
        this.speaker.getComponent(cc.Sprite).spriteFrame = this.speakerImage[this.scripts[this.playing][this.playingProcess].speaker]
        
        return true
    }

    normal(obj: { name: string, content: string, before?: string, end?: string }) {
        let hook: string
        if (hook = this.scripts[this.playing][this.playingProcess].start) {
            this.node.getComponent('MsgEvents')[hook]()
        }

        this.buttonGroup.active = false
        this.nameText.getComponent(cc.Label).string = obj.name
        this.contentText.getComponent(cc.Label).string = obj.content

        if (hook = this.scripts[this.playing][this.playingProcess].end) {
            this.node.getComponent('MsgEvents')[hook]()
        }
    }

    select(obj: { name: string, content: string, selections: Array<{ content: string, event: string, data?: any }>, before?: string, end?: string }) {
        let hook: string
        if (hook = this.scripts[this.playing][this.playingProcess].start) {
            this.node.getComponent('MsgEvents')[hook]()
        }

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
        
        if (hook = this.scripts[this.playing][this.playingProcess].end) {
            this.node.getComponent('MsgEvents')[hook]()
        }
    }

    update(dt) {
        this.nameText.parent.width = this.nameText.width
        this.contentText.parent.width = this.contentText.width
        this.contentText.parent.height = this.contentText.height
    }
}
