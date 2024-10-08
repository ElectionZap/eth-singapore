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
    <div className="w-full bg-accent h-4 rounded-full overflow-hidden relative animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <Lock className="w-4 h-4 text-white animate-pulse" />
      </div>
    </div>
  )
}

export default function ElectionCard({ poll }: ElectionCardProps) {
  const { signer } = useWallet();

  return (
    <Card key={poll.id} className="group overflow-hidden bg-dark/30 backdrop-blur-md shadow-md hover:scale-105 transition-all duration-500 ease-in-out">
      <Image
        src={poll.image}
        alt={poll.title}
        width={400}
        height={200}
        priority
        className="w-full h-48 object-cover"
      />
      <CardHeader>
        <CardTitle className="text-white text-xl">{poll.title}</CardTitle>
        <p className="text-sm text-gray-500">By {poll.author}</p>
        <p className="text-sm text-gray-500">
          Deadline to vote: {new Date(poll.deadline).toLocaleDateString("en-US")}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {poll.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="w-24 text-sm text-white">{option.label}</span>
              <div className="flex-grow">
                {signer ? (
                  // <CustomProgressBar percentage={option.percentage} />
                  <GhostProgressBar />
                ) : (
                  <GhostProgressBar />
                )}
              </div>
              {signer && option.percentage ? (
                <span className="text-sm w-10 text-right">{option.percentage}%</span>
              ) : (
                <span className="text-sm w-10 text-right">?? %</span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full group-hover:bg-gray-300 transition-all duration-500 ease-in-out disabled:bg-gray-300 group-hover:disabled:bg-gray-300" disabled={!signer}>
          {signer ? "Generate Vote Recommendation" : "Connect Wallet"}
        </Button>
      </CardFooter>
    </Card>
  );
}
