import LogoPrimary from "@/assets/images/logo-primary.svg";
import AfsButton from "@/components/Button";
import Input from "@/components/Input";
import { useAuth } from "@/services/auth/AuthProvider";
import { colors } from "@/theme/color";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const { signIn, loading } = useAuth();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const passwordRef = useRef(null);

  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleSubmit = async () => {
    Keyboard.dismiss();
    try {
      if (!email || !password) {
        Alert.alert("Campos obrigatórios", "Informe usuário e senha.");
        return;
      }
      await signIn(email, password);
      router.replace("./home");
      console.log("Usuário logado com sucesso");
    } catch (error: any) {
      Alert.alert("Erro", "Usuário ou senha inválidos.");
      console.log(error);
      console.log(email, password);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <StatusBar style="dark" />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Entrar na conta</Text>
            <Text style={styles.subtitle}>
              Insira seu usuário e senha para {"\n"} continuar
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Input
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => (passwordRef.current as any)?.focus()}
            />
            <Input
              label="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              returnKeyType="go"
              ref={passwordRef as any}
              onSubmitEditing={handleSubmit}
            />
            <Animated.View style={animStyle}>
              <AfsButton
                /*    title="Entrar"
              onPress={() => {
                router.replace("./home");
              }} */
                title={loading ? "Entrando..." : "Entrar"}
                disabled={loading}
                onPressIn={() =>
                  (scale.value = withSpring(1.08, {
                    damping: 10,
                    stiffness: 180,
                  }))
                }
                onPressOut={() =>
                  (scale.value = withSpring(1, { damping: 10, stiffness: 180 }))
                }
                onPress={handleSubmit}
              />
            </Animated.View>
          </View>
          <View style={styles.logoContainer}>
            <LogoPrimary width={90} height={90} />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    gap: 70,
    justifyContent: "center",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontFamily: "OpenSans_700Bold",
    color: colors.black,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    color: colors.black,
    textAlign: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
});
