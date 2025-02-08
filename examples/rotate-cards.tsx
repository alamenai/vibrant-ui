import { RotateCard, RotateCards } from "@/components/vibrant/rotate-cards"

const feedbacks: RotateCard[] = [
  {
    name: "Dillion Verma",
    role: "Ex. @NVIDIA,",
    testimonial:
      "The team's dedication to excellence and innovation truly stands out. Working with them has been an amazing journey.",
    image: "https://avatars.githubusercontent.com/u/16860528?v=4",
  },
  {
    name: "Yangshun Tay",
    role: "Ex-Staff Eng @ Meta",
    testimonial:
      "Their approach to problem-solving and attention to detail made all the difference in our project's success.",
    image: "https://avatars.githubusercontent.com/u/1315101?v=4",
  },
  {
    name: "Ala Eddine Menai",
    role: "Frontend Engineer",
    testimonial:
      "Outstanding service and exceptional results. They exceeded our expectations in every way possible.",
    image: "https://avatars.githubusercontent.com/u/20143684?v=4",
  },
]

export const RotateCardsExample = () => {
  return <RotateCards cards={feedbacks} />
}
