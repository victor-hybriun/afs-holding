import FiRsArrowRight from "@/assets/images/fi-rs-arrow-right.svg";
import IconArrowLeft from "@/assets/images/icon-arrow-left.svg";
import LogoBrancoRaw from "@/assets/images/logo-branco.svg";
import { colors } from "@/theme/color";
import { router, useSegments } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type HeaderPropsLike = Partial<{
  title: string;
  subtitle: string;
  white: boolean;
  showBackButton: boolean;
  isHome: boolean;
  isDetail: boolean;
  isCostCenter: boolean;
  isProfile: boolean;
}>;

function ResolveSegments(segments: string[]): {
  visible: boolean;
  props?: HeaderPropsLike;
} {
  const root = segments[0];
  const second = segments[1];

  switch (root) {
    case "home":
      return {
        visible: true,
        props: {
          title: "Olá, {Usuário}!",
          isHome: true,
          showBackButton: false,
        },
      };

    case "serviceorder":
      if (!second) {
        return {
          visible: true,
          props: { title: "{Centro de Custo}", showBackButton: true },
        };
      }
      return {
        visible: true,
        props: {
          title: `OS ${decodeURIComponent(second)}`,
          isDetail: true,
          showBackButton: true,
        },
      };

    default:
      return { visible: false };
  }
}

export default function Header({
  title,
  showBackButton,
  isHome,
  white,
}: HeaderPropsLike) {
  const segments = useSegments();
  const { visible, props } = ResolveSegments(segments);
  if (!visible) return null;
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
        {props?.showBackButton && (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Pressable
              style={{
                backgroundColor: colors.secondary,
                padding: 8,
                borderRadius: 32,
              }}
              onPress={() => router.back()}
            >
              <IconArrowLeft width={32} height={32} />
            </Pressable>
          </View>
        )}
        <View>
          <Text style={styles.title}>{props?.title}</Text>
          {!props?.showBackButton && (
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
          )}
        </View>
      </View>
      {!props?.showBackButton && <LogoBrancoRaw width={55} height={55} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 2,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 88,
    paddingBottom: 36,
    borderBottomLeftRadius: 60,
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 24,
  },
  itemText: {
    fontSize: 10,
    fontFamily: "OpenSans_400Regular",
    color: colors.white,
  },
  itemTextLine: {
    flexDirection: "row",
    alignItems: "center",
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
