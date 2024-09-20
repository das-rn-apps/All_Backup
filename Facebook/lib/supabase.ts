import 'react-native-url-polyfill/auto'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://xrbarawadnvgjcmkdibm.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyYmFyYXdhZG52Z2pjbWtkaWJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU0MjgzOTEsImV4cCI6MjAyMTAwNDM5MX0.almBIANRSFe9PqQB4rwtwhr32FUhdjcRafV-7sUxv5g"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})