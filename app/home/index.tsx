import FiRsSearch from "@/assets/images/fi-rs-search.svg";
import { colors } from "@/theme/color";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const data = [
  {
    id: "1",
    titulo: "Nova Odessa - Pátio B",
    equipamentos: "3 equipamentos vinculados",
    custo: "Custo total: R$ 14.560,00",
    periodo: "Período: Abril/Julho 2025",
  },
  {
    id: "2",
    titulo: "Campinas - Obra 023",
    equipamentos: "2 equipamentos vinculados",
    custo: "Custo total: R$ 9.360,00",
    periodo: "Período: Janeiro/Julho 2025",
  },
  {
    id: "3",
    titulo: "Piracicaba - Pátio A",
    equipamentos: "2 equipamentos vinculados",
    custo: "Custo total: R$ 6.750,00",
    periodo: "Período: Fevereiro/Maio 2025",
  },
  {
    id: "4",
    titulo: "Sumaré - Pátio E",
    equipamentos: "4 equipamentos vinculados",
    custo: "Custo total: R$ 18.230,00",
    periodo: "Período: Fevereiro/Abril 2025",
  },
  {
    id: "5",
    titulo: "Limeira - Pátio R",
    equipamentos: "4 equipamentos vinculados",
    custo: "Custo total: R$ 18.230,00",
    periodo: "Período: Abril/Julho 2025",
  },
  {
    id: "6",
    titulo: "Americana - Unidade Central",
    equipamentos: "5 equipamentos vinculados",
    custo: "Custo total: R$ 21.450,00",
    periodo: "Período: Março/Agosto 2025",
  },
  {
    id: "7",
    titulo: "Hortolândia - Fábrica 02",
    equipamentos: "3 equipamentos vinculados",
    custo: "Custo total: R$ 12.980,00",
    periodo: "Período: Maio/Setembro 2025",
  },
  {
    id: "8",
    titulo: "São Paulo - Unidade Sul",
    equipamentos: "6 equipamentos vinculados",
    custo: "Custo total: R$ 25.780,00",
    periodo: "Período: Junho/Outubro 2025",
  },
  {
    id: "9",
    titulo: "Ribeirão Preto - Centro",
    equipamentos: "4 equipamentos vinculados",
    custo: "Custo total: R$ 16.900,00",
    periodo: "Período: Julho/Novembro 2025",
  },
  {
    id: "10",
    titulo: "Santos - Porto A",
    equipamentos: "3 equipamentos vinculados",
    custo: "Custo total: R$ 13.450,00",
    periodo: "Período: Agosto/Dezembro 2025",
  },
  {
    id: "11",
    titulo: "Sorocaba - Distrito Industrial",
    equipamentos: "5 equipamentos vinculados",
    custo: "Custo total: R$ 22.300,00",
    periodo: "Período: Setembro/Janeiro 2026",
  },
  {
    id: "12",
    titulo: "Jundiaí - Setor 3",
    equipamentos: "4 equipamentos vinculados",
    custo: "Custo total: R$ 19.600,00",
    periodo: "Período: Outubro/Fevereiro 2026",
  },
  {
    id: "13",
    titulo: "Bauru - Complexo Norte",
    equipamentos: "3 equipamentos vinculados",
    custo: "Custo total: R$ 14.800,00",
    periodo: "Período: Novembro/Março 2026",
  },
  {
    id: "14",
    titulo: "São José dos Campos - Área 1",
    equipamentos: "5 equipamentos vinculados",
    custo: "Custo total: R$ 23.100,00",
    periodo: "Período: Dezembro/Abril 2026",
  },
  {
    id: "15",
    titulo: "Guarulhos - Terminal 2",
    equipamentos: "4 equipamentos vinculados",
    custo: "Custo total: R$ 20.400,00",
    periodo: "Período: Janeiro/Maio 2026",
  },
  {
    id: "16",
    titulo: "Osasco - Centro Logístico",
    equipamentos: "6 equipamentos vinculados",
    custo: "Custo total: R$ 27.500,00",
    periodo: "Período: Fevereiro/Junho 2026",
  },
  {
    id: "17",
    titulo: "Taubaté - Setor Industrial",
    equipamentos: "3 equipamentos vinculados",
    custo: "Custo total: R$ 15.200,00",
    periodo: "Período: Março/Julho 2026",
  },
];

export default function Home() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#fff", paddingTop: "43%" }}
    >
      <StatusBar style="light" />
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <View style={{ padding: 24, gap: 24 }}>
            <View style={{ gap: 2 }}>
              <Text style={styles.title}>Meus Centros de Custo</Text>
              <Text style={styles.date}>
                Hoje,{" "}
                {new Date()
                  .toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                  .replace(/de |de$/, "de ")}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <FiRsSearch width={16} height={16} />
              <TextInput
                style={styles.input}
                placeholder="Busque por nome..."
                placeholderTextColor={"rgba(117, 117, 117, 0.50)"}
              />
            </View>
            <View style={{ gap: 16 }}>
              {data.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => router.push("./serviceorder/")}
                >
                  <View style={styles.card}>
                    <View style={{ gap: 6 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Inter_400Regular",
                          color: colors.black,
                        }}
                      >
                        {item.titulo}
                      </Text>
                      {/*   <View style={styles.itemTextRow}>
                        <IconSettings width={10} height={10} />
                        <Text style={styles.itemText}>{item.equipamentos}</Text>
                      </View>
                      <View style={styles.itemTextRow}>
                        <IconDollarCircle width={10} height={10} />
                        <Text style={styles.itemText}>{item.custo}</Text>
                      </View>
                      <View style={styles.itemTextRow}>
                        <Iconcalendar width={10} height={10} />
                        <Text style={styles.itemText}>{item.periodo}</Text>
                      </View> */}
                    </View>
                    <View style={{ justifyContent: "flex-end" }}>
                      <View style={styles.buttonCard}>
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 8,
                            fontFamily: "OpenSans_400Regular",
                          }}
                        >
                          Selecionar
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: colors.black,
  },
  date: {
    fontSize: 13,
    fontFamily: "OpenSans_400Regular",
    color: colors.gray,
  },
  input: {
    flex: 1,
    fontSize: 10,
    fontFamily: "Montserrat_500Medium",
  },
  inputContainer: {
    height: 48,
    width: "100%",
    backgroundColor: "#f3f3f3",
    borderColor: "rgba(117, 117, 117, 0.50)",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 12,
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
  buttonCard: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 4,
    paddingHorizontal: 8,
  },
});
