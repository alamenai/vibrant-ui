type DocMeta = {
  title: string
  description: string
}

export const DocHeader = ({doc }: { doc: DocMeta }) => {
  return (
    <div>
      <h1 className="font-bold text-3xl">{doc.title}</h1>
      <h2 className="text-slate-500 mt-1 text-lg">{doc.description}</h2>
    </div>
  )
}
