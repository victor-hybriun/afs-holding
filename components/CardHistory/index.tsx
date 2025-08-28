import Iconcalendar from "@/assets/images/icon-calendar.svg";
import IconDollarCircle from "@/assets/images/icon-dollar-circle.svg";
import IconSettings from "@/assets/images/icon-settings.svg";
import { colors } from "@/theme/color";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function CardHistory() {
  return (
    <View style={styles.historyCard}>
      <View style={styles.leftBar} />
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 16,
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: 90,
            height: 113,
          }}
          source={require("@/assets/images/retroexcavator-item.png")}
        />
        <View style={styles.historyCardContent}>
          <Text>Retroescavadeira JCB 3CX</Text>
          <Text
            style={{
              fontSize: 10,
              color: colors.primary,
              fontFamily: "OpenSans_400Regular_Italic",
            }}
          >
            OS #0123
          </Text>
          <View style={styles.itemTextRow}>
            <IconSettings width={10} height={10} />
            <Text style={styles.itemText}>
              Data de abertura: 05.07.2025 às 9h12
            </Text>
          </View>
          <View style={styles.itemTextRow}>
            <IconDollarCircle width={10} height={10} />
            <Text style={styles.itemText}>Vazamento de óleo hidráulico</Text>
          </View>
          <View style={styles.itemTextRow}>
            <Iconcalendar width={10} height={10} />
            <Text style={styles.itemText}>Unidade Nova Odessa - Pátio B</Text>
          </View>
          <View style={styles.itemTextRow}>
            <Iconcalendar width={10} height={10} />
            <Text style={styles.itemText}>Aguardando diagnóstico</Text>
          </View>
          <View
            style={{
              backgroundColor: "#F7676740",
              marginTop: 8,
              borderRadius: 16,
              paddingHorizontal: 8,
              paddingVertical: 4,
              justifyContent: "center",
              alignSelf: "flex-start",
            }}
          >
            <Text style={{ fontSize: 10, color: "#F76767" }}>
              Máquina inoperante
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  historyCard: {
    flexDirection: "row",
    gap: 8,
    overflow: "hidden",
    backgroundColor: "#D9D9D914",
    borderColor: "rgba(136, 136, 136, 0.1)",
    borderWidth: 1,
    borderRadius: 12,
    marginRight: 12,
  },
  leftBar: {
    width: 5,
    backgroundColor: colors.primary,
  },
  historyCardContent: {
    gap: 4,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  itemTextRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  itemText: {
    fontSize: 10,
    fontFamily: "OpenSans_400Regular",
    color: "#444444",
  },
});
