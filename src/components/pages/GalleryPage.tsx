import CardContainer from "../organisms/CardContainer/CardContainer.tsx";
import IconButton from "../molecules/IconButton/IconButton.tsx";
import RefreshIcon from "../atoms/RefreshIcon/RefreshIcon.tsx";
import type { CardProps } from "../molecules/Card/Card.tsx";
import { useEffect } from "react";

function GalleryPage() {
  const handleClick = () => {
    console.log("press");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const cards: CardProps[] = [
    {
      imgSrc:
        "https://media4.giphy.com/media/v1.Y2lkPTAxNWYyY2MzeXl0bXgxaW9ocTVienh5N3F1MDNmOWJvOHB3MHRoamZzNmswdGlqdCZlcD12MV9naWZzX3JhbmRvbSZjdD1n/9rr8tmC2cmDv7T7JZG/200w.gif",
      isLocked: false,
      date: "2025-05-05",
      label: "#leisure #ba",
    },
    {
      imgSrc:
        "https://media4.giphy.com/media/v1.Y2lkPTAxNWYyY2MzeXl0bXgxaW9ocTVienh5N3F1MDNmOWJvOHB3MHRoamZzNmswdGlqdCZlcD12MV9naWZzX3JhbmRvbSZjdD1n/9rr8tmC2cmDv7T7JZG/200w.gif",
      isLocked: true,
      date: "2025-05-05",
      label: "#leisure #ba",
    },
    {
      imgSrc:
        "https://media4.giphy.com/media/v1.Y2lkPTAxNWYyY2MzeXl0bXgxaW9ocTVienh5N3F1MDNmOWJvOHB3MHRoamZzNmswdGlqdCZlcD12MV9naWZzX3JhbmRvbSZjdD1n/9rr8tmC2cmDv7T7JZG/200w.gif",
      isLocked: false,
      date: "2025-05-05",
      label: "#leisure #ba",
    },
    {
      imgSrc:
        "https://media4.giphy.com/media/v1.Y2lkPTAxNWYyY2MzeXl0bXgxaW9ocTVienh5N3F1MDNmOWJvOHB3MHRoamZzNmswdGlqdCZlcD12MV9naWZzX3JhbmRvbSZjdD1n/9rr8tmC2cmDv7T7JZG/200w.gif",
      isLocked: true,
      date: "2025-05-05",
      label: "#leisure #ba",
    },
    {
      imgSrc:
        "https://media4.giphy.com/media/v1.Y2lkPTAxNWYyY2MzeXl0bXgxaW9ocTVienh5N3F1MDNmOWJvOHB3MHRoamZzNmswdGlqdCZlcD12MV9naWZzX3JhbmRvbSZjdD1n/9rr8tmC2cmDv7T7JZG/200w.gif",
      isLocked: false,
      date: "2025-05-05",
      label: "#leisure #ba",
    },
    {
      imgSrc:
        "https://media4.giphy.com/media/v1.Y2lkPTAxNWYyY2MzeXl0bXgxaW9ocTVienh5N3F1MDNmOWJvOHB3MHRoamZzNmswdGlqdCZlcD12MV9naWZzX3JhbmRvbSZjdD1n/9rr8tmC2cmDv7T7JZG/200w.gif",
      isLocked: true,
      date: "2025-05-05",
      label: "#leisure #ba",
    },
    {
      imgSrc:
        "https://media4.giphy.com/media/v1.Y2lkPTAxNWYyY2MzeXl0bXgxaW9ocTVienh5N3F1MDNmOWJvOHB3MHRoamZzNmswdGlqdCZlcD12MV9naWZzX3JhbmRvbSZjdD1n/9rr8tmC2cmDv7T7JZG/200w.gif",
      isLocked: false,
      date: "2025-05-05",
      label: "#leisure #ba",
    },
    {
      imgSrc:
        "https://media4.giphy.com/media/v1.Y2lkPTAxNWYyY2MzeXl0bXgxaW9ocTVienh5N3F1MDNmOWJvOHB3MHRoamZzNmswdGlqdCZlcD12MV9naWZzX3JhbmRvbSZjdD1n/9rr8tmC2cmDv7T7JZG/200w.gif",
      isLocked: true,
      date: "2025-05-05",
      label: "#leisure #ba",
    },
    {
      imgSrc:
        "https://media4.giphy.com/media/v1.Y2lkPTAxNWYyY2MzeXl0bXgxaW9ocTVienh5N3F1MDNmOWJvOHB3MHRoamZzNmswdGlqdCZlcD12MV9naWZzX3JhbmRvbSZjdD1n/9rr8tmC2cmDv7T7JZG/200w.gif",
      isLocked: false,
      date: "2025-05-05",
      label: "#leisure #ba",
    },
    {
      imgSrc:
        "https://media4.giphy.com/media/v1.Y2lkPTAxNWYyY2MzeXl0bXgxaW9ocTVienh5N3F1MDNmOWJvOHB3MHRoamZzNmswdGlqdCZlcD12MV9naWZzX3JhbmRvbSZjdD1n/9rr8tmC2cmDv7T7JZG/200w.gif",
      isLocked: true,
      date: "2025-05-05",
      label: "#leisure #ba",
    },
  ];

  return (
    <>
      <h1>Giphy</h1>
      <CardContainer cards={cards} />
      {/*TODO: fix key*/}
      <IconButton icon={<RefreshIcon />} onClick={handleClick}>
        Hit here to refresh gifs or press space
      </IconButton>
    </>
  );
}
export default GalleryPage;
