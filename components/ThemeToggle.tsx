import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ThemeToggle({
    colorScheme,
    toggleColorScheme,
}: {
    colorScheme: "light" | "dark";
    toggleColorScheme: () => void;
}) {
    return (
        <TouchableOpacity
            onPress={toggleColorScheme}
            style={[
                styles.button,
                { backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#ddd" },
            ]}
        >
            {colorScheme === "dark" ? (
                <Ionicons name="sunny" size={24} color="#fff" />
            ) : (
                <Ionicons name="moon" size={24} color="#000" />
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 50,
    },
});
