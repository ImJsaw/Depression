import Game, { GameID } from "./Game";
import { GameState } from "./MainStateMgr";

/**
 * 純邏輯通用功能物件
 */
export default class MiscHelper {

    /**
     * 取得場景名稱
     * @param mainstate 主場景狀態
     * @param gameid 遊戲場景ID(僅在轉換到GameState.Game時需要使用)
     */
    static getSceneName(mainstate: number) {
        switch (mainstate) {
            case GameState.Start: return "scene_start";
            case GameState.Loading: return "scene_loading";
            case GameState.Game: return "scene_game";
            case GameState.End: return "scene_end";
            default:
                cc.error("receiving wrong index of main state.");
                return "scene_start";
        }
    }

    /**
     * 產生隨機數字
     * @param min 最小值(有包含)
     * @param max 最大值(有包含)
     */
    static randomInt(min, max): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * 取得反插植結果(回傳0~1之間的數)
     * @param min 最小值
     * @param max 最大值
     * @param ratio ratio between min and max
     */
    static inverseLerp(min, max, ratio): number {
        return cc.misc.clamp01(ratio - min / max - min);
    }

    /**
     * 取得4捨5入數值
     * @param num 原數值
     * @param decimals 4捨5入位數
     */
    static roundDown(num: number, decimals: number){
        decimals = decimals || 0;
        if (num < 0) {
            return - Math.floor( Math.floor( Math.abs(num) * 1000 ) / 10 ) / 100;
        } else {  
            return Math.floor( Math.floor( num * 1000 ) / 10 ) / 100;
        }
    }
    
}