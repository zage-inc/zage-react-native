import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import { WebView } from "react-native-webview";

const PROD_APP_URL = "https://production.zage.dev/checkout";
const SB_APP_URL = "https://sandbox.zage.dev/checkout";

// Zage component properties
export interface ZageProps {
  publicKey: string;
  paymentToken: string;
  onComplete: (res: any) => void;
  onExit: () => void;
  showZage?: boolean;
  setShowZage: (b: boolean) => void;
  className?: string;
}

// Zage Component
export const Zage: React.FC<ZageProps> = props => {
  const {
    publicKey,
    paymentToken,
    onComplete,
    onExit,
    showZage,
    setShowZage
  } = props;

  const zageApp = publicKey.startsWith("sandbox_") ? SB_APP_URL : PROD_APP_URL;

  const [jsResponse, setJsResponse] = useState<string>("");

  const getJsRes = async () => {
    try {
      const req = new XMLHttpRequest();
      req.onreadystatechange = () => {
        const appendedJs =
          req.responseText +
          `
          openPayment('${paymentToken}', '${publicKey}')
          true
        `;
        setJsResponse(appendedJs);
      };
      req.open("GET", "http://localhost:3000/v0-rn.js", true);
      req.send(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getJsRes();
  }, []);

  return (
    <Modal
      visible={showZage}
      transparent={true}
      animationType="none"
      presentationStyle="overFullScreen"
      style={{ backgroundColor: "transparent" }}
    >
      <WebView
        source={{ uri: zageApp }}
        javaScriptEnabled={true}
        injectedJavaScript={jsResponse}
        style={{ backgroundColor: "transparent" }}
        onMessage={event => {
          const res = JSON.parse(event.nativeEvent.data);
          if (res.completed) {
            onComplete(res.response);
          } else {
            onExit();
          }
          setShowZage(false);
        }}
      />
    </Modal>
  );
};
