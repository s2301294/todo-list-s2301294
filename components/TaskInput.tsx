import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TaskInput({
    onSubmit,
    textColor,
    bgColor,
}: {
    onSubmit: (title: string) => void;
    textColor?: string;
    bgColor?: string;
}) {
    const [title, setTitle] = useState("");

    const handleAdd = () => {
        if (!title.trim()) return;
        onSubmit(title.trim());
        setTitle("");
    };

    return (
        <View style={{ width: "100%", marginBottom: 15 }}>
            <View
                style={[
                    { flexDirection: "row", alignItems: "center" },
                    { backgroundColor: bgColor || "transparent", borderRadius: 12, padding: 4 },
                ]}
            >
                <TextInput
                    style={[
                        styles.input,
                        {
                            color: textColor || "#000",
                            borderColor: textColor ? `${textColor}33` : "#ccc",
                            backgroundColor: bgColor || "#fff",
                        },
                    ]}
                    placeholder="Add a new task"
                    placeholderTextColor={textColor ? `${textColor}66` : "#999"}
                    value={title}
                    onChangeText={setTitle}
                />
                <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
                    <Ionicons name="add" size={28} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginRight: 8,
        fontSize: 16,
    },
    addButton: {
        backgroundColor: "#00bfa5",
        padding: 12,
        borderRadius: 12,
    },
});
