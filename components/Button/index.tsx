import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { colors } from "../../theme/color";

type Props = {
  title: string;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  icon?: React.ReactNode;
  outline?: boolean;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
};

export default function AfsButton({
  onPress,
  onPressIn,
  onPressOut,
  title,
  icon,
  outline,
  disabled,
  style,
  textStyle,
}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={({ pressed }) => [
        styles.button,
        outline ? styles.buttonOutline : styles.buttonSolid,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      android_ripple={{ color: "#00000020", borderless: false }}
      hitSlop={8}
    >
      {icon}
      <Text
        style={[
          styles.buttonText,
          outline ? styles.buttonTextOutline : styles.buttonTextSolid,
          disabled && styles.textDisabled,
          textStyle,
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  buttonSolid: {
    backgroundColor: colors.primary,
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.primary,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },

  buttonText: {
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
  },
  buttonTextSolid: {
    color: colors.white,
  },
  buttonTextOutline: {
    color: colors.primary,
  },
  textDisabled: {
    color: "#ffffffcc",
  },
});
