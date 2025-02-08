import { Card, CardContent } from "../ui/card"
import { CodeBlock } from "./code-block"

type Props = {
  source: string
  expanded?: boolean
}

export const ComponentSource = ({ source, expanded }: Props) => {
  return (
    <Card className=" w-full h-full pr-0">
      <CardContent className="flex p-4 pr-0">
        <CodeBlock source={source} expanded={expanded} />
      </CardContent>
    </Card>
  )
}
