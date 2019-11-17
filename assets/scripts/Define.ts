
export enum GameState {
    None = 0,
    Mobile,
    Reality,
    PostWorld,
    End
}

export enum NotifyType {
    None = 0,
    Line,
    IG,
    Map
}

export enum Apps{
    None = 0,
    Lime,
    IG,
    Map,
    Photo,
    Sceduler
}

export class GameInfo{
    private static instance: GameInfo = null;

    static get Inst(): GameInfo{
        if(!GameInfo.instance){
            GameInfo.instance = new GameInfo();
        }
        return this.instance;
    }
    endGame: boolean = false;
}

export default class Converter {
    //convert enum and string

    /**
     * return app name below icon
     * @param appID 
     */
    static getAppName( appID : Apps){
        switch(appID){
            case Apps.Lime:
                return "line";
            case Apps.IG:
                return "instagram";
            case Apps.Map:
                return "map";
            case Apps.Photo:
                return "photo";
            case Apps.Sceduler:
                return "scheduler";
        }
        cc.warn("[Converter] wrong app name");
        return "";
    }

    /**
     * return img name for resourseMgr
     * @param appID 
     */
    static getAppIconName( appID : Apps){
        switch(appID){
            case Apps.Lime:
                return "icon_lime";
            case Apps.IG:
                return "icon_instagram";
            case Apps.Map:
                return "icon_map";
            case Apps.Photo:
                return "icon_photo";
            case Apps.Sceduler:
                return "icon_scheduler";
        }
        cc.warn("[Converter] wrong appIcon name");
        return "";
    }
    
}