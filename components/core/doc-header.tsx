type Post = {
  title: string
  description: string
}

export const DocHeader = ({ post }: { post: Post }) => {
  return (
    <div>
      <h1 className="font-bold text-3xl">{post.title}</h1>
      <h2 className="text-slate-500 mt-1 text-lg">{post.description}</h2>
    </div>
  )
}
