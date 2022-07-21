import React from 'react';
import { KeyboardAvoidingView, Linking, Modal, Platform, SafeAreaView } from 'react-native';
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
const baseJs = `function _0x6878(_0x617b3f,_0x1e0243){const _0x3c6044=_0x3c60();return _0x6878=function(_0x68784a,_0x5e0cb5){_0x68784a=_0x68784a-0xb9;let _0x5e50b7=_0x3c6044[_0x68784a];return _0x5e50b7;},_0x6878(_0x617b3f,_0x1e0243);}(function(_0xe92109,_0x289e62){const _0x402ef7=_0x6878,_0x5120cd=_0xe92109();while(!![]){try{const _0x397a12=parseInt(_0x402ef7(0xbc))/0x1*(parseInt(_0x402ef7(0xbf))/0x2)+parseInt(_0x402ef7(0xd3))/0x3+-parseInt(_0x402ef7(0xc9))/0x4*(-parseInt(_0x402ef7(0xe8))/0x5)+-parseInt(_0x402ef7(0xc6))/0x6*(parseInt(_0x402ef7(0xea))/0x7)+parseInt(_0x402ef7(0xba))/0x8+parseInt(_0x402ef7(0xce))/0x9*(-parseInt(_0x402ef7(0xd6))/0xa)+-parseInt(_0x402ef7(0xdd))/0xb;if(_0x397a12===_0x289e62)break;else _0x5120cd['push'](_0x5120cd['shift']());}catch(_0x340aa7){_0x5120cd['push'](_0x5120cd['shift']());}}}(_0x3c60,0x40bfc),removeIFrame=()=>{const _0x400e21=_0x6878,_0x4ad1a3=document[_0x400e21(0xe5)](_0x400e21(0xe4));_0x4ad1a3&&_0x4ad1a3[_0x400e21(0xe1)]&&(_0x4ad1a3[_0x400e21(0xe1)][_0x400e21(0xc7)](_0x4ad1a3),document[_0x400e21(0xbd)][_0x400e21(0xe2)]['overflow']=_0x400e21(0xd0));},openPayment=(_0x1c54c9,_0x563df6)=>{const _0x566a65=_0x6878;if(!_0x1c54c9)return;const _0x366c81=_0x566a65(0xe0),_0x15dc12=_0x566a65(0xda),_0x29ce1a=_0x563df6['startsWith'](_0x566a65(0xcb))?_0x15dc12:_0x366c81,_0xaf4c2a=document[_0x566a65(0xc8)](_0x566a65(0xcd));_0xaf4c2a[_0x566a65(0xb9)]=_0x29ce1a,_0xaf4c2a['id']=_0x566a65(0xe4),_0xaf4c2a[_0x566a65(0xe2)][_0x566a65(0xc1)]=_0x566a65(0xd5),_0xaf4c2a[_0x566a65(0xe2)]['bottom']='0',_0xaf4c2a['style']['top']='0',_0xaf4c2a[_0x566a65(0xe2)][_0x566a65(0xe3)]='0',_0xaf4c2a[_0x566a65(0xe2)][_0x566a65(0xcf)]='0',_0xaf4c2a[_0x566a65(0xe2)][_0x566a65(0xd9)]='100%',_0xaf4c2a[_0x566a65(0xe2)][_0x566a65(0xde)]=_0x566a65(0xc4),_0xaf4c2a[_0x566a65(0xe2)][_0x566a65(0xe6)]=_0x566a65(0xd4),document[_0x566a65(0xbd)][_0x566a65(0xbe)](_0xaf4c2a),messageListener=_0x55f259=>{const _0x140ebd=_0x566a65,_0x3766dc=_0x55f259[_0x140ebd(0xd1)];if(_0x3766dc[_0x140ebd(0xdc)]&&_0xaf4c2a[_0x140ebd(0xe9)])_0xaf4c2a['contentWindow'][_0x140ebd(0xbb)]({'publicKey':_0x563df6,'token':_0x1c54c9},_0x29ce1a);else _0x3766dc[_0x140ebd(0xd2)]&&(removeIFrame(),window['removeEventListener']('message',messageListener),_0x3766dc['completed']?window['ReactNativeWebView'][_0x140ebd(0xbb)](JSON[_0x140ebd(0xc0)]({'completed':!![],'response':_0x3766dc[_0x140ebd(0xca)]})):window[_0x140ebd(0xdf)][_0x140ebd(0xbb)](JSON[_0x140ebd(0xc0)]({'completed':![],'response':{}})));},window[_0x566a65(0xe7)](_0x566a65(0xdb),messageListener);},openModal=_0x911f83=>{const _0x3cc441=_0x6878,_0x4b1eb0=_0x3cc441(0xd8),_0x5e9978=_0x3cc441(0xcc),_0x521529=_0x911f83[_0x3cc441(0xc3)](_0x3cc441(0xcb))?_0x5e9978:_0x4b1eb0,_0x26982b=document['createElement'](_0x3cc441(0xcd));_0x26982b[_0x3cc441(0xb9)]=_0x521529,_0x26982b['id']=_0x3cc441(0xe4),_0x26982b['style'][_0x3cc441(0xc1)]='absolute',_0x26982b['style'][_0x3cc441(0xd7)]='0',_0x26982b[_0x3cc441(0xe2)][_0x3cc441(0xc2)]='0',_0x26982b[_0x3cc441(0xe2)][_0x3cc441(0xe3)]='0',_0x26982b['style']['right']='0',_0x26982b[_0x3cc441(0xe2)][_0x3cc441(0xd9)]=_0x3cc441(0xc4),_0x26982b[_0x3cc441(0xe2)][_0x3cc441(0xde)]=_0x3cc441(0xc4),_0x26982b[_0x3cc441(0xe2)][_0x3cc441(0xe6)]=_0x3cc441(0xd4),document[_0x3cc441(0xbd)][_0x3cc441(0xbe)](_0x26982b),messageListener=_0x317e8f=>{const _0x5d31e3=_0x3cc441,_0x906dff=_0x317e8f[_0x5d31e3(0xd1)];if(_0x906dff['start']&&_0x26982b[_0x5d31e3(0xe9)])_0x26982b[_0x5d31e3(0xe9)][_0x5d31e3(0xbb)]({'publicKey':_0x911f83},_0x521529);else _0x906dff['close']&&(removeIFrame(),window[_0x5d31e3(0xc5)]('message',messageListener),window[_0x5d31e3(0xdf)]['postMessage']([]));},window[_0x3cc441(0xe7)](_0x3cc441(0xdb),messageListener);});function _0x3c60(){const _0x202721=['style','left','zg-iframe','getElementById','border','addEventListener','11895XhieKs','contentWindow','7wybKnH','src','2151760OpRQKO','postMessage','5YezDwG','body','append','107546wUSpzF','stringify','position','top','startsWith','100%','removeEventListener','1361226XXahPa','removeChild','createElement','856hujWSF','response','sandbox_','https://info.sandbox.zage.dev/','iframe','404739ScOBRu','right','inherit','data','close','418395SzGWps','none','absolute','20LbcCcr','bottom','https://info.zage.dev/','width','https://sandbox.zage.dev/checkout','message','start','6648191zyDeCl','height','ReactNativeWebView','https://production.zage.dev/checkout','parentNode'];_0x3c60=function(){return _0x202721;};return _0x3c60();}`;

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
  const jsResponse =
    baseJs +
    `
    const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
    if(!document.querySelector('#zg-iframe')){
      openPayment('${paymentToken}', '${publicKey}')
    }
    true
  `;

  if (!showZage) {
    return <></>;
  }
  return (
    <Modal
      visible={showZage}
      transparent={false}
      animationType='none'
      presentationStyle='overFullScreen'
      style={{ backgroundColor: 'transparent' }}
    >
      <SafeAreaView style={{ flex: 0, backgroundColor: '#1F2937', opacity: 0.75 }} />
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <WebView
          source={{ uri: zageApp }}
          javaScriptEnabled={true}
          injectedJavaScript={jsResponse}
          style={{ backgroundColor: 'transparent', resizeMode: 'contain' }}
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
      </KeyboardAvoidingView>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#1F2937', opacity: 0.75 }} />
    </Modal>
  );
};

export const ZageInfoModal = ({ publicKey, showModal, setShowModal }: ZageInfoModalProps) => {
  const ZageInfoModalURL = publicKey.startsWith('sandbox_') ? SB_INFO_MODAL_URL : INFO_MODAL_URL;
  const jsResponse =
    baseJs +
    `
    if(!document.querySelector('#zg-iframe')){
      openModal('${publicKey}')
    }
    true
  `;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let webview: any;
  return (
    <Modal
      visible={showModal}
      transparent={true}
      presentationStyle='overFullScreen'
      style={{
        backgroundColor: 'transparent',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      animationType='slide'
    >
      <WebView
        ref={(ref) => (webview = ref)}
        useWebKit={true}
        height={'100%'}
        width={'100%'}
        source={{ uri: ZageInfoModalURL }}
        javaScriptEnabled={true}
        injectedJavaScript={jsResponse}
        style={{
          resizeMode: 'contain',
          backgroundColor: 'white',
          marginTop: 50,
          borderColor: 'black',
          borderWidth: 5,
          borderRadius: 40,
        }}
        onMessage={() => {
          setShowModal(false);
        }}
        onNavigationStateChange={(_) => {
          if (_.url !== ZageInfoModalURL && Platform.OS === 'ios') {
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
