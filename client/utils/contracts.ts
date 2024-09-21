const contracts = {
  11155111: {
    ConstantInitialVoiceCreditProxy: {
      address: "0x41293862e60d17623fc760C3FD97bC36293Ad7ED",
      abi: [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_balance",
              type: "uint256",
            },
          ],
          stateMutability: "payable",
          type: "constructor",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "bytes",
              name: "",
              type: "bytes",
            },
          ],
          name: "getVoiceCredits",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      deploymentBlockNumber: 6730777,
    },
    FreeForAllGatekeeper: {
      address: "0x4C7a83ccD9177d3A2C800D614461e48B3aA4C471",
      abi: [
        {
          inputs: [],
          stateMutability: "payable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "getTrait",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_address",
              type: "address",
            },
            {
              internalType: "bytes",
              name: "_data",
              type: "bytes",
            },
          ],
          name: "register",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_maci",
              type: "address",
            },
          ],
          name: "setMaciInstance",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      deploymentBlockNumber: 6730779,
    },
    MACIWrapper: {
      address: "0x89eD382d4B94Db5dcf436b40795199708aC4f05d",
      abi: [
        {
          inputs: [
            {
              internalType: "contract IPollFactory",
              name: "_pollFactory",
              type: "address",
            },
            {
              internalType: "contract IMessageProcessorFactory",
              name: "_messageProcessorFactory",
              type: "address",
            },
            {
              internalType: "contract ITallyFactory",
              name: "_tallyFactory",
              type: "address",
            },
            {
              internalType: "contract SignUpGatekeeper",
              name: "_signUpGatekeeper",
              type: "address",
            },
            {
              internalType: "contract InitialVoiceCreditProxy",
              name: "_initialVoiceCreditProxy",
              type: "address",
            },
            {
              internalType: "uint8",
              name: "_stateTreeDepth",
              type: "uint8",
            },
            {
              internalType: "uint256[5]",
              name: "_emptyBallotRoots",
              type: "uint256[5]",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "DefaultZeroBadIndex",
          type: "error",
        },
        {
          inputs: [],
          name: "DepthTooLarge",
          type: "error",
        },
        {
          inputs: [],
          name: "InvalidMessage",
          type: "error",
        },
        {
          inputs: [],
          name: "InvalidPubKey",
          type: "error",
        },
        {
          inputs: [],
          name: "NumberOfLeavesCannotBeZero",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
          ],
          name: "OwnableInvalidOwner",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "OwnableUnauthorizedAccount",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_poll",
              type: "address",
            },
          ],
          name: "PollAddressDoesNotExist",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "pollId",
              type: "uint256",
            },
          ],
          name: "PollDoesNotExist",
          type: "error",
        },
        {
          inputs: [],
          name: "PoseidonHashLibrariesNotLinked",
          type: "error",
        },
        {
          inputs: [],
          name: "PubKeyAlreadyRegistered",
          type: "error",
        },
        {
          inputs: [],
          name: "TooManySignups",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "_pollId",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "_coordinatorPubKeyX",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "_coordinatorPubKeyY",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "enum DomainObjs.Mode",
              name: "_mode",
              type: "uint8",
            },
          ],
          name: "DeployPoll",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "pollId",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "address",
              name: "creator",
              type: "address",
            },
            {
              components: [
                {
                  internalType: "address",
                  name: "poll",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "messageProcessor",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "tally",
                  type: "address",
                },
              ],
              indexed: false,
              internalType: "struct MACI.PollContracts",
              name: "pollContracts",
              type: "tuple",
            },
            {
              indexed: false,
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string[]",
              name: "options",
              type: "string[]",
            },
            {
              indexed: false,
              internalType: "string",
              name: "metadata",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "startTime",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "endTime",
              type: "uint256",
            },
          ],
          name: "PollCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "pollId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "tallyJsonCID",
              type: "string",
            },
          ],
          name: "PollTallyCIDUpdated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "_stateIndex",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "_userPubKeyX",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "_userPubKeyY",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "_voiceCreditBalance",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "_timestamp",
              type: "uint256",
            },
          ],
          name: "SignUp",
          type: "event",
        },
        {
          inputs: [],
          name: "MESSAGE_DATA_LENGTH",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "coordinatorPubKey",
          outputs: [
            {
              internalType: "uint256",
              name: "x",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "y",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
            {
              internalType: "string[]",
              name: "_options",
              type: "string[]",
            },
            {
              internalType: "string",
              name: "_metadata",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "_duration",
              type: "uint256",
            },
            {
              internalType: "enum DomainObjs.Mode",
              name: "isQv",
              type: "uint8",
            },
          ],
          name: "createPoll",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_duration",
              type: "uint256",
            },
            {
              components: [
                {
                  internalType: "uint8",
                  name: "intStateTreeDepth",
                  type: "uint8",
                },
                {
                  internalType: "uint8",
                  name: "messageTreeSubDepth",
                  type: "uint8",
                },
                {
                  internalType: "uint8",
                  name: "messageTreeDepth",
                  type: "uint8",
                },
                {
                  internalType: "uint8",
                  name: "voteOptionTreeDepth",
                  type: "uint8",
                },
              ],
              internalType: "struct Params.TreeDepths",
              name: "_treeDepths",
              type: "tuple",
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "x",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "y",
                  type: "uint256",
                },
              ],
              internalType: "struct DomainObjs.PubKey",
              name: "_coordinatorPubKey",
              type: "tuple",
            },
            {
              internalType: "address",
              name: "_verifier",
              type: "address",
            },
            {
              internalType: "address",
              name: "_vkRegistry",
              type: "address",
            },
            {
              internalType: "enum DomainObjs.Mode",
              name: "_mode",
              type: "uint8",
            },
          ],
          name: "deployPoll",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "emptyBallotRoots",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_pollId",
              type: "uint256",
            },
          ],
          name: "fetchPoll",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "bytes",
                  name: "encodedOptions",
                  type: "bytes",
                },
                {
                  internalType: "string",
                  name: "metadata",
                  type: "string",
                },
                {
                  components: [
                    {
                      internalType: "address",
                      name: "poll",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "messageProcessor",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "tally",
                      type: "address",
                    },
                  ],
                  internalType: "struct MACI.PollContracts",
                  name: "pollContracts",
                  type: "tuple",
                },
                {
                  internalType: "uint256",
                  name: "startTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "endTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "numOfOptions",
                  type: "uint256",
                },
                {
                  internalType: "string[]",
                  name: "options",
                  type: "string[]",
                },
                {
                  internalType: "string",
                  name: "tallyJsonCID",
                  type: "string",
                },
              ],
              internalType: "struct MACIWrapper.PollData",
              name: "poll_",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_page",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_perPage",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "_ascending",
              type: "bool",
            },
          ],
          name: "fetchPolls",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "bytes",
                  name: "encodedOptions",
                  type: "bytes",
                },
                {
                  internalType: "string",
                  name: "metadata",
                  type: "string",
                },
                {
                  components: [
                    {
                      internalType: "address",
                      name: "poll",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "messageProcessor",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "tally",
                      type: "address",
                    },
                  ],
                  internalType: "struct MACI.PollContracts",
                  name: "pollContracts",
                  type: "tuple",
                },
                {
                  internalType: "uint256",
                  name: "startTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "endTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "numOfOptions",
                  type: "uint256",
                },
                {
                  internalType: "string[]",
                  name: "options",
                  type: "string[]",
                },
                {
                  internalType: "string",
                  name: "tallyJsonCID",
                  type: "string",
                },
              ],
              internalType: "struct MACIWrapper.PollData[]",
              name: "polls_",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_pollId",
              type: "uint256",
            },
          ],
          name: "getPoll",
          outputs: [
            {
              components: [
                {
                  internalType: "address",
                  name: "poll",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "messageProcessor",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "tally",
                  type: "address",
                },
              ],
              internalType: "struct MACI.PollContracts",
              name: "pollContracts",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_poll",
              type: "address",
            },
          ],
          name: "getPollId",
          outputs: [
            {
              internalType: "uint256",
              name: "pollId",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getStateTreeRoot",
          outputs: [
            {
              internalType: "uint256",
              name: "root",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256[2]",
              name: "array",
              type: "uint256[2]",
            },
          ],
          name: "hash2",
          outputs: [
            {
              internalType: "uint256",
              name: "result",
              type: "uint256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256[3]",
              name: "array",
              type: "uint256[3]",
            },
          ],
          name: "hash3",
          outputs: [
            {
              internalType: "uint256",
              name: "result",
              type: "uint256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256[4]",
              name: "array",
              type: "uint256[4]",
            },
          ],
          name: "hash4",
          outputs: [
            {
              internalType: "uint256",
              name: "result",
              type: "uint256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256[5]",
              name: "array",
              type: "uint256[5]",
            },
          ],
          name: "hash5",
          outputs: [
            {
              internalType: "uint256",
              name: "result",
              type: "uint256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "left",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "right",
              type: "uint256",
            },
          ],
          name: "hashLeftRight",
          outputs: [
            {
              internalType: "uint256",
              name: "result",
              type: "uint256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "uint256[10]",
                  name: "data",
                  type: "uint256[10]",
                },
              ],
              internalType: "struct DomainObjs.Message",
              name: "_message",
              type: "tuple",
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "x",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "y",
                  type: "uint256",
                },
              ],
              internalType: "struct DomainObjs.PubKey",
              name: "_encPubKey",
              type: "tuple",
            },
          ],
          name: "hashMessageAndEncPubKey",
          outputs: [
            {
              internalType: "uint256",
              name: "msgHash",
              type: "uint256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              components: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "x",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "y",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct DomainObjs.PubKey",
                  name: "pubKey",
                  type: "tuple",
                },
                {
                  internalType: "uint256",
                  name: "voiceCreditBalance",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "timestamp",
                  type: "uint256",
                },
              ],
              internalType: "struct DomainObjs.StateLeaf",
              name: "_stateLeaf",
              type: "tuple",
            },
          ],
          name: "hashStateLeaf",
          outputs: [
            {
              internalType: "uint256",
              name: "ciphertext",
              type: "uint256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [],
          name: "initialVoiceCreditProxy",
          outputs: [
            {
              internalType: "contract InitialVoiceCreditProxy",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "isPublicKeyRegistered",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "lazyIMTData",
          outputs: [
            {
              internalType: "uint40",
              name: "maxIndex",
              type: "uint40",
            },
            {
              internalType: "uint40",
              name: "numberOfLeaves",
              type: "uint40",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "maxSignups",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "messageProcessorFactory",
          outputs: [
            {
              internalType: "contract IMessageProcessorFactory",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "nextPollId",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "numSignUps",
          outputs: [
            {
              internalType: "uint256",
              name: "signUps",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256[2]",
              name: "dataToPad",
              type: "uint256[2]",
            },
          ],
          name: "padAndHashMessage",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256[10]",
                  name: "data",
                  type: "uint256[10]",
                },
              ],
              internalType: "struct DomainObjs.Message",
              name: "message",
              type: "tuple",
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "x",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "y",
                  type: "uint256",
                },
              ],
              internalType: "struct DomainObjs.PubKey",
              name: "padKey",
              type: "tuple",
            },
            {
              internalType: "uint256",
              name: "msgHash",
              type: "uint256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [],
          name: "pollFactory",
          outputs: [
            {
              internalType: "contract IPollFactory",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "pollIds",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "polls",
          outputs: [
            {
              internalType: "address",
              name: "poll",
              type: "address",
            },
            {
              internalType: "address",
              name: "messageProcessor",
              type: "address",
            },
            {
              internalType: "address",
              name: "tally",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "uint8",
                  name: "intStateTreeDepth",
                  type: "uint8",
                },
                {
                  internalType: "uint8",
                  name: "messageTreeSubDepth",
                  type: "uint8",
                },
                {
                  internalType: "uint8",
                  name: "messageTreeDepth",
                  type: "uint8",
                },
                {
                  internalType: "uint8",
                  name: "voteOptionTreeDepth",
                  type: "uint8",
                },
              ],
              internalType: "struct Params.TreeDepths",
              name: "_treeDepths",
              type: "tuple",
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "x",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "y",
                  type: "uint256",
                },
              ],
              internalType: "struct DomainObjs.PubKey",
              name: "_coordinatorPubKey",
              type: "tuple",
            },
            {
              internalType: "address",
              name: "_verifier",
              type: "address",
            },
            {
              internalType: "address",
              name: "_vkRegistry",
              type: "address",
            },
          ],
          name: "setConfig",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256[]",
              name: "array",
              type: "uint256[]",
            },
          ],
          name: "sha256Hash",
          outputs: [
            {
              internalType: "uint256",
              name: "result",
              type: "uint256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "x",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "y",
                  type: "uint256",
                },
              ],
              internalType: "struct DomainObjs.PubKey",
              name: "_pubKey",
              type: "tuple",
            },
            {
              internalType: "bytes",
              name: "_signUpGatekeeperData",
              type: "bytes",
            },
            {
              internalType: "bytes",
              name: "_initialVoiceCreditProxyData",
              type: "bytes",
            },
          ],
          name: "signUp",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "signUpGatekeeper",
          outputs: [
            {
              internalType: "contract SignUpGatekeeper",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "stateTreeDepth",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "tallyFactory",
          outputs: [
            {
              internalType: "contract ITallyFactory",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "treeDepths",
          outputs: [
            {
              internalType: "uint8",
              name: "intStateTreeDepth",
              type: "uint8",
            },
            {
              internalType: "uint8",
              name: "messageTreeSubDepth",
              type: "uint8",
            },
            {
              internalType: "uint8",
              name: "messageTreeDepth",
              type: "uint8",
            },
            {
              internalType: "uint8",
              name: "voteOptionTreeDepth",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_pollId",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "_tallyJsonCID",
              type: "string",
            },
          ],
          name: "updatePollTallyCID",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "verifier",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "vkRegistry",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {
        MESSAGE_DATA_LENGTH: "maci-contracts/contracts/MACI.sol",
        deployPoll: "maci-contracts/contracts/MACI.sol",
        emptyBallotRoots: "maci-contracts/contracts/MACI.sol",
        getPoll: "maci-contracts/contracts/MACI.sol",
        getStateTreeRoot: "maci-contracts/contracts/MACI.sol",
        hash2: "maci-contracts/contracts/MACI.sol",
        hash3: "maci-contracts/contracts/MACI.sol",
        hash4: "maci-contracts/contracts/MACI.sol",
        hash5: "maci-contracts/contracts/MACI.sol",
        hashLeftRight: "maci-contracts/contracts/MACI.sol",
        hashMessageAndEncPubKey: "maci-contracts/contracts/MACI.sol",
        hashStateLeaf: "maci-contracts/contracts/MACI.sol",
        initialVoiceCreditProxy: "maci-contracts/contracts/MACI.sol",
        lazyIMTData: "maci-contracts/contracts/MACI.sol",
        maxSignups: "maci-contracts/contracts/MACI.sol",
        messageProcessorFactory: "maci-contracts/contracts/MACI.sol",
        nextPollId: "maci-contracts/contracts/MACI.sol",
        numSignUps: "maci-contracts/contracts/MACI.sol",
        padAndHashMessage: "maci-contracts/contracts/MACI.sol",
        pollFactory: "maci-contracts/contracts/MACI.sol",
        polls: "maci-contracts/contracts/MACI.sol",
        sha256Hash: "maci-contracts/contracts/MACI.sol",
        signUp: "maci-contracts/contracts/MACI.sol",
        signUpGatekeeper: "maci-contracts/contracts/MACI.sol",
        stateTreeDepth: "maci-contracts/contracts/MACI.sol",
        tallyFactory: "maci-contracts/contracts/MACI.sol",
      },
      deploymentBlockNumber: 6730790,
    },
    MessageProcessorFactory: {
      address: "0x4333299ad4654794C4001Fd2a027969EB8f1c165",
      abi: [
        {
          inputs: [],
          name: "MESSAGE_DATA_LENGTH",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_verifier",
              type: "address",
            },
            {
              internalType: "address",
              name: "_vkRegistry",
              type: "address",
            },
            {
              internalType: "address",
              name: "_poll",
              type: "address",
            },
            {
              internalType: "address",
              name: "_owner",
              type: "address",
            },
            {
              internalType: "enum DomainObjs.Mode",
              name: "_mode",
              type: "uint8",
            },
          ],
          name: "deploy",
          outputs: [
            {
              internalType: "address",
              name: "messageProcessorAddr",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      deploymentBlockNumber: 6730788,
    },
    PollFactory: {
      address: "0x0ABDfAb945C1b1c0649b7808E8c657dE5cC19666",
      abi: [
        {
          inputs: [],
          stateMutability: "payable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "MESSAGE_DATA_LENGTH",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_duration",
              type: "uint256",
            },
            {
              components: [
                {
                  internalType: "uint8",
                  name: "intStateTreeDepth",
                  type: "uint8",
                },
                {
                  internalType: "uint8",
                  name: "messageTreeSubDepth",
                  type: "uint8",
                },
                {
                  internalType: "uint8",
                  name: "messageTreeDepth",
                  type: "uint8",
                },
                {
                  internalType: "uint8",
                  name: "voteOptionTreeDepth",
                  type: "uint8",
                },
              ],
              internalType: "struct Params.TreeDepths",
              name: "_treeDepths",
              type: "tuple",
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "x",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "y",
                  type: "uint256",
                },
              ],
              internalType: "struct DomainObjs.PubKey",
              name: "_coordinatorPubKey",
              type: "tuple",
            },
            {
              internalType: "address",
              name: "_maci",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_emptyBallotRoot",
              type: "uint256",
            },
          ],
          name: "deploy",
          outputs: [
            {
              internalType: "address",
              name: "pollAddr",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      deploymentBlockNumber: 6730787,
    },
    PoseidonT3: {
      address: "0xaeB59c043D0b022d31Ae13c3689785Df88266434",
      abi: [
        {
          inputs: [
            {
              internalType: "uint256[2]",
              name: "input",
              type: "uint256[2]",
            },
          ],
          name: "poseidon",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
      ],
      deploymentBlockNumber: 6730782,
    },
    PoseidonT4: {
      address: "0x0B7186B2beCE8d0E41329Bda5Fc9b59e8257B5B4",
      abi: [
        {
          inputs: [
            {
              internalType: "uint256[3]",
              name: "input",
              type: "uint256[3]",
            },
          ],
          name: "poseidon",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
      ],
      deploymentBlockNumber: 6730783,
    },
    PoseidonT5: {
      address: "0xd4EF52AF22546ec7AcCFfA7290B39dc5eD32eec8",
      abi: [
        {
          inputs: [
            {
              internalType: "uint256[4]",
              name: "input",
              type: "uint256[4]",
            },
          ],
          name: "poseidon",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
      ],
      deploymentBlockNumber: 6730785,
    },
    PoseidonT6: {
      address: "0x20A391800577D0756A62CE61612eEB499a482f86",
      abi: [
        {
          inputs: [
            {
              internalType: "uint256[5]",
              name: "input",
              type: "uint256[5]",
            },
          ],
          name: "poseidon",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
      ],
      deploymentBlockNumber: 6730786,
    },
    TallyFactory: {
      address: "0x3782eF5d3ec8e7a0EcC05Ad74D20e724Ffa33381",
      abi: [
        {
          inputs: [],
          name: "MESSAGE_DATA_LENGTH",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_verifier",
              type: "address",
            },
            {
              internalType: "address",
              name: "_vkRegistry",
              type: "address",
            },
            {
              internalType: "address",
              name: "_poll",
              type: "address",
            },
            {
              internalType: "address",
              name: "_messageProcessor",
              type: "address",
            },
            {
              internalType: "address",
              name: "_owner",
              type: "address",
            },
            {
              internalType: "enum DomainObjs.Mode",
              name: "_mode",
              type: "uint8",
            },
          ],
          name: "deploy",
          outputs: [
            {
              internalType: "address",
              name: "tallyAddr",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      deploymentBlockNumber: 6730789,
    },
    Verifier: {
      address: "0xCf4352ED8eC1981F2cB1e8B65C7Dfca7Bcc523ee",
      abi: [
        {
          inputs: [],
          name: "InvalidInputVal",
          type: "error",
        },
        {
          inputs: [],
          name: "InvalidProofQ",
          type: "error",
        },
        {
          inputs: [],
          name: "PairingAddFailed",
          type: "error",
        },
        {
          inputs: [],
          name: "PairingMulFailed",
          type: "error",
        },
        {
          inputs: [],
          name: "PairingOpcodeFailed",
          type: "error",
        },
        {
          inputs: [],
          name: "PRIME_Q",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256[8]",
              name: "_proof",
              type: "uint256[8]",
            },
            {
              components: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "x",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "y",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Pairing.G1Point",
                  name: "alpha1",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "beta2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "gamma2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "delta2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "x",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "y",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Pairing.G1Point[]",
                  name: "ic",
                  type: "tuple[]",
                },
              ],
              internalType: "struct SnarkCommon.VerifyingKey",
              name: "vk",
              type: "tuple",
            },
            {
              internalType: "uint256[]",
              name: "inputs",
              type: "uint256[]",
            },
          ],
          name: "verify",
          outputs: [
            {
              internalType: "bool",
              name: "isValid",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      deploymentBlockNumber: 6730780,
    },
    VkRegistry: {
      address: "0x086904d468Bb2A4e8C024AE1dbf6058d0936AE26",
      abi: [
        {
          inputs: [],
          stateMutability: "payable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "InvalidKeysParams",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
          ],
          name: "OwnableInvalidOwner",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "OwnableUnauthorizedAccount",
          type: "error",
        },
        {
          inputs: [],
          name: "ProcessVkAlreadySet",
          type: "error",
        },
        {
          inputs: [],
          name: "ProcessVkNotSet",
          type: "error",
        },
        {
          inputs: [],
          name: "SubsidyVkNotSet",
          type: "error",
        },
        {
          inputs: [],
          name: "TallyVkAlreadySet",
          type: "error",
        },
        {
          inputs: [],
          name: "TallyVkNotSet",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "_sig",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "enum DomainObjs.Mode",
              name: "_mode",
              type: "uint8",
            },
          ],
          name: "ProcessVkSet",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "_sig",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "enum DomainObjs.Mode",
              name: "_mode",
              type: "uint8",
            },
          ],
          name: "TallyVkSet",
          type: "event",
        },
        {
          inputs: [],
          name: "MESSAGE_DATA_LENGTH",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_stateTreeDepth",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_messageTreeDepth",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_voteOptionTreeDepth",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_messageBatchSize",
              type: "uint256",
            },
          ],
          name: "genProcessVkSig",
          outputs: [
            {
              internalType: "uint256",
              name: "sig",
              type: "uint256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_stateTreeDepth",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_intStateTreeDepth",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_voteOptionTreeDepth",
              type: "uint256",
            },
          ],
          name: "genTallyVkSig",
          outputs: [
            {
              internalType: "uint256",
              name: "sig",
              type: "uint256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_stateTreeDepth",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_messageTreeDepth",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_voteOptionTreeDepth",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_messageBatchSize",
              type: "uint256",
            },
            {
              internalType: "enum DomainObjs.Mode",
              name: "_mode",
              type: "uint8",
            },
          ],
          name: "getProcessVk",
          outputs: [
            {
              components: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "x",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "y",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Pairing.G1Point",
                  name: "alpha1",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "beta2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "gamma2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "delta2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "x",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "y",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Pairing.G1Point[]",
                  name: "ic",
                  type: "tuple[]",
                },
              ],
              internalType: "struct SnarkCommon.VerifyingKey",
              name: "vk",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_sig",
              type: "uint256",
            },
            {
              internalType: "enum DomainObjs.Mode",
              name: "_mode",
              type: "uint8",
            },
          ],
          name: "getProcessVkBySig",
          outputs: [
            {
              components: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "x",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "y",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Pairing.G1Point",
                  name: "alpha1",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "beta2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "gamma2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "delta2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "x",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "y",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Pairing.G1Point[]",
                  name: "ic",
                  type: "tuple[]",
                },
              ],
              internalType: "struct SnarkCommon.VerifyingKey",
              name: "vk",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_stateTreeDepth",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_intStateTreeDepth",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_voteOptionTreeDepth",
              type: "uint256",
            },
            {
              internalType: "enum DomainObjs.Mode",
              name: "_mode",
              type: "uint8",
            },
          ],
          name: "getTallyVk",
          outputs: [
            {
              components: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "x",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "y",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Pairing.G1Point",
                  name: "alpha1",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "beta2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "gamma2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "delta2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "x",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "y",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Pairing.G1Point[]",
                  name: "ic",
                  type: "tuple[]",
                },
              ],
              internalType: "struct SnarkCommon.VerifyingKey",
              name: "vk",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_sig",
              type: "uint256",
            },
            {
              internalType: "enum DomainObjs.Mode",
              name: "_mode",
              type: "uint8",
            },
          ],
          name: "getTallyVkBySig",
          outputs: [
            {
              components: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "x",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "y",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Pairing.G1Point",
                  name: "alpha1",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "beta2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "gamma2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "delta2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "x",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "y",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Pairing.G1Point[]",
                  name: "ic",
                  type: "tuple[]",
                },
              ],
              internalType: "struct SnarkCommon.VerifyingKey",
              name: "vk",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_stateTreeDepth",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_messageTreeDepth",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_voteOptionTreeDepth",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_messageBatchSize",
              type: "uint256",
            },
            {
              internalType: "enum DomainObjs.Mode",
              name: "_mode",
              type: "uint8",
            },
          ],
          name: "hasProcessVk",
          outputs: [
            {
              internalType: "bool",
              name: "isSet",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_stateTreeDepth",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_intStateTreeDepth",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_voteOptionTreeDepth",
              type: "uint256",
            },
            {
              internalType: "enum DomainObjs.Mode",
              name: "_mode",
              type: "uint8",
            },
          ],
          name: "hasTallyVk",
          outputs: [
            {
              internalType: "bool",
              name: "isSet",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_sig",
              type: "uint256",
            },
            {
              internalType: "enum DomainObjs.Mode",
              name: "_mode",
              type: "uint8",
            },
          ],
          name: "isProcessVkSet",
          outputs: [
            {
              internalType: "bool",
              name: "isSet",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_sig",
              type: "uint256",
            },
            {
              internalType: "enum DomainObjs.Mode",
              name: "_mode",
              type: "uint8",
            },
          ],
          name: "isTallyVkSet",
          outputs: [
            {
              internalType: "bool",
              name: "isSet",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_stateTreeDepth",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_intStateTreeDepth",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_messageTreeDepth",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_voteOptionTreeDepth",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_messageBatchSize",
              type: "uint256",
            },
            {
              internalType: "enum DomainObjs.Mode",
              name: "_mode",
              type: "uint8",
            },
            {
              components: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "x",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "y",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Pairing.G1Point",
                  name: "alpha1",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "beta2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "gamma2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "delta2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "x",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "y",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Pairing.G1Point[]",
                  name: "ic",
                  type: "tuple[]",
                },
              ],
              internalType: "struct SnarkCommon.VerifyingKey",
              name: "_processVk",
              type: "tuple",
            },
            {
              components: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "x",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "y",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Pairing.G1Point",
                  name: "alpha1",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "beta2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "gamma2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "delta2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "x",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "y",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Pairing.G1Point[]",
                  name: "ic",
                  type: "tuple[]",
                },
              ],
              internalType: "struct SnarkCommon.VerifyingKey",
              name: "_tallyVk",
              type: "tuple",
            },
          ],
          name: "setVerifyingKeys",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_stateTreeDepth",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_intStateTreeDepth",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_messageTreeDepth",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_voteOptionTreeDepth",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_messageBatchSize",
              type: "uint256",
            },
            {
              internalType: "enum DomainObjs.Mode[]",
              name: "_modes",
              type: "uint8[]",
            },
            {
              components: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "x",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "y",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Pairing.G1Point",
                  name: "alpha1",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "beta2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "gamma2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "delta2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "x",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "y",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Pairing.G1Point[]",
                  name: "ic",
                  type: "tuple[]",
                },
              ],
              internalType: "struct SnarkCommon.VerifyingKey[]",
              name: "_processVks",
              type: "tuple[]",
            },
            {
              components: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "x",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "y",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Pairing.G1Point",
                  name: "alpha1",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "beta2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "gamma2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256[2]",
                      name: "x",
                      type: "uint256[2]",
                    },
                    {
                      internalType: "uint256[2]",
                      name: "y",
                      type: "uint256[2]",
                    },
                  ],
                  internalType: "struct Pairing.G2Point",
                  name: "delta2",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "x",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "y",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Pairing.G1Point[]",
                  name: "ic",
                  type: "tuple[]",
                },
              ],
              internalType: "struct SnarkCommon.VerifyingKey[]",
              name: "_tallyVks",
              type: "tuple[]",
            },
          ],
          name: "setVerifyingKeysBatch",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      deploymentBlockNumber: 6730792,
    },
  },
} as const;

export default contracts;
