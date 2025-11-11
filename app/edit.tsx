import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { useTaskStore } from '../store/tasks'

export default function EditScreen() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const router = useRouter()
    const { tasks, updateTask } = useTaskStore()
    const task = tasks.find((t) => t.id === id)

    const [title, setTitle] = useState(task?.title || '')
    const [desc, setDesc] = useState(task?.description || '')

    const handleSave = () => {
        updateTask(id!, { title, description: desc })
        router.back()
    }

    if (!task) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>Task not found</Text>
            </View>
        )
    }

    return (
        <View className="flex-1 bg-gray-100 p-4 pt-12">
            <Text className="text-2xl font-bold mb-4">Edit Task</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Title"
                className="border border-gray-300 rounded-lg p-2 mb-2 bg-white"
            />
            <TextInput
                value={desc}
                onChangeText={setDesc}
                placeholder="Description"
                className="border border-gray-300 rounded-lg p-2 mb-4 bg-white"
            />
            <TouchableOpacity className="bg-green-600 rounded-lg p-3 items-center" onPress={handleSave}>
                <Text className="text-white font-semibold">Save Changes</Text>
            </TouchableOpacity>
        </View>
    )
}
