import { AppRegistry, Platform } from "react-native";
import { registerRootComponent } from "expo";
import App from "./App";

const appname = "windyotp"
if (Platform.OS == "android") {
    registerRootComponent(App);
} else {
    AppRegistry.registerComponent(appname, () => App);
}