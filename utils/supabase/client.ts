import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://anwzvgwokuwgraytutsa.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFud3p2Z3dva3V3Z3JheXR1dHNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2ODg1OTgsImV4cCI6MjA0NTI2NDU5OH0.kfv3l8qFd-15QFlKiMozJmED24v0dEuO6N_u26zgeaM'
export const supabase = createClient(supabaseUrl, supabaseKey)