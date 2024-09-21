import * as dotenv from 'dotenv';

dotenv.config();

const BACKEND_URL = process.env.BACKEND_URL as string || "https://backend-production-e668.up.railway.app";

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
  const response = await fetch(`${BACKEND_URL}/api/polls/status/${status}`);
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

export const addNillionIdToPoll = async (pollId: string, nillionId: string) => {
  const response = await fetch(`${BACKEND_URL}/api/add-nillion-id-to-poll/${pollId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nillionId }),
  });
  const updatedPoll = await response.json();
  return updatedPoll;
}

export const getQuizFromPoll = async (pollId: string) => {
  const response = await fetch(`${BACKEND_URL}/api/polls/quiz/${pollId}`);
  const quiz = await response.json();
  return quiz;
};

export const deletePoll = async (pollId: string) => {
  const response = await fetch(`${BACKEND_URL}/api/delete-poll/${pollId}`, {
    method: "DELETE",
  });
  const deletedPoll = await response.json();
  return deletedPoll;
}

export const deleteAllPolls = async () => {
  const response = await fetch(`${BACKEND_URL}/api/delete-all-polls`, {
    method: "DELETE",
  });
  const deletedPolls = await response.json();
  return deletedPolls;
}