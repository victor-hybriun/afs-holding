import CardHistory from "@/components/CardHistory";
import ItemChecklists from "@/components/ItemChecklists";
import ItemEquipments from "@/components/ItemEquipments";
import { colors } from "@/theme/color";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ServiceOrder() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: "43%" }}>
      <StatusBar style="light" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View
            style={[
              styles.historyHeader,
              { paddingBottom: 36, paddingHorizontal: 24 },
            ]}
          >
            <Text style={styles.title}>Ordens de Serviço Abertas</Text>
            <Pressable>
              <Text style={styles.seeHistory}>ver histórico</Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.historyContainer}
          >
            <CardHistory />
            <CardHistory />
            <CardHistory />
          </ScrollView>
          <View style={{ paddingHorizontal: 24 }}>
            <View style={styles.historyHeader}>
              <Text style={styles.title}>Checklists em andamento</Text>
              <Pressable>
                <Text style={styles.seeHistory}>ver histórico</Text>
              </Pressable>
            </View>
            <View>
              <ItemChecklists
                title="Retroescavadeira JCB"
                status=""
                operator="Maquinista"
                date="10.07.2025"
              />
              <ItemChecklists
                title="Retroescavadeira JCB"
                status=""
                operator="Maquinista"
                date="10.07.2025"
              />
            </View>
            <View style={styles.historyHeader}>
              <Text style={styles.title}>Equipamentos vinculados</Text>
              <Pressable>
                <Text style={styles.seeHistory}>ver todos</Text>
              </Pressable>
            </View>
            <ItemEquipments
              title="Retroescavadeira JCB 3CX"
              id="38532b2"
              open_date="05/10/2025"
              value={4800}
            />
            <ItemEquipments
              title="Escavadeira Hidráulica PC210"
              id="38532b2"
              open_date="05/09/2025"
              value={3550}
              active
            />
            <ItemEquipments
              title="Escavadeira Komatsu PC210"
              id="38532b2"
              open_date="27/11/2025"
              value={49800}
              active
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: colors.black,
  },
  seeHistory: {
    fontSize: 13,
    color: "#888888",
    textDecorationLine: "underline",
  },
  historyHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 40,
  },
  historyContainer: {
    paddingLeft: 24,
  },
  input: {
    flex: 1,
    fontSize: 10,
    fontFamily: "Montserrat_500Medium",
  },
  inputContainer: {
    padding: 16,
    backgroundColor: "red",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fcfcfc",
    borderColor: "#f1f1f1",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
  },
  buttonCard: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 4,
    paddingHorizontal: 8,
  },
});
