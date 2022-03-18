import React, { Component } from 'react';
import { StyleSheet, Button, View } from 'react-native';


import { Zage } from '@zage/zage-react-native'

export default class App extends Component<{}, {
  showZage: boolean;
}>{
  // const isLoadingComplete = useCachedResources();

  // const [showZage, setShowZage] = useState<boolean>(false);
  // if (!isLoadingComplete) {
  //   return null;
  // } else {
  constructor(props: any) {
    super(props);
    this.state = {
      showZage: false
    } 
  }
  setShowZage(b: boolean) {
    this.setState({
      showZage: b
    })
  }
  render () {
    const { showZage } = this.state
    return (
      <View style={styles.container}>
        {/* Button that opens Zage payment flow */}
        <Button title="Pay with Zage" onPress={() => this.setShowZage(true)}/>
          {/* Zage component with necessary props */} 
          <Zage
            publicKey="sandbox_key_60jp0v85tbpwev8p"
            paymentToken="tk_5114a252-a28e-4f81-a00b-d18bd1d452b0"
            onComplete={(res: any) => {
              console.log(res)
            }}
            onExit={() => {
              console.log('Exited payment')
            }}
            showZage={showZage} //
            setShowZage={this.setShowZage}
          />
      </View> 
    )
  }
  // }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
});

