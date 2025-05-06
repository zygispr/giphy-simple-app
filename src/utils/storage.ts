import { type CardProps } from "../components/molecules/Card/Card.tsx";

const LOCAL_STORAGE_KEY = "Gallery";

export const saveCardsToLocalStorage = (cards: CardProps[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cards));
};

export const getCardsFromLocalStorage = (): CardProps[] => {
  const json = localStorage.getItem(LOCAL_STORAGE_KEY);
  return json ? (JSON.parse(json) as CardProps[]) : [];
};
