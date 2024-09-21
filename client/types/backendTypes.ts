// POLL BODY EXAMPLE
// {
//     "title": "Best Pokémon of All Time",
//     "description": "Vote for the Pokémon you think is the best of all time based on strength, design, and lore.",
//     "isQuadraticVoting": 0,
//     "creator": "0x3",
//     "startDate": "2024-09-21T10:00:00Z",
//     "endDate": "2024-09-28T10:00:00Z",
//     "votingOptions": [{ "id": 1, "option": "Pikachu"},{ "id": 2, "option": "Charizard"}],
//     "status": "ongoing"
//   }

export type Poll = {
    id: number, // generates automatically when creating a new poll
    title: string,
    description: string,
    isQuadraticVoting: boolean,
    creator: string,
    startDate: string,
    endDate: string,
    votingOptions: VotingOption[],
    results: string,
    status: string,
    questionaire: string,
    userIDs: string[]
}

// ALMOST DEPRECATED
export type VotingOption = {
    id: number,
    option: string,
    // votes: number
}

// DEPRECATED
// export type Questionaire = {
//     question: string,
//     options: string[]
// }

export type User = {
    id: number,
    userName: string,
    email: string,
    wallet: string[],
    pollIDs: string[]
}