import ElectionCard from "@/components/Polls/ElectionCard"
import Link from "next/link"

export interface Poll {
  id: number
  image: string
  title: string
  author: string
  options: {
    label: string
    percentage: number
  }[]
  deadline: string
}

const polls: Poll[] = [
  {
    id: 1,
    image: "/placeholder.jpg",
    title: "2024 Presidential Election",
    author: "John Doe",
    options: [
      { label: "Candidate A", percentage: 45 },
      { label: "Candidate B", percentage: 40 },
      { label: "Others", percentage: 15 },
    ],
    deadline: "2024-11-03",
  },
  {
    id: 2,
    image: "/placeholder.jpg",
    title: "Local Mayor Race",
    author: "Jane Smith",
    options: [
      { label: "Candidate X", percentage: 35 },
      { label: "Candidate Y", percentage: 38 },
      { label: "Others", percentage: 27 },
    ],
    deadline: "2023-10-15",
  },
  {
    id: 3,
    image: "/placeholder.jpg",
    title: "State Governor Election",
    author: "Bob Johnson",
    options: [
      { label: "Candidate M", percentage: 50 },
      { label: "Candidate N", percentage: 42 },
      { label: "Others", percentage: 8 },
    ],
    deadline: "2024-06-20",
  },
  {
    id: 4,
    image: "/placeholder.jpg",
    title: "2024 Presidential Election",
    author: "John Doe",
    options: [
      { label: "Candidate A", percentage: 45 },
      { label: "Candidate B", percentage: 40 },
      { label: "Others", percentage: 15 },
    ],
    deadline: "2024-11-03",
  },
]

export default function Component() {

  return (
    <div className="container mx-auto p-4 pt-12">
      <h1 className="text-3xl font-bold mb-6">Election Polls</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {polls.map((poll) => (
          <Link key={poll.id} href={`/polls/${poll.id}`}>
          <ElectionCard poll={poll}/>
          </Link>
        ))}
      </div>
    </div>
  )
}