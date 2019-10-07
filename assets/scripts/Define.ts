
export enum GameState {
    None = 0,
    Mobile,
    Reality,
    PostWorld,
    End
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
    
}