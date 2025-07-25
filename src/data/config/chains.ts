export const BAOBAB_CONFIG = {
  id: 1001,
  name: "Baobab",
  network: "baobab",
  nativeCurrency: {
    name: "KLAY",
    symbol: "KLAY",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://public-en-baobab.klaytn.net"],
      webSocket: ["wss://public-en-baobab.klaytn.net/ws"],
    },
    public: {
      http: ["https://public-en-baobab.klaytn.net"],
      webSocket: ["wss://public-en-baobab.klaytn.net/ws"],
    },
  },
  blockExplorers: {
    default: {
      name: "BaobabScope",
      url: "https://baobab.scope.klaytn.com",
    },
  },
  testnet: true,
};

export const LISK_CONFIG = {
  id: 4202,
  name: "Fisk Sepolia",
  network: "fuji",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.sepolia-api.lisk.com"],
      webSocket: ["wss://ws.sepolia-api.lisk.com"],
    },
    public: {
      http: ["https://rpc.sepolia-api.lisk.com"],
      webSocket: ["wss://ws.sepolia-api.lisk.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "FiskSepolia",
      url: "https://sepolia-blockscout.lisk.com/",
    },
  },
  testnet: true,
};
