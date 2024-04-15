import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fohieawtteydnxtzzdkd.supabase.co'
const supabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvaGllYXd0dGV5ZG54dHp6ZGtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzOTQwNjMsImV4cCI6MjAxOTk3MDA2M30.7jM9_cHv_hqDeXMnO5bUwhNSzf20BHnPlLyhDxG2u2I'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
