import Iconcalendar from "@/assets/images/icon-calendar.svg";
import IconDollarCircle from "@/assets/images/icon-dollar-circle.svg";
import { colors } from "@/theme/color";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ItemEquipmentsProps {
  id: string;
  title: string;
  open_date: string;
  value: number;
  active?: boolean;
}

export default function ItemEquipments({
  id,
  title,
  open_date,
  value,
  active,
}: ItemEquipmentsProps) {
  return (
    <View style={styles.equipmentsCardContent}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>{title}</Text>
        {active ? (
          <View
            style={{
              backgroundColor: "#4CAF5040",
              borderRadius: 4,
              paddingHorizontal: 8,
              paddingVertical: 4,
              justifyContent: "center",
              alignSelf: "flex-start",
            }}
          >
            <Text style={{ fontSize: 10, color: "#4CAF50" }}>Ativo</Text>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: "#F7676740",
              borderRadius: 4,
              paddingHorizontal: 8,
              paddingVertical: 4,
              justifyContent: "center",
              alignSelf: "flex-start",
            }}
          >
            <Text style={{ fontSize: 10, color: "#F76767" }}>Inoperante</Text>
          </View>
        )}
      </View>
      <Text
        style={{
          fontSize: 13,
          color: colors.primary,
          fontFamily: "OpenSans_400Regular_Italic",
        }}
      >
        OS #0123
      </Text>
      <View style={styles.itemTextRow}>
        <IconDollarCircle width={18} height={18} />
        <Text style={styles.itemText}>Código de identificação: {id}</Text>
      </View>
      <View style={styles.itemTextRow}>
        <Iconcalendar width={18} height={18} />
        <Text style={styles.itemText}>Data de abertura: {open_date}</Text>
      </View>
      <View style={styles.itemTextRow}>
        <IconDollarCircle width={18} height={18} />
        <Text style={styles.itemText}>
          Valor total:{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(Number(value))}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  equipmentsCardContent: {
    gap: 4,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomColor: "rgba(136, 136, 136, 0.1)",
    borderBottomWidth: 1,
  },
  itemTextRow: {
    fontSize: 13,
    fontFamily: "OpenSans_400Regular",
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
