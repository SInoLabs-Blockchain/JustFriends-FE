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

export const FUJI_CONFIG = {
  id: 43113,
  name: "Avalanche Fuji",
  network: "fuji",
  nativeCurrency: {
    name: "AVAX",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://api.avax-test.network/ext/bc/C/rpc"],
      webSocket: ["wss://api.avax-test.network/ext/bc/C/ws"],
    },
    public: {
      http: ["https://api.avax-test.network/ext/bc/C/rpc"],
      webSocket: ["wss://api.avax-test.network/ext/bc/C/ws"],
    },
  },
  blockExplorers: {
    default: {
      name: "AvalancheFuji",
      url: "https://testnet.snowtrace.io",
    },
  },
  testnet: true,
};
