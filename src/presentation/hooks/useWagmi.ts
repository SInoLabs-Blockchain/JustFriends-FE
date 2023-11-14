import { BAOBAB_CONFIG } from "src/data/config/chains";
import { configureChains, createConfig } from "wagmi";
import { EthereumClient, w3mProvider } from "@web3modal/ethereum";
import { CustomW3mConnector } from "src/common/helpers/CustomW3mConnector";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

function useWagmi() {
  const projectId: string = process.env.REACT_APP_PROJECT_ID || "";

  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [BAOBAB_CONFIG],
    [w3mProvider({ projectId })]
  );

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [
      new CustomW3mConnector({
        chains,
        options: {
          projectId,
          showQrModal: false,
          methods: ["eth_requestSessionKey"],
        },
      }),
      new MetaMaskConnector({ chains }),
      new InjectedConnector({
        chains,
        options: {
          name: "Injected",
          shimDisconnect: true,
        },
      }),
    ],
    webSocketPublicClient,
    publicClient,
  });

  const ethereumClient = new EthereumClient(wagmiConfig, chains);

  return {
    ethereumClient,
    projectId,
    wagmiConfig,
  };
}

export default useWagmi;
