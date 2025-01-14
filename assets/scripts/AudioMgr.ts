import Game from "./Game";
import { ResourcesType } from "./ResourcesMgr";

const { ccclass, property } = cc._decorator;

/**
 * BGM、音效管理物件
 */
@ccclass
export default class AudioMgr extends cc.Component {
    /**BGM音量 */
    bgmVolume: number = 1.0;
    /**保留用BGM音量 */
    holdBgmVolume: number = 1.0;
    /**音效音量 */
    effectVolume: number = 1.0;
    /**保留用音效音量 */
    holdEffectVolume: number = 1.0;
    /**角色音效音量 */
    voiceVolume: number = 1.0;
    /**保留用角色音效音量 */
    holdVoiceVolume: number = 1.0;
    /**當前BGM_ID */
    bgmAudioID: number = -1;

    /**當前BGM資源路徑 */
    bgmUrl: string = "";
    /**BGM最大音量 */
    bgmMaxVolume: number = 0.5;
    /**漸入/出 BGM音量 */
    fadeVolume: number = 1.0;

    /**已播放音效暫存區 */
    cooldown = [];

    effectIdList: number[] = [];

    // use this for initialization
    init() {
        this.node = new cc.Node("AudioMgr");
        //cc.game.addPersistRootNode(this.node);
    }

    /**取得BGM/音效存放路徑 */
    getUrl(url) {
        return cc.url.raw("resources/sfx/" + url + ".mp3");
    }

    /**
     * 播放BGM
     * @param url BGM路徑
     */
    playBGM(url) {
        let audioUrl = this.getUrl(url);
        if (this.bgmUrl != "" && this.bgmUrl == audioUrl)
            return;

        this.bgmUrl = audioUrl;
        let fadeTime = 1.0;
        let seq = cc.sequence(
            cc.callFunc(() => {
                this.fadeBGM(false, fadeTime);
            }),
            cc.delayTime(fadeTime),
            cc.callFunc(() => {
                if (this.bgmAudioID > -1)
                    cc.audioEngine.stop(this.bgmAudioID);
                //ResourceMgr需管裡資源
                let clips = Game.Inst.resourcesMgr.load(url, ResourcesType.Music);
                if (cc.isValid(clips)) {
                    this.bgmAudioID = cc.audioEngine.play(clips, true, this.bgmVolume * this.bgmMaxVolume);
                }
                else {
                    cc.loader.load(audioUrl, function (err, clip) {
                        this.bgmAudioID = cc.audioEngine.play(clip, true, this.bgmVolume * this.bgmMaxVolume);
                    }.bind(this));
                }
                this.fadeBGM(true, fadeTime);
            }),
        );
        this.node.runAction(seq);
    }

    /**
     * 停止BGM
     */
    stopBGM() {
        cc.audioEngine.stop(this.bgmAudioID);
        this.bgmAudioID = -1;
        this.bgmUrl = "";
    }

    /**
     * 播放音效
     * @param url 音效路徑
     * @param loop 重複音效
     * @param volume 音效音量
     * @param playCallback 正確播放音效後提供播放音效之ID callback
     */
    playEffect(url, loop: boolean = false, volume = 1.0, playCallback?: (audioid: number) => void) {
        for (let i = 0; i < this.cooldown.length; i++) {
            if (this.cooldown[i] == url)
                return;
        }

        cc.log("playSFX: " + url);
        this.cooldown.push(url);
        setTimeout(() => {
            let idx = this.cooldown.indexOf(url);
            if (idx > -1)
                this.cooldown.splice(idx, 1);
        }, 0.5);

        let audioUrl = this.getUrl(url);
        if (this.effectVolume > 0) {
            //ResourceMgr需管裡資源
            let clips = Game.Inst.resourcesMgr.load(url, ResourcesType.Music);
            if (cc.isValid(clips)) {
                let audioId = cc.audioEngine.play(clips, loop, this.effectVolume * volume);
                this.effectIdList.push(audioId);
                if (!loop) {
                    cc.audioEngine.setFinishCallback(audioId, () => {
                        let idx = this.effectIdList.indexOf(audioId);
                        if (idx > -1)
                            this.effectIdList.splice(idx, 1);
                    })
                }
                if (playCallback != undefined) {
                    playCallback(audioId);
                }
            }
            else {
                cc.loader.load(audioUrl, function (err, clip) {
                    let audioId = cc.audioEngine.play(clip, loop, this.effectVolume * volume);
                    this.effectIdList.push(audioId);
                    if (!loop) {
                        cc.audioEngine.setFinishCallback(audioId, () => {
                            let idx = this.effectIdList.indexOf(audioId);
                            if (idx > -1)
                                this.effectIdList.splice(idx, 1);
                        })
                    }
                    if (playCallback != undefined) {
                        playCallback(audioId);
                    }
                }.bind(this));
            }
        }
    }

