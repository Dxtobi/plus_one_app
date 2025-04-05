/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins'],
        Poppins_thin: ['Poppins_thin'],
        Poppins_bold: ['Poppins_bold'],
        Exo: ['Exo'],
        Exo_bold: ['Exo_bold'],
        Exo_m:['Exo_m']

       
      },

      colors: {
        // Social media brand colors
        facebook: '#1877F2',
        whatsapp: '#25D366',
        twitter: '#303030',
        instagram: '#E1306C',
        tiktok: '#FF0050',
        linkedin: '#0077B5',
        youtube: '#FF0000',
        // Button colors
        
        // Button text colors (white for all except twitter)
        'facebook-btn-text': '#FFFFFF',
        'whatsapp-btn-text': '#FFFFFF',
        'twitter-btn-text': '#FFFFFF',
        'instagram-btn-text': '#FFFFFF',
        'tiktok-btn-text': '#FFFFFF',
        'linkedin-btn-text': '#FFFFFF',
        'youtube-btn-text': '#FFFFFF',
      }
    },
  },
  plugins: [],
}