import React, { useEffect, useState } from 'react';
import { Modal } from 'react-native';
import { WebView } from 'react-native-webview';

const PROD_APP_URL = 'https://production.zage.dev/checkout';
const SB_APP_URL = 'https://sandbox.zage.dev/checkout';
const INFO_MODAL_URL = 'https://production.zage.dev/info'; //This is a place holder for the info modal

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

export const ZageInfoModal = ({ publicKey, showModal, setShowModal }: ZageInfoModalProps) => {
  const [jsResponse, setJsResponse] = useState<string>('');
  const getJsRes = async (publicKey: string) => {
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
      req.open('GET', 'infoModalPlaceHolder', true); //Change URL to Info Modal URL
      req.send(null);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (jsResponse === '') {
      getJsRes(publicKey);
    }
  }, [publicKey, jsResponse]);
  return (
    <Modal
      visible={showModal}
      transparent={true}
      animationType='none'
      presentationStyle='overFullScreen'
      style={{ backgroundColor: 'transparent' }}
    >
      <WebView
        source={{ uri: INFO_MODAL_URL }}
        javaScriptEnabled={true}
        injectedJavaScript={jsResponse}
        style={{ backgroundColor: 'transparent' }}
        onMessage={() => {
          setShowModal(false);
        }}
      />
    </Modal>
  );
};
