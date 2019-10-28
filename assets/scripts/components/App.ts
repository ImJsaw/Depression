export default abstract class App extends cc.Component {
    
    private appName : string = "";

    abstract startApp();

    abstract endApp();
}
