/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#1877F2";
const tintColorDark = "#1877F2";
// const

const primary = "#1877F2";
export const Colors = {
  primary,
  light: {
    text: "#11181C",
    color: "#fff",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    tabBg: "#f9f9f9",
  },
  dark: {
    text: "#ECEDEE",
    color: "#000",
    background: "#000",
    // background: '#151718',
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    tabBg: "#121212",
  },
};
