import { Colors, letterColors } from "@/shared/constants";

export const getInitialLetterColor = (letter: string) => {
  const firstLetter = letter.charAt(0).toUpperCase();

  return letterColors[firstLetter] || Colors.Red;
};