    /**
     * 關閉指定音效
     * @param audioid 音效ID
     */
    stopEffect(audioid: number) {
        let idx = this.effectIdList.indexOf(audioid);
        if (idx > -1) {
            this.effectIdList.splice(idx, 1);
            cc.audioEngine.stop(audioid);
        }
    }

    /**
     * 漸入/出 BGM
     * @param fadein 是否漸入BGM(預設為true)
     * @param fadeyime 執行時間
     */
    fadeBGM(fadein = true, fadeyime) {
        let interval = 0.05;
        let segment = fadeyime / interval;
        let tic = 1.0 / segment;
        this.fadeVolume = fadein ? 0 : 1.0;

        this.unscheduleAllCallbacks();
        this.schedule(() => {
            if (this.bgmAudioID > -1) {
                this.fadeVolume = this.fadeVolume + (fadein ? tic : -tic);
                cc.audioEngine.setVolume(this.bgmAudioID, this.bgmVolume * this.fadeVolume * this.bgmMaxVolume);

                if (this.bgmVolume * this.fadeVolume * this.bgmMaxVolume <= 0)
                    this.bgmVolume = 0;
            }
        }, interval, segment);
    }

    /**
     * 設置音效音量
     * @param ison 是否開啟
     */
    setEffectVolume(ison, volumn?: number) {
        if (ison != undefined) {
            this.effectVolume = ison ? this.holdEffectVolume : 0;
        }
        else {
            if (volumn != undefined) {
                this.effectVolume = volumn;
                this.holdEffectVolume = this.effectVolume;
            }
            else {
                this.effectVolume = 0;
            }
        }
    }

    /**
     * 設置音效音量
     * @param ison 是否開啟
     */
    setVoiceVolume(ison, volumn?: number) {
        if (ison != undefined) {
            this.voiceVolume = ison ? this.holdVoiceVolume : 0;
        }
        else {
            if (volumn != undefined) {
                this.voiceVolume = volumn;
                this.holdVoiceVolume = this.voiceVolume;
            }
            else {
                this.voiceVolume = 0;
            }
        }
    }

    /**
     * 設置BGM音量
     * @param ison 是否開啟
     */
    setBGMVolume(ison, volumn?: number) {
        if (ison != undefined) {
            this.bgmVolume = ison ? this.holdBgmVolume : 0;
        }
        else {
            if (volumn != undefined) {
                this.bgmVolume = volumn;
                this.holdBgmVolume = this.bgmVolume;
            }
            else {
                this.bgmVolume = 0;
            }
        }

        if (this.bgmAudioID >= 0)
            this.fadeBGM((this.bgmVolume > 0), 0.35);
    }

    /**
     * 暫停播放全部BGM/音效/人聲
     */
    pauseAll() {
        cc.audioEngine.pauseAll();
    }

    /**
     * 回復播放全部BGM/音效/人聲
     */
    resumeAll() {
        cc.audioEngine.resumeAll();
    }
}
