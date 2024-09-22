# PolyVOTE ☑️
**PolyVOTE** is an end-to-end *private voting service* using *MPC, ZK, and AI* to recommend and process votes with complete privacy.

**LiveVideoDemo:** [PolyVOTE Hackathon Demo](https://drive.google.com/drive/folders/1lY2BSXo4kccAxM1E4wTAPYv7bmKIwLDJ?usp=sharing)  
**GitHub Repository:** [GitHub - ElectionZap/eth-singapore](https://github.com/ElectionZap/eth-singapore)


## Short Description
**PolyVOTE** is a cutting-edge platform for secure and private voting that leverages Multi-Party Computation (MPC), Zero-Knowledge Proofs (ZK), and AI-driven personalized voting recommendations to ensure privacy, prevent collusion, and enhance voter decision-making.

## Problem
Modern voting systems face significant challenges, including:
- **Collusion Resistance:** Preventing coercion or incentivized voting.
- **Blind Computation:** Keeping voter data private while computing election results securely.

## Opportunities
- **Private Computation:** Use of MPC allows sensitive vote data to remain private during computation.
- **AI Recommendations:** Voters can receive tailored recommendations based on their preferences.
- **Anti-Collusion:** Secure anti-collusion mechanisms as a service for elections.
- **DAO Governances:** New ways of governance (Great for public goods 👀).

## Our Solution
**PolyVOTE** offers a fully private and secure voting service, combining MPC, ZK proofs, and AI-driven recommendations. Voters can cast their votes with confidence, knowing their privacy is protected, and election results remain transparent yet confidential.

### Key Features:
- **Private & Secure Voting:** Voter data, vote casting, and recommendations remain completely private.
- **MPC & ZK Integration:** Ensures privacy while allowing verifiable computation.
- **AI-Powered Recommendations:** Personalized recommendations based on user profiles.
- **Anti-Collusion Mechanisms:** Protects against collusion in the voting process.
- **Privacy-Preserving Analytics:** Transparent results without revealing individual votes.

## How It Works
1. **Connect a Wallet:** Securely link your wallet to the platform.
2. **Create an Election Poll:** Generate a ZK-auditable poll using our intuitive interface.
3. **AI Recommendations:** Receive personalized voting advice based on AI analysis of election data.
4. **Cast Your Vote:** Follow the AI recommendation or vote independently.
5. **View Results:** Access election results and data through privacy-preserving analytics.

## How It Was Made
- **UI & Smart Contracts:** We provide a whitelabel UI for election poll creation, deploying *MACI contracts* on *Linea*.
- **AI Integration:** *ChatGPT* is used to generate election questions and weight scores for AI-powered voting recommendations.
- **Private Storage & Computation:** Leveraging *Nillion* for securely storing weights and performing blind computation (MPC).
- **Private Voting:** Voting is carried out privately and securely via *MACI contracts*, ensuring full privacy throughout.

## Technologies Used
- **Multi-Party Computation (MPC)**
- **Zero-Knowledge Proofs (ZK)**
- **MACI Contracts**
- **Nillion for Blind Computation**
- **ChatGPT for AI-Driven Recommendations**
- **Linea Network**

## Contracts Addresses
- *ConstantInitialVoiceCreditProxy*: 0x41293862e60d17623fc760C3FD97bC36293Ad7ED
- *FreeForAllGatekeeper*: 0x4C7a83ccD9177d3A2C800D614461e48B3aA4C471
- *Verifier*: 0xCf4352ED8eC1981F2cB1e8B65C7Dfca7Bcc523ee
- *PoseidonT3*: 0xaeB59c043D0b022d31Ae13c3689785Df88266434
- *PoseidonT4*: 0x0B7186B2beCE8d0E41329Bda5Fc9b59e8257B5B4
- *PoseidonT5*: 0xd4EF52AF22546ec7AcCFfA7290B39dc5eD32eec8
- *PoseidonT6*: 0x20A391800577D0756A62CE61612eEB499a482f86
- *PollFactory*: 0x0ABDfAb945C1b1c0649b7808E8c657dE5cC19666
- *MessageProcessorFactory*: 0x4333299ad4654794C4001Fd2a027969EB8f1c165
- *TallyFactory*: 0x3782eF5d3ec8e7a0EcC05Ad74D20e724Ffa33381
- *MACIWrapper*: 0x89eD382d4B94Db5dcf436b40795199708aC4f05d
- *Vk Registry*: 0x086904d468Bb2A4e8C024AE1dbf6058d0936AE26
## Linea Contracts
deploying "ConstantInitialVoiceCreditProxy" deployed at 0x5B5AaDFf81c583D3D13B4a2909728FCd053B2962 
The initial voice credit proxy is deployed at 0x5B5AaDFf81c583D3D13B4a2909728FCd053B2962
deploying "FreeForAllGatekeeper" deployed at 0xd2a0bf5F6284d07bf8Be04ebf44D5317D0c5A826 
The gatekeeper is deployed at 0xd2a0bf5F6284d07bf8Be04ebf44D5317D0c5A826
deploying "Verifier" deployed at 0x5EA6078a4C987564eaB5685E3A1E6c07D70760Bd 
The verifier is deployed at 0x5EA6078a4C987564eaB5685E3A1E6c07D70760Bd
deploying "PoseidonT3" deployed at 0xa67dAe60C1FF27Bf122DffD6aD644301370B8f74 
The poseidonT3 is deployed at 0xa67dAe60C1FF27Bf122DffD6aD644301370B8f74
deploying "PoseidonT4" deployed at 0x0262AF6A158243E039e5dE8dcb374E6F8C331981 
The poseidonT4 is deployed at 0x0262AF6A158243E039e5dE8dcb374E6F8C331981
deploying "PoseidonT5" deployed at 0x569e75136126533947ea0d4e85b11ed1448d197E 
The poseidonT5 is deployed at 0x569e75136126533947ea0d4e85b11ed1448d197E
deploying "PoseidonT6" deployed at 0x5e6Ed8Eff4C9BEB262B41a7569cD8c63Ac076C8a 
The poseidonT6 is deployed at 0x5e6Ed8Eff4C9BEB262B41a7569cD8c63Ac076C8a
deploying "PollFactory" deployed at 0x55910fcce46b76343261d147812C665E46a33526
The poll factory is deployed at 0x55910fcce46b76343261d147812C665E46a33526
"MessageProcessorFactory" deployed at 0xC212C9511c34ca014F192Cfef6E91A823430384F with 2052082 gas
The message processor factory is deployed at 0xC212C9511c34ca014F192Cfef6E91A823430384F
"TallyFactory" deployed at 0x56e21ac9894f53b4B9B2063704c886D964e84c96
The tally factory is deployed at 0x56e21ac9894f53b4B9B2063704c886D964e84c96
"MACIWrapper" deployed at 0xac1ee4e757467F4c844D346630e7439DD931ceCc
The MACI contract is deployed at 0xac1ee4e757467F4c844D346630e7439DD931ceCc
The Vk Registry is deployed at 0x682e7674c698E1e5A54D4cc26e210D3c0ea3CF3d
## Source Code
The code for PolyVOTE is open-source and available on GitHub:  
[GitHub - ElectionZap/eth-singapore](https://github.com/ElectionZap/eth-singapore)

## Screenshots
![Screenshot 2024-09-22 081920](https://github.com/user-attachments/assets/ec0d6b31-da95-4a23-a1e5-3f75b6a9b69c)
![Screenshot 2024-09-22 082953](https://github.com/user-attachments/assets/446d6acc-5ce9-492f-a12b-5c154fdd0fe8)
![Screenshot 2024-09-22 082327](https://github.com/user-attachments/assets/552a6110-b10a-4d0a-846f-177ee890792a)
![Screenshot 2024-09-22 082156](https://github.com/user-attachments/assets/552a1cc8-c7a4-4703-9444-273c4ee70e63)
![Screenshot 2024-09-22 081631](https://github.com/user-attachments/assets/0b5307ed-1609-4ab3-ad06-049261666da1)

