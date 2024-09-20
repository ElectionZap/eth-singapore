import Image from "next/image"
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import { useWallet } from "@/contexts/Wallet";
import Link from "next/link";

interface Option {
  id: number
  name: string
  percentage: number
}

interface ElectionData {
  id: number
  title: string
  image: string
  description: string
  options: Option[]
}

const electionData: ElectionData = {
  id: 1,
  title: "2024 Presidential Election",
  image: "/placeholder.jpg",
  description: "The upcoming 2024 Presidential Election is a pivotal moment for our nation. Voters will choose the next leader of our country, who will guide us through critical domestic and international challenges. This election will shape policies on healthcare, economy, climate change, and foreign relations for years to come.",
  options: [
    { id: 1, name: "John Smith (Party A)", percentage: 35 },
    { id: 2, name: "Sarah Johnson (Party B)", percentage: 32 },
    { id: 3, name: "Michael Lee (Party C)", percentage: 18 },
    { id: 4, name: "Emily Brown (Independent)", percentage: 10 },
    { id: 5, name: "Other Candidates", percentage: 5 },
  ],
}

function CustomProgressBar({ percentage }: { percentage: number }) {
    return (
      <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
        <div
          className="h-full bg-red-200"
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
}

function GhostProgressBar() {
    return (
      <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden relative animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <Lock className="w-4 h-4 text-gray-400 animate-pulse" />
        </div>
      </div>
    )
}

export default function PollPage() {
    const router = useRouter();
    const { id } = router.query;

    const { signer } = useWallet();

    const startRecommendation = () => {
        console.log("Starting recommendation process")
        // Implement recommendation logic here
    }

    return (
        <div className="container mx-auto px-4 pt-12 pb-20">
            <div className="max-w-4xl mx-auto">
                <Image
                src={electionData.image}
                alt={electionData.title}
                width={800}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg mb-6"
                />
                <h1 className="text-3xl font-bold mb-4">{electionData.title}</h1>
                <p className="text-gray-700 mb-6">{electionData.description}</p>
                
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">Current Standings</h2>
                <div className="space-y-4">
                    {electionData.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                        <span className="w-48 text-sm font-medium">{option.name}</span>
                        <div className="flex-grow">
                            {signer ? (
                                <CustomProgressBar percentage={option.percentage} />
                            ) : (
                                <GhostProgressBar />
                            )}
                        </div>
                        {signer ? (
                            <span className="text-sm w-12 text-right font-semibold">{option.percentage}%</span>
                        ) : (
                            <></>
                        )}
                    </div>
                    ))}
                </div>
                </div>
                
                <div className="text-center">
                <Link href={`/quiz/${id}`}>
                    <Button className="hover:bg-red-200 transition-all duration-500 ease-in-out disabled:bg-gray-300 hover:disabled:bg-gray-300" disabled={!signer}>
                        {signer ? "Start Recommendation" : "Connect Wallet"}
                    </Button>
                </Link>
                </div>
            </div>
        </div>
    )
}