import { useEffect, useState } from "react";
import ElectionCard from "@/components/Polls/ElectionCard";
import Link from "next/link";
import { fetchAllPolls } from "@/database/dbApi";

export interface Poll {
  id: number;
  image: string;
  title: string;
  author: string;
  options: {
    label: string;
    percentage: number;
  }[];
  deadline: string;
}

export default function PollsComponent() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch polls data when component mounts
    const getPolls = async () => {
      try {
        const pollData = await fetchAllPolls();

        // Transform the poll data to match the Poll interface
        const formattedPolls: Poll[] = pollData.map((poll: any) => ({
          id: poll.poll_id, // map poll_id to id
          image: poll.image || "/placeholder.jpg", // placeholder image for now
          title: poll.title, // title remains the same
          author: poll.creator, // creator (might be an address)
          options: JSON.parse(poll.voting_options).map((option: any) => ({
            label: option.option,
            percentage: 0, // assuming we don't have percentage info in the data
          })),
          deadline: poll.end_date, // map end_date to deadline
        }));

        setPolls(formattedPolls);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching polls:", error);
        setLoading(false);
      }
    };

    getPolls();
  }, []);

  // Handle loading state
  if (loading) {
    return <div>Loading polls...</div>;
  }

  // Handle case when there are no polls
  if (polls.length === 0) {
    return (
      <div className="container mx-auto p-4 pt-12">
        <h1 className="text-3xl font-bold mb-6">Election Polls</h1>
        <div className="text-center mt-6">
          <p>No polls available at the moment. Check back later!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-12">
      <h1 className="text-3xl font-bold mb-6">Election Polls</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {polls.map((poll) => (
          <Link key={poll.id} href={`/polls/${poll.id}`}>
            <ElectionCard poll={poll} />
          </Link>
        ))}
      </div>
    </div>
  );
}
