import React, { useEffect, useState } from 'react';
import { Linking, Modal, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

const PROD_APP_URL = 'https://production.zage.dev/checkout';
const SB_APP_URL = 'https://sandbox.zage.dev/checkout';
const INFO_MODAL_URL = 'https://info.zage.dev/';
const SB_INFO_MODAL_URL = 'https://info.sandbox.zage.dev/';

// Zage component properties
export interface ZageProps {
  publicKey: string;
  paymentToken: string;
  onComplete: (res: Record<string, unknown>) => void;
  onExit: () => void;
  showZage: boolean;
  setShowZage: (b: boolean) => void;
  className?: string;
}

export interface ZageInfoModalProps {
  publicKey: string;
  showModal: boolean;
  setShowModal: (b: boolean) => void;
}

// Zage Component
export const Zage = ({
  publicKey,
  paymentToken,
  onComplete,
  onExit,
  showZage,
  setShowZage,
}: ZageProps) => {
  const zageApp = publicKey.startsWith('sandbox_') ? SB_APP_URL : PROD_APP_URL;

  const [jsResponse, setJsResponse] = useState<string>('');

  const getJsRes = async (zagePaymentToken: string) => {
    try {
      const req = new XMLHttpRequest();
      req.onreadystatechange = () => {
        const appendedJs =
          req.responseText +
          `
          openPayment('${zagePaymentToken}', '${publicKey}')
          true
        `;
        setJsResponse(appendedJs);
      };
      req.open('GET', 'https://api.zage.dev/v0/v0-rn.js', true);
      req.send(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (jsResponse === '' && paymentToken && paymentToken.startsWith('py_')) {
      getJsRes(paymentToken);
    }
  }, [paymentToken, jsResponse]);

  return (
    <Modal
      visible={showZage}
      transparent={true}
      animationType='none'
      presentationStyle='overFullScreen'
      style={{ backgroundColor: 'transparent' }}
    >
      <WebView
        source={{ uri: zageApp }}
        javaScriptEnabled={true}
        injectedJavaScript={jsResponse}
        style={{ backgroundColor: 'transparent' }}
        onMessage={(event) => {
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

export const ZageInfoModal = ({
  publicKey,
  showModal,
  setShowModal,
}: ZageInfoModalProps) => {
  const ZageInfoModalURL= publicKey.startsWith('sandbox_') ? SB_INFO_MODAL_URL : INFO_MODAL_URL;
  const [jsResponse, setJsResponse] = useState<string>("");
  let webview:any;
  const getJsRes = async () => {
    try {
      const req = new XMLHttpRequest();
      req.onreadystatechange = () => {
        const appendedJs =
          req.responseText +
          `
          openModal('${publicKey}')
          true
        `;
        setJsResponse(appendedJs);
      };
      req.open(
        "GET",
        "https://api.zage.dev/v0/v0-rn.js",
        true
      ); //Change URL to Info Modal URL
      req.send(null);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (jsResponse === "") {
      getJsRes();
    }
  }, [jsResponse]);
  return (
    <Modal
      visible={showModal}
      transparent={true}
      presentationStyle="overFullScreen"
      style={{
        backgroundColor: "transparent",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      animationType="slide"
    >
      <WebView
        ref={(ref) => (webview = ref)}
        useWebKit={true}
        height={"100%"}
        width={"100%"}
        source={{ uri: ZageInfoModalURL }}
        javaScriptEnabled={true}
        injectedJavaScript={jsResponse}
        style={{
          resizeMode: "contain",
          backgroundColor: "white",
          marginTop: 50,
          borderColor: "black",
          borderWidth: 5,
          borderRadius: 40,
        }}
        onMessage={() => {
          setShowModal(false);
        }}
        onNavigationStateChange={(_) => {
          if (_.url !== ZageInfoModalURL && Platform.OS === "ios") {
            webview.stopLoading();
            Linking.openURL(_.url)
              .then(() => null)
              .catch(() => null);
          }
        }}
      />
    </Modal>
  );
};
