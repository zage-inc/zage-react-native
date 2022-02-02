"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zage = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_webview_1 = require("react-native-webview");
const PROD_APP_URL = "https://production.zage.dev/checkout";
const SB_APP_URL = "https://sandbox.zage.dev/checkout";
// Zage Component
const Zage = props => {
    const { publicKey, paymentToken, onComplete, onExit, showZage, setShowZage } = props;
    const zageApp = publicKey.startsWith("sandbox_") ? SB_APP_URL : PROD_APP_URL;
    const [jsResponse, setJsResponse] = (0, react_1.useState)("");
    const getJsRes = async () => {
        try {
            const req = new XMLHttpRequest();
            req.onreadystatechange = () => {
                const appendedJs = req.responseText +
                    `
          openPayment('${paymentToken}', '${publicKey}')
          true
        `;
                setJsResponse(appendedJs);
            };
            req.open("GET", "http://localhost:3000/v0-rn.js", true);
            req.send(null);
        }
        catch (error) {
            console.error(error);
        }
    };
    (0, react_1.useEffect)(() => {
        getJsRes();
    }, []);
    return (<react_native_1.Modal visible={showZage} transparent={true} animationType="none" presentationStyle="overFullScreen" style={{ backgroundColor: "transparent" }}>
      <react_native_webview_1.WebView source={{ uri: zageApp }} javaScriptEnabled={true} injectedJavaScript={jsResponse} style={{ backgroundColor: "transparent" }} onMessage={event => {
            const res = JSON.parse(event.nativeEvent.data);
            if (res.completed) {
                onComplete(res.response);
            }
            else {
                onExit();
            }
            setShowZage(false);
        }}/>
    </react_native_1.Modal>);
};
exports.Zage = Zage;
