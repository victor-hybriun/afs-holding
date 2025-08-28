import Header from "@/components/Header";
import { AuthProvider } from "@/services/auth/AuthProvider";
import { Inter_400Regular } from "@expo-google-fonts/inter";
import {
  OpenSans_300Light,
  OpenSans_300Light_Italic,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_500Medium,
  OpenSans_500Medium_Italic,
  OpenSans_600SemiBold,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold,
  OpenSans_800ExtraBold_Italic,
  useFonts,
} from "@expo-google-fonts/open-sans";
import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const [loaded] = useFonts({
    OpenSans_300Light,
    OpenSans_300Light_Italic,
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_500Medium,
    OpenSans_500Medium_Italic,
    OpenSans_600SemiBold,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold,
    OpenSans_800ExtraBold_Italic,
    Inter_400Regular,
  });
  if (!loaded) return null;

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <Header title="Home" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: "#fff",
              },
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="login/index" />
            <Stack.Screen name="home/index" />
            <Stack.Screen
              name="serviceorder/index"
              options={{ headerShown: false }}
            />
          </Stack>
        </View>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
