import { useState } from "react";
import { View } from "react-native";
import { Dialog, Portal, Text, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const OfflineScreen = () => {
const [visible, setVisible] = useState(true);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  return (

      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Offline</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">You're not connected to the internet. Please connect to the internet to continue</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
  );
};

export default OfflineScreen;
