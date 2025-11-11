import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TaskItem from "../components/TaskItem";

export default function Todos() {
    const [tasks, setTasks] = useState<{ id: string; text: string; done: boolean }[]>([]);
    const [input, setInput] = useState("");

    const addTask = () => {
        if (!input.trim()) return;
        setTasks([{ id: Date.now().toString(), text: input.trim(), done: false }, ...tasks]);
        setInput("");
    };

    const toggleTask = (id: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <View className="flex-1 bg-black px-6 pt-16">
            <Text className="text-white text-3xl font-bold mb-6">Your Tasks</Text>
            <View className="flex-row items-center mb-4">
                <TextInput
                    className="flex-1 bg-neutral-800 text-white rounded-xl px-4 py-3 mr-3"
                    placeholder="Add new task..."
                    placeholderTextColor="#aaa"
                    value={input}
                    onChangeText={setInput}
                />
                <TouchableOpacity
                    onPress={addTask}
                    className="bg-teal-500 p-3 rounded-xl"
                >
                    <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskItem task={item} toggleTask={toggleTask} deleteTask={deleteTask} />
                )}
            />
        </View>
    );
}
