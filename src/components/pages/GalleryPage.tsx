import { useEffect, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { selectCards } from "../../store/selectors.ts";
import { toggleLock } from "../../store/slice.ts";
import CardContainer from "../organisms/CardContainer/CardContainer.tsx";
import IconButton from "../molecules/IconButton/IconButton.tsx";
import RefreshIcon from "../atoms/RefreshIcon/RefreshIcon.tsx";
import { loadGalleryThunk, updateGalleryThunk } from "../../store/thunks.ts";

const GALLERY_LIMIT = 1;

function GalleryPage() {
  const cards = useAppSelector(selectCards);
  const dispatch = useAppDispatch();
  const hasPageLoaded = useRef(false);

  const handleRefresh = useCallback(() => {
    dispatch(updateGalleryThunk());
  }, [dispatch]);

  const handleLock = (id: string) => {
    dispatch(toggleLock(id));
  };

  useEffect(() => {
    if (!hasPageLoaded.current) {
      dispatch(loadGalleryThunk(GALLERY_LIMIT));
      hasPageLoaded.current = true;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        handleRefresh();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch, handleRefresh]);

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
