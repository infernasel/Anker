import en from './en'
import ru from './ru'

export default {
  en,
  ru
}

export type Locale = 'en' | 'ru'

export const availableLocales: { label: string; value: Locale }[] = [
  { label: 'English', value: 'en' },
  { label: 'Русский', value: 'ru' }
] 
