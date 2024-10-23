/** @type import("@react-native-community/cli-types").Config */
module.exports = {
  project: {
    ios: {
      automaticPodsInstallation: true,
      sourceDir: './ios',
    },
  },
  assets: ['./src/assets/fonts'],
};
