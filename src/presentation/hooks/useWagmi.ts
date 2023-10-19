import { BAOBAB_CONFIG } from "src/data/config/chains";
import { configureChains, createConfig } from "wagmi";
import { EthereumClient, w3mProvider } from "@web3modal/ethereum";
import { CustomW3mConnector } from "src/common/helpers/CustomW3mConnector";
import { InjectedConnector } from "@wagmi/core/connectors/injected";

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
        chains: [BAOBAB_CONFIG],
        options: {
          projectId,
          showQrModal: false,
          methods: ["eth_requestSessionKey"],
        },
      }),
      new InjectedConnector({
        chains,
        options: { shimDisconnect: true },
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
