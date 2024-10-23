import { PixelRatio } from "react-native";

export function dpToPx(dp: number): number {
  const pixelRatio = PixelRatio.get();
  return dp * pixelRatio;
}

export const wait = (timeout: any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};