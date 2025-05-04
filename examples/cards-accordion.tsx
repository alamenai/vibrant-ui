import {
  CardsAccordion,
  CardsAccordionProps,
} from "@/components/vibrant/cards-accordion"

const items: CardsAccordionProps[] = [
  {
    title: "Accordion Item 1",
    description:
      "This is the description of the first accordion item. Click on any card to expand it and see the full details.",
    content: (
      <div>
        <p>
          This is the content of the first accordion item. You can put any
          content here, including text, images, or other components.
        </p>
      </div>
    ),
  },
  {
    title: "Accordion Item 2",
    description:
      "This is the description of the second accordion item. Click on any card to expand it and see the full details.",
    content: (
      <div>
        <p>
          This is the content of the second accordion item. You can put any
          content here, including text, images, or other components.
        </p>
      </div>
    ),
  },
  {
    title: "Accordion Item 3",
    description:
      "This is the description of the third accordion item. The animation makes the interaction feel smooth and responsive.",
    content: (
      <div>
        <p>
          This is the content of the third accordion item. You can put any
          content here, including text, images, or other components.
        </p>
      </div>
    ),
  },
]

export const CardsAccordionDemo = () => {
  return <CardsAccordion items={items} />
}
