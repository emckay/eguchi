import { kebabCase } from "lodash";

const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

export const generatePublicId = (length?: number) => {
  let result = "";
  const maxIndex = alphabet.length - 1;
  for (let i = 0; i < (length === undefined ? 8 : length); i++) {
    const randomIndex = Math.floor(Math.random() * maxIndex);
    result += alphabet[randomIndex];
  }
  return result;
};

export const whoSlug = (who: string) => {
  return kebabCase(who.slice(0, 30));
};

export const whatSlug = (who: string) => {
  return kebabCase(who.slice(0, 45));
};
