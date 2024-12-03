/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      'RobotoLight': ['"Roboto-Light", sans-serif'],
      'RobotoMedium': ['"Roboto-Medium", sans-serif'],
      'RobotoBold': ['"Roboto-Bold", sans-serif'],
      'RobotoBold': ['"Roboto-Bold", sans-serif'],
      "OutfitBlack": ['Outfit-Black, sans-serif'],
      "OutfitBold": ['Outfit-Bold, sans-serif'],
      "OutfitExtraBold": ['Outfit-ExtraBold, sans-serif'],
      "OutfitExtraLight": ['Outfit-ExtraLight, sans-serif'],
      "OutfitLight": ['Outfit-Light, sans-serif'],
      "OutfitMedium": ['Outfit-Medium, sans-serif'],
      "OutfitRegular": ['Outfit-Regular, sans-serif'],
      "OutfitSemiBold": ['Outfit-SemiBold, sans-serif'],
      "OutfitThin": ['Outfit-Thin, sans-serif']
    },
    extend: {},
  },
  plugins: [],
}