import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  RadioButton,
  TextInput,
} from 'react-native-paper';
import STText from '../STComponents/STText';

export default function STPicker({
  style,
  items,
  value,
  title,
  placeholder,
  setValue,
}) {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  return (
    <View style={style}>
      <TextInput
        mode="outlined"
        placeholder={placeholder}
        editable={false}
        value={value.label}
        right={<TextInput.Icon icon="chevron-down" onPress={showDialog} />}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            {items.map((item, index) => (
              <TouchableOpacity
                className="flex-row items-center my-2"
                key={item.value + index}
                onPress={() => setValue(item)}>
                <RadioButton
                  value={item.value}
                  onPress={() => setValue(item)}
                  status={value.value === item.value ? 'checked' : 'unchecked'}
                />
                <STText className="text-lg text-black">{item.label}</STText>
              </TouchableOpacity>
            ))}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Xong</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
