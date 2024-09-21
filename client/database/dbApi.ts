import * as dotenv from 'dotenv';

dotenv.config();

const BACKEND_URL = process.env.BACKEND_URL as string;

export const fetchAllPolls = async () => {
  const response = await fetch(`${BACKEND_URL}/api/polls`);
  const polls = await response.json();
  return polls;
};

export const fetchPollByID = async (id: string) => {
  const response = await fetch(`${BACKEND_URL}/api/polls/${id}`);
  const poll = await response.json();
  return poll;
};

export const fetchPollsByStatus = async (status: string) => {
  const response = await fetch(`${BACKEND_URL}/api/polls/${status}`);
  const polls = await response.json();
  return polls;
};

export const createPoll = async (poll: any) => {
  const response = await fetch(`${BACKEND_URL}/api/create-poll`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(poll),
  });
  const newPoll = await response.json();
  return newPoll;
};
