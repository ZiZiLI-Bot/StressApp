module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['tailwindcss-react-native/babel', 'react-native-reanimated/plugin'],
  env: {
    production: {
      plugins: ['react-native-paper/babel', 'react-native-reanimated/plugin'],
    },
  },
};
