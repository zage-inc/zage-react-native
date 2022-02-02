## Zage React Native SDK
The Zage react-native package provides a lightweight react component that makes it easy to implement Zage as a payment method into your react-native application. 

## Author

Zage Inc (tryzage.com)

## License

The Zage React Native SDK is available under the MIT license

### Installation 

To install the Zage react-native package, make sure you have npm installed and type in the following command into your application's root directory:
    
```markdown
npm install @zage/zage-react-native 
```
    
Import the Zage component into your application:

```jsx
import { Zage }  from '@zage/zage-react-native' 
```

### Implementation

First, create a state hook that represents when the Zage component will show and set its default value to false. 

```jsx
const [showZage, setShowZage] = useState<boolean>(false);
```

Next, insert the Zage component anywhere into your checkout flow's screen (this component will stay invisible until showZage is set to true), and populate its props with your public key, payment token (obtained from your backend), onComplete callback, onExit callback, and your showZage state and state setter. Not that the onComplete's "res" parameter contains the object returned from the webhook you passed in to create your payment token. 

```jsx
<Zage
	publicKey='<PUBLIC_KEY>'
	paymentToken='<PAYMENT_TOKEN'
	onComplete={(res: any) => {
		// insert onComplete functionality here 
	}}
	onExit={() => {
		// insert on exit functionality here 
	}} 
	showZage={showZage}
	setShowZage={setShowZage}
/>
```

Finally, in the handler you'll use to open the Zage payment flow, set the showZage state to true, along with any other functionality you wish to include. 

```jsx
<Button 
	title='Pay with Zage' 
	onPress={() => {
		setShowZage(true)
		// insert any other functionality you want to include here 
	}}
/>
```

And that's it! With just the Zage component, a state hook, and a button you can integrate Zage into your react-native application. Here is an example with all of the pieces put together in one place: 

### Full Implementation Example

```tsx
import React, { useState } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { Zage }  from '@zage/zage-react-native'

export default function App() {
	// Declare showZage hook 
  const [showZage, setShowZage] = useState<boolean>(false);

  return (
      <View style={styles.container}>
		{/* Button that opens Zage payment flow */}
        <Button title='Pay with Zage' onPress={() => setShowZage(true)}/>
		{/* Zage component with necessary props */}        
		<Zage
          publicKey='<PUBLIC_KEY>'
          paymentToken='<PAYMENT_TOKEN'
          onComplete={(res: any) => 
			// Callback for when user completes payment flow
			console.log(`I completed a payment: ${res}`
		  )}
          onExit={() => 
			// Callback for when user exits payment flow
			console.log(`I exited a payment`)
		  )} 
			// Insert showZage state 
          showZage={showZage}
          // Insert showZage state setter 
	      setShowZage={setShowZage}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
```