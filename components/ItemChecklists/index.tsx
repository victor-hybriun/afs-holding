import IconCalendar from "@/assets/images/icon-calendar.svg";
import IconCheck from "@/assets/images/icon-check.svg";
import IconOperator from "@/assets/images/icon-operator.svg";
import IconSettings from "@/assets/images/icon-settings.svg";
import { colors } from "@/theme/color";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ItemChecklistsProps {
  title: string;
  status: string;
  operator: string;
  date: string;
}

export default function ItemChecklists({
  title,
  status,
  operator,
  date,
}: ItemChecklistsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.itemTextRow}>
        <View style={styles.itemTextLine}>
          <IconSettings width={10} height={10} />
          <Text style={styles.itemText}>{title}</Text>
        </View>
        <View style={styles.itemTextLine}>
          <IconCheck width={10} height={10} />
          <Text style={styles.itemText}>Entrega de equipamento</Text>
        </View>
      </View>
      <View style={styles.itemTextRow}>
        <View style={styles.itemTextLine}>
          <IconOperator width={10} height={10} />
          <Text style={styles.itemText}>Operador: {operator}</Text>
        </View>
        <View style={styles.itemTextLine}>
          <IconCalendar width={10} height={10} />
          <Text style={styles.itemText}>{date}</Text>
        </View>
      </View>
      <View style={styles.itemTextRow}>
        <Text style={{ color: colors.success, fontSize: 10 }}>
          Assinaturas efetuadas
        </Text>
        <Pressable>
          <Text
            style={{
              color: colors.primary,
              textDecorationLine: "underline",
              fontSize: 10,
            }}
          >
            ver histórico
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 16,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(136, 136, 136, 0.10)",
  },
  itemTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText: {
    fontSize: 10,
    fontFamily: "OpenSans_400Regular",
    color: "#444444",
  },
  itemTextLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
