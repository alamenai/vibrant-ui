import { SwipeCards, SwipeCardsProps } from "@/components/vibrant/swipe-cards"

const cards: SwipeCardsProps[] = [
  {
    id: 1,
    images: [
      { url: "/swipe-card-1.jpg", alt: "First image" },
      { url: "/swipe-card-2.jpg", alt: "First image" },
      { url: "/swipe-card-3.jpg", alt: "First image" },
    ],
  },
  {
    id: 2,
    images: [
      { url: "/swipe-card-2-1.jpg", alt: "First image" },
      { url: "/swipe-card-2-2.jpg", alt: "Second image" },
    ],
  },
]
export const SwipeCardsExample = () => {
  return <SwipeCards cards={cards} />
}
