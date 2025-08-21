import LogoPrimary from "@/assets/images/logo-primary.svg";
import AfsButton from "@/components/Button";
import Input from "@/components/Input";
import { colors } from "@/theme/color";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
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
            <Input label="Usuário" />
            <Input label="Senha" />
            <AfsButton
              title="Entrar"
              onPress={() => {
                router.replace("./home");
              }}
            />
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
