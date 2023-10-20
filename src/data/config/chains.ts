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
