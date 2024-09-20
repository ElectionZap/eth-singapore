import React from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Poll } from "@/pages/polls";
import { useWallet } from "@/contexts/Wallet";
import { Lock } from "lucide-react"

interface ElectionCardProps {
    poll: Poll;
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

export default function ElectionCard({ poll }: ElectionCardProps) {
    const { signer } = useWallet();

    return (
        <Card key={poll.id} className="group overflow-hidden bg-white/30 backdrop-blur-md border-0 shadow-md hover:scale-105 transition-all duration-500 ease-in-out">
            <Image
                src={poll.image}
                alt={poll.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
            />
            <CardHeader>
                <CardTitle className="text-black">{poll.title}</CardTitle>
                <p className="text-sm text-gray-500">By {poll.author}</p>
                <p className="text-sm text-gray-500">
                Deadline to vote: <time dateTime={poll.deadline}>{poll.deadline}</time>
                </p>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {poll.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <span className="w-24 text-sm text-black">{option.label}</span>
                            <div className="flex-grow">
                            {signer ? (
                                <CustomProgressBar percentage={option.percentage} />
                            ) : (
                                <GhostProgressBar />
                            )}
                            </div>
                            <span className="text-sm w-10 text-right">{option.percentage}%</span>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full group-hover:bg-red-200 transition-all duration-500 ease-in-out disabled:bg-gray-300 group-hover:disabled:bg-gray-300" disabled={!signer}>
                    {signer ? "Generate Vote Recommendation" : "Connect Wallet"}
                </Button>
            </CardFooter>
        </Card>
    );
}
