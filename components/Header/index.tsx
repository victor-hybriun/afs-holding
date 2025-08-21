import FiRsArrowRight from "@/assets/images/fi-rs-arrow-right.svg";
import LogoBrancoRaw from "@/assets/images/logo-branco.svg";

import { colors } from "@/theme/color";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface HeaderProps {
  title: string;
  subtitle?: string;
  white?: boolean;
  showBackButton?: boolean;
  isHome?: boolean;
  isDetail?: boolean;
  isCostCenter?: boolean;
  isProfile?: boolean;
}

export default function Header({
  title,
  showBackButton,
  isHome,
  white,
}: HeaderProps) {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: white ? colors.white : colors.primary,
        },
      ]}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Olá, {"{Usuário}!"}</Text>
        <Pressable>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Text style={styles.profileButtonText}>Ver perfil</Text>
            <FiRsArrowRight width={16} height={16} />
          </View>
        </Pressable>
      </View>
      <LogoBrancoRaw width={55} height={55} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "fixed",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 88,
    paddingBottom: 36,
    borderBottomLeftRadius: 60,
  },
  inner: {
    gap: 4,
  },
  title: {
    fontSize: 23,
    fontFamily: "OpenSans_700Bold",
    color: colors.white,
  },
  profileButtonText: {
    fontSize: 13,
    fontFamily: "OpenSans_400Regular",
    color: colors.white,
  },
});
