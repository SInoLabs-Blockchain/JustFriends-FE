import axios from "axios";
// Convert the JSON data to a string

// Define the headers for the POST request

interface Params {
  callData: string;
  callGasLimit: string;
  initCode: string;
  maxFeePerGas: string | number;
  maxPriorityFeePerGas: string | number;
  nonce: string;
  paymasterAndData: string;
  preVerificationGas: string | number;
  sender: string;
  signature: string;
  verificationGasLimit: string;
}

export const requestToRelayer = async (params: Params) => {
  const jsonData = {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_sendUserOperation",
    params: [params, process.env.REACT_APP_ENTRY_POINT_ADDRESS],
  };

  console.log({
    params: params,
    entrypoint: process.env.REACT_APP_ENTRY_POINT_ADDRESS,
  });

  try {
    const relayer_url = process.env.REACT_APP_RELAYER_URL || "";
    const res = await axios.post(relayer_url, jsonData);
    return res.data;
  } catch (error) {
    return {
      error,
    };
  }
};
