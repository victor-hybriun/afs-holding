import FiRsArrowRight from "@/assets/images/fi-rs-arrow-right.svg";
import LogoBrancoRaw from "@/assets/images/logo-branco.svg";
import { colors } from "@/theme/color";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import type { SvgProps } from "react-native-svg";

const { height } = Dimensions.get("window");

const AnimatedLogo = Animated.createAnimatedComponent(
  LogoBrancoRaw as React.ComponentType<SvgProps>
);

const INITIAL_SIZE = 90;
const FINAL_SIZE = 200;

export default function Index() {
  const size = useSharedValue(INITIAL_SIZE);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const navTrigger = useSharedValue(0);
  const [animating, setAnimating] = React.useState(false);

  useDerivedValue(() => {
    if (navTrigger.value === 1) {
      runOnJS(router.replace)("/login");
    }
  }, []);

  const animatedProps = useAnimatedProps<SvgProps>(() => ({
    width: size.value,
    height: size.value,
  }));

  const logoContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleStart = () => {
    if (animating) return;
    setAnimating(true);

    size.value = withSpring(FINAL_SIZE, { damping: 16, stiffness: 100 }, () => {
      navTrigger.value = withDelay(200, withTiming(1, { duration: 0 }));
    });
    translateY.value = withSpring(height / 2.6 - FINAL_SIZE / 2, {
      damping: 16,
      stiffness: 100,
    });
    opacity.value = withTiming(0, { duration: 250 });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[styles.logoContainer, logoContainerStyle]}
        collapsable={false}
      >
        <AnimatedLogo
          animatedProps={animatedProps}
          width={INITIAL_SIZE}
          height={INITIAL_SIZE}
          preserveAspectRatio="xMidYMid meet"
        />
      </Animated.View>

      <Animated.View style={[styles.inner, { opacity }]}>
        <View style={styles.imagesContainer}>
          <Image
            style={{ marginTop: 50 }}
            source={require("@/assets/images/retroexcavator.png")}
          />
          <Image source={require("@/assets/images/constructor.png")} />
          <Image
            style={{ marginTop: 50 }}
            source={require("@/assets/images/excavator.png")}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.title}>Operação segura, gestão eficiente.</Text>
          <Pressable style={styles.button} onPress={handleStart}>
            <FiRsArrowRight width={36} height={36} />
          </Pressable>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary, paddingVertical: 40 },
  logoContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inner: {
    width: "100%",
    paddingTop: 40,
    alignItems: "center",
  },
  imagesContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footer: {
    width: "100%",
    paddingTop: 70,
    paddingHorizontal: 32,
    alignItems: "flex-start",
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "OpenSans_700Bold",
    marginBottom: 20,
    textAlign: "left",
  },
  button: {
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundColor: colors.secondary,
    width: 130,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 25,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
