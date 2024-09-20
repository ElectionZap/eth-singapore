import Link from "next/link";
import * as React from "react";

export default function TestPage() {
  return (
    <div className="items-center justify-items-center min-h-screen px-48 font-[family-name:var(--font-geist-sans)]">
      <p>TEST</p>
      <div className="flex flex-col space-y-6 mt-6">
        <Link href="/test-rythleaderboard">
          <div className="bg-blue-500 w-48 text-center">Test Leaderboard</div>
        </Link>
        <Link href="/test-rytherc20">
          <div className="bg-blue-500 w-48 text-center">Test ERC20</div>
        </Link>
      </div>
    </div>
  );
}
