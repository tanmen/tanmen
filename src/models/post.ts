type Post = {
  title: string
  createdAt: Date
  updatedAt: Date
  tags: string[]
  html: string
}

type PostPick = {
  title: string
  createdAt: Date
  tags: string[]
  excerpt: string
}

type PostCount = {
  name: string
  count: number
  posts: PostPick[]
}
