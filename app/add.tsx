import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { useTaskStore } from '../store/tasks'

export default function AddScreen() {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const addTask = useTaskStore((s) => s.addTask)
    const router = useRouter()

    const handleSave = () => {
        if (!title.trim()) return
        addTask({ title, description: desc, completed: false })
        router.back()
    }

    return (
        <View className="flex-1 bg-gray-100 p-4 pt-12">
            <Text className="text-2xl font-bold mb-4">Add Task</Text>
            <TextInput
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                className="border border-gray-300 rounded-lg p-2 mb-2 bg-white"
            />
            <TextInput
                placeholder="Description"
                value={desc}
                onChangeText={setDesc}
                className="border border-gray-300 rounded-lg p-2 mb-4 bg-white"
            />
            <TouchableOpacity className="bg-blue-600 rounded-lg p-3 items-center" onPress={handleSave}>
                <Text className="text-white font-semibold">Save</Text>
            </TouchableOpacity>
        </View>
    )
}
