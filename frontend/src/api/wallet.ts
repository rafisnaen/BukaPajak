// src/api/wallet.ts
import api from "./api";

export async function getNonce(email: string) {
  const res = await api.get(`/api/wallet/nonce?email=${email}`);
  return res.data; // { nonce: "xxx" }
}

export async function verifyWallet(
  email: string,
  address: string,
  signature: string
) {
  const res = await api.post(`/api/wallet/verify`, {
    email,
    address,
    signature,
  });
  return res.data; // { token: "jwt_token" }
}
