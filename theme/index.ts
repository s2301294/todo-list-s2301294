import { useColorScheme } from 'nativewind'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'

export const usePersistentTheme = () => {
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme()

  useEffect(() => {
    AsyncStorage.getItem('theme').then((t) => {
      if (t === 'dark' || t === 'light') setColorScheme(t)
    })
  }, [])

  useEffect(() => {
    if (colorScheme) AsyncStorage.setItem('theme', colorScheme)
  }, [colorScheme])

  return { colorScheme, setColorScheme, toggleColorScheme }
}
