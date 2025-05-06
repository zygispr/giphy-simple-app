import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { selectCards } from "../../store/selectors.ts";
import { toggleLock } from "../../store/slice.ts";
import CardContainer from "../organisms/CardContainer/CardContainer.tsx";
import IconButton from "../molecules/IconButton/IconButton.tsx";
import RefreshIcon from "../atoms/RefreshIcon/RefreshIcon.tsx";

function GalleryPage() {
  const cards = useAppSelector(selectCards);
  const dispatch = useAppDispatch();

  const handleRefresh = () => {
    console.log("refresh");
  };

  const handleLock = (id: string) => {
    dispatch(toggleLock(id));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        handleRefresh();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <h1>Giphy</h1>
      <CardContainer cards={cards} onClick={handleLock} />
      <IconButton icon={<RefreshIcon />} onClick={handleRefresh}>
        Hit here to refresh gifs or press space
      </IconButton>
    </>
  );
}
export default GalleryPage;
