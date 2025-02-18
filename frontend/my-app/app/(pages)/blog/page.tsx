import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "Choosing the Right Windows for Your Home",
    date: "2024-02-15",
    excerpt: "Learn about the different types of windows and how to choose the best ones for your home.",
  },
  {
    id: 2,
    title: "Energy Efficiency: How Windows Can Help You Save",
    date: "2024-02-10",
    excerpt: "Discover how energy-efficient windows can reduce your energy bills and improve your home's comfort.",
  },
  {
    id: 3,
    title: "Window Maintenance Tips for Longevity",
    date: "2024-02-05",
    excerpt: "Follow these simple maintenance tips to keep your windows in top condition for years to come.",
  },
]

export default function Blog() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Blog</h1>
      <div className="space-y-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">Published on {post.date}</p>
            <p className="mb-4">{post.excerpt}</p>
            <Link href={`/blog/${post.id}`} className="text-blue-500 hover:underline">
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

