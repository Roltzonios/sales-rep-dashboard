export const config = {
  // Supabase Configuration
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    password: process.env.SUPABASE_PASSWORD || '',
  },
  
  // Gemini AI Configuration
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
  },
  
  // Application Configuration
  app: {
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    secret: process.env.NEXTAUTH_SECRET || '',
  },
};

// Validation function to check if required environment variables are set
export function validateConfig() {
  const errors: string[] = [];
  
  if (!config.gemini.apiKey) {
    errors.push('GEMINI_API_KEY is required');
  }
  
  if (errors.length > 0) {
    console.warn('Configuration warnings:', errors);
  }
  
  return errors.length === 0;
} 