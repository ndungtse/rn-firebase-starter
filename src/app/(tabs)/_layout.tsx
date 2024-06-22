import { Tabs } from "expo-router";
import React from "react";

import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomStatusBar from "@/components/core/CustomStatusbar";
import TabBarIcon from "@/components/navigation/TabBarIcon";
import { useApp } from "@/contexts/AppProvider";
import { Colors } from "@/utils/constants/Colors";

export default function TabLayout() {
  const { colorScheme } = useApp();
  const isIos = Platform.OS === "ios";

  const _tabBarStyle = isIos ? styles.tabBarIos : styles.tabBarAndroid;
  return (
    <SafeAreaProvider style={{ backgroundColor: Colors[colorScheme].color }}>
      <CustomStatusBar />
      <Tabs
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarBackground: () => <View className=" bg-blue500 flex-1" />,
          tabBarStyle: {
            // borderRadius: 10,
            backgroundColor: Colors[colorScheme ?? "light"].tabBg,
            borderTopColor: "transparent",
            borderRadius: 50,
            marginBottom: 10,
            // marginVertical: 'auto',
            ..._tabBarStyle,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon focused={focused}>
                <MaterialIcons name="home" size={35} color={color} />
              </TabBarIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon focused={focused}>
                <MaterialIcons name="notifications" size={35} color={color} />
              </TabBarIcon>
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBarIos: {
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    paddingTop: 20,
    height: 80,
  },
  tabBarAndroid: {
    height: 70,
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
});
