import { colors } from "@/theme/color";
import React, { useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const COLORS = {
  border: "#AFB1B6",
  text: "#61646B",
  hint: "#61646B",
  bg: colors.white,
  borderActive: colors.primary,
};

type Props = {
  label: string;
  value?: string;
  onChangeText?: any;
  onSubmitEditing?: () => void;
  secureTextEntry?: boolean;
  ref?: React.Ref<TextInput>;
  autoCorrect?: boolean;
  autoCapitalize?: string;
  keyboardType?: string;
  returnKeyType?: string;
} & TextInputProps;

export default function Input({
  label,
  value,
  style,
  onChangeText,
  autoCorrect,
  keyboardType,
  returnKeyType,
  onSubmitEditing,
  autoCapitalize,
  secureTextEntry,
  ref,
  ...props
}: Props) {
  const [focused, setFocused] = useState(false);

  const focusProg = useSharedValue(0);

  useDerivedValue(() => {
    const hasText = (value ?? "").length > 0;
    focusProg.value = withTiming(focused || hasText ? 1 : 0, { duration: 180 });
  }, [focused, value]);

  const labelStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: 12,
      paddingHorizontal: 6,
      top: interpolate(focusProg.value, [0, 1], [18, -10]),
      fontSize: interpolate(focusProg.value, [0, 1], [16, 12]),
      color: interpolateColor(
        focusProg.value,
        [0, 1],
        [COLORS.hint, COLORS.text]
      ),
      backgroundColor: COLORS.bg,
    };
  });

  const wrapStyle = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        focusProg.value,
        [0, 1],
        [COLORS.border, COLORS.borderActive]
      ),
    };
  });

  return (
    <View style={{ marginBottom: 16 }}>
      <Animated.View style={[styles.wrapper, wrapStyle]}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>

        <TextInput
          {...props}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholderTextColor={COLORS.hint}
          style={[styles.input, style]}
          onChangeText={onChangeText}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secureTextEntry}
          ref={ref}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 14,
    paddingBottom: 6,
    backgroundColor: COLORS.bg,
  },
  input: {
    height: 40,
    fontSize: 16,
    color: COLORS.text,
    padding: 0,
    margin: 0,
  },
});
