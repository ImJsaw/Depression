import Game from "./Game";
import * as Define from "./Define";

const { ccclass, property } = cc._decorator;

/**需預讀取場景 */
export enum ResourceIndex {
    Game = 1
}

/**prelaod資源型態 */
export enum ResourcesType {
    None = 0,
    /**2D貼圖 */
    Texture,
    /**連續圖動畫 */
    SequenceClip,
    /**Spine動畫 */
    Spine,
    /**音樂、音效、人聲 */
    Music
}

/**
 * 動態資源管理物件
 */
@ccclass
export default class ResourcesMgr extends cc.Component {
    /**當前已讀取的檔案存放區 */
    private textures = {};
    private sequences = {};
    private musics = {};
    private LineStates : Define.State[] = null;
    private IGStates : Define.State[] = null;
    private LineLogs : Define.LineLog[] = null;
    private IGPosts : Define.IGpost[] = null;
    /**各場景須預讀取的檔案列表 */
    private assetList = {};

    constructor() {
        super();

        let list = [];
        let obj = {};
        let url = "text/preload.json";

        // ResourceIndex.Game
        list = [];
        cc.loader.loadRes(url, (err, res) => {
            if (cc.isValid(err)) {
                cc.error("[ResourceMgr]: " + err);
                return;
            }

            let JsonObj: JSON = res["json"];

            //Texture
            for (let index = 0; index < JsonObj["Texture"].length; index++) {
                obj = { type: ResourcesType.Texture, name: JsonObj["Texture"][index] };
                list.push(obj);
            }

            //Sequence Anim
            for (let index = 0; index < JsonObj["SequenceClip"].length; index++) {
                obj = { type: ResourcesType.SequenceClip, path: JsonObj["SequenceClip"][index]["path"], name: JsonObj["SequenceClip"][index]["name"] };
                list.push(obj);
            }

            //Music
            for (let index = 0; index < JsonObj["Music"].length; index++) {
                obj = { type: ResourcesType.Music, name: JsonObj["Music"][index] };
                list.push(obj);
            }

            this.assetList[ResourceIndex.Game] = list;
        });

        // cc.game.addPersistRootNode(this.node);
    }

    /**
     * 讀取指定場景所需的動態資源
     * @param idx 指定場景ID
     * @param onloading loading中途觸發事件
     */
    preload(idx: ResourceIndex, onloading: Function = undefined) {
        cc.log("ResourceMgr.preload mobile content");
        let url = "text/mobile.json";
        cc.loader.loadRes(url, (err, res) => {
            if (cc.isValid(err)) {
                cc.error("[ResourceMgr]: " + err);
                return;
            }

            let cont : Define.MobileContent = res["json"];
            cc.log("load mobile content : ");
            cc.log(cont);
            this.LineStates = cont.LineState;
            this.LineLogs = cont.LineLogs;
            this.IGStates = cont.IGState;
            this.IGPosts = cont.IGPosts;
            cc.log(this.LineStates);

        });
        
        cc.log("ResourcesMgr.preload texture");
        let assetListComplete = 0;
        let assetList: [string] = this.assetList[idx.toString()];
        if (assetList != undefined) {
            for (let i = 0; i < assetList.length; i++) {
                switch (assetList[i]["type"]) {
                    case ResourcesType.Texture:
                        cc.loader.loadResDir("textures/" + assetList[i]["name"], cc.SpriteFrame,
                            (completedCount, totalCount, item) => { },
                            (err, assets) => {
                                for (let i = 0; i < assets.length; i++) {
                                    //cc.log("check " + assets[i].name);   
                                    if (this.textures[assets[i].name] == null) {
                                        this.textures[assets[i].name] = assets[i];
                                        cc.log("[[Resources]] " + assets[i].name + " loaded.");
                                    }
                                }

                                assetListComplete++;
                                if (onloading != undefined)
                                    onloading(assetListComplete / assetList.length);
                            }
                        );
                        break;
                    case ResourcesType.SequenceClip:
                        cc.loader.loadResDir("animations/" + assetList[i]["path"] + "/" + assetList[i]["name"], cc.SpriteFrame,
                            (completedCount, totalCount, item) => { },
                            (err, assets) => {
                                let sequenceresources = [];
                                for (let i = 0; i < assets.length; i++) {
                                    sequenceresources.push(assets[i]);
                                }
                                sequenceresources.sort((n1, n2) => {
                                    let num1 = parseInt(n1.name.split("_", 2)[1]), num2 = parseInt(n2.name.split("_", 2)[1]);
                                    if (num1 > num2) return 1;
                                    else if (num1 < num2) return -1;
                                    else return 0;
                                });

                                let clip = cc.AnimationClip.createWithSpriteFrames(<[cc.SpriteFrame]>sequenceresources, sequenceresources.length);
                                clip.name = assetList[i]["name"];

                                if (this.sequences[assetList[i]["name"]] == null) {
                                    this.sequences[assetList[i]["name"]] = clip;
                                    cc.log("[[Resources]] " + assetList[i]["name"] + " loaded.");
                                }

                                assetListComplete++;

                                if (onloading != undefined)
                                    onloading(assetListComplete / assetList.length);
                            }
                        );
                        break;
                    case ResourcesType.Music:
                        cc.loader.load(cc.url.raw("resources/sfx/" + assetList[i]["name"] + ".mp3"), function (err, clip) {

                            if (this.musics[assetList[i]["name"]] == null) {
                                this.musics[assetList[i]["name"]] = clip;
                                cc.log("[[Resources]] " + assetList[i]["name"] + " loaded.");
                            }

                            assetListComplete++;
                            if (onloading != undefined)
                                onloading(assetListComplete / assetList.length);
                        }.bind(this));
                        break;
                }
            }
        }
        else {
            onloading(1);
        }

    }

