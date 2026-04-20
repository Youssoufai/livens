import { PropsWithChildren } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const KeyboardScrollView = ({
  children,
  style,
}: {
  style?: ViewStyle;
} & PropsWithChildren) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.container, style]}
      showsVerticalScrollIndicator={false}
      bottomOffset={25}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1 },
});

export default KeyboardScrollView;
