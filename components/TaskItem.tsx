import React, { useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

export default function TaskItem({
    task,
    onToggle,
    onDelete,
    onStartEdit, // <-- renamed
    cardColor,
    textColor,
}: {
    task: { id: string; title: string; description?: string; completed: boolean };
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onStartEdit: (id: string) => void; // only signals edit start
    cardColor: string;
    textColor: string;
}) {
    const swipeableRef = useRef<Swipeable>(null);

    const handleDelete = () => {
        onDelete(task.id);
        swipeableRef.current?.close();
    };

    const handleEdit = () => {
        onStartEdit(task.id);
        swipeableRef.current?.close();
    };

    const renderLeftActions = (_: any, dragX: Animated.AnimatedInterpolation<number>) => {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: "clamp",
        });
        return (
            <View style={[styles.leftAction, { backgroundColor: "#ff3b30" }]}>
                <Animated.View style={{ transform: [{ scale }] }}>
                    <Ionicons name="trash" size={28} color="#fff" />
                </Animated.View>
            </View>
        );
    };

    const renderRightActions = (_: any, dragX: Animated.AnimatedInterpolation<number>) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: "clamp",
        });
        return (
            <View style={[styles.rightAction, { backgroundColor: "#0a84ff" }]}>
                <Animated.View style={{ transform: [{ scale }] }}>
                    <Ionicons name="create-outline" size={28} color="#fff" />
                </Animated.View>
            </View>
        );
    };

    return (
        <Swipeable
            ref={swipeableRef}
            renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}
            onSwipeableLeftOpen={handleDelete}
            onSwipeableRightOpen={handleEdit}
            overshootLeft={false}
            overshootRight={false}
        >
            <TouchableOpacity
                style={[styles.card, { backgroundColor: cardColor }]}
                onPress={() => onToggle(task.id)}
                activeOpacity={0.8}
            >
                <View style={styles.row}>
                    <Ionicons
                        name={task.completed ? "checkmark-circle" : "ellipse-outline"}
                        size={24}
                        color={task.completed ? "#00bfa5" : "#999"}
                        style={{ marginRight: 12 }}
                    />
                    <View style={{ flex: 1 }}>
                        <Text
                            style={[
                                styles.title,
                                { color: textColor, textDecorationLine: task.completed ? "line-through" : "none" },
                            ]}
                        >
                            {task.title}
                        </Text>
                        {task.description ? (
                            <Text style={[styles.desc, { color: textColor }]}>{task.description}</Text>
                        ) : null}
                    </View>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 15,
        borderRadius: 12,
        marginVertical: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    row: { flexDirection: "row", alignItems: "center" },
    title: { fontSize: 16, fontWeight: "600" },
    desc: { fontSize: 14, opacity: 0.7, marginTop: 2 },
    leftAction: {
        justifyContent: "center",
        alignItems: "flex-start",
        width: 80,
        marginVertical: 6,
        borderRadius: 12,
        paddingLeft: 20,
    },
    rightAction: {
        justifyContent: "center",
        alignItems: "flex-end",
        width: 80,
        marginVertical: 6,
        borderRadius: 12,
        paddingRight: 20,
    },
});