    /**return cur line logs */
    getLineLog(){
        let logs : Define.LineLog[] = [];
        this.LineStates[Define.GameInfo.Inst.curLineState].index.forEach((element)=>{
            cc.log("cur : "+element);
            logs.push(this.LineLogs[element]);
        });
        return logs;
    }

    getIGPost( id : number){
        let posts : Define.IGpost[] = [];
        this.IGStates[Define.GameInfo.Inst.curIGState].index.forEach((element)=>{
            if(this.IGPosts[element].accountID == id){
                posts.push(this.IGPosts[element]);
            }
        });
        return posts;
    }

    /**
     * 取得已讀取進遊戲的動態資源
     * @param name 動態資源名稱
     */
    load(name: string, type: ResourcesType = ResourcesType.Texture) {
        switch (type) {
            case ResourcesType.Texture:
                if (name in this.textures) {
                    cc.log("[Resources] Load Texture: " + name + " success");
                    return this.textures[name];
                }
                else cc.log("[Resources] cannot find" + name);
                break;
            case ResourcesType.SequenceClip:
                if (name in this.sequences) {
                    cc.log("[Resources] Load Sequences: " + name + " success");
                    return this.sequences[name];
                }
                break;
            case ResourcesType.Music:
                if (name in this.musics) {
                    cc.log("[Resources] Load Music: " + name + " success");
                    return this.musics[name];
                }
                break;
        }
        return undefined;
    }

    /**
     * 載入並播放連續圖動畫
     * @param animator 動畫播放器
     * @param path 片段(資料夾)路徑
     * @param clipname 片段(資料夾)名稱
     * @param speed 播放速度
     * @param loop 是否重複播放
     */
    loadSequenceAnumation(animator: cc.Animation, path: string = "Sequence", clipname: string, speed: number = 1.0, loop: boolean = false) {
        let clipIsLoaded: cc.AnimationClip = Game.Inst.resourcesMgr.load(clipname, ResourcesType.SequenceClip);
        if (clipIsLoaded != undefined) {
            clipIsLoaded.speed = speed;
            clipIsLoaded.wrapMode = loop ? cc.WrapMode.Loop : cc.WrapMode.Default;
            animator.addClip(clipIsLoaded);
            animator.play(clipname);
        }
        else {
            cc.loader.loadResDir("animations/" + path + "/" + clipname, cc.SpriteFrame,
                (completedCount, totalCount, item) => { },
                (err, assets) => {
                    let sequenceresources = [];
                    for (let i = 0; i < assets.length; i++) {
                        sequenceresources.push(assets[i]);
                    }
                    sequenceresources.sort((n1, n2) => {
                        let num1 = parseInt(n1.name.split("_", 2)[1]), num2 = parseInt(n2.name.split("_", 2)[1]);
                        if (num1 > num2) return 1;
                        else if (num1 < num2) return -1;
                        else return 0;
                    });

                    let clip = cc.AnimationClip.createWithSpriteFrames(<[cc.SpriteFrame]>sequenceresources, sequenceresources.length);
                    clip.name = clipname;

                    this.sequences[clipname] = clip;
                    cc.log("[[Resources]] " + clipname + " loaded.");

                    clip.speed = speed;
                    clip.wrapMode = loop ? cc.WrapMode.Loop : cc.WrapMode.Default;
                    animator.addClip(clip);
                    animator.play(clipname);
                }
            );
        }
    }
}
