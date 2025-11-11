import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { usePersistentTheme } from '../../theme'

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = usePersistentTheme()

  return (
    <View className="items-end mb-3">
      <TouchableOpacity
        onPress={toggleColorScheme}
        className="px-3 py-2 rounded-lg bg-gray-300 dark:bg-gray-700"
      >
        <Text className="text-black dark:text-white">
          {colorScheme === 'dark' ? '🌙 Dark' : '☀️ Light'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
