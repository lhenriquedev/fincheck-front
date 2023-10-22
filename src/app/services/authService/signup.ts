import { httpClient } from "../httpClient";
import { sleep } from "../../utils/sleep";

export type SignupParams = {
  name: string;
  email: string;
  password: string;
};

type SignupResponse = {
  accessToken: string;
};

export async function signup(params: SignupParams) {
  await sleep(1000);

  const { data } = await httpClient.post<SignupResponse>(
    "/auth/signup",
    params
  );

  return data;
}
