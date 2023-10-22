import { httpClient } from "../httpClient";
import { sleep } from "../../utils/sleep";

export type SigninParams = {
  email: string;
  password: string;
};

type SigninResponse = {
  accessToken: string;
};

export async function signin(params: SigninParams) {
  await sleep(1000);

  const { data } = await httpClient.post<SigninResponse>(
    "/auth/signin",
    params
  );

  return data;
}
