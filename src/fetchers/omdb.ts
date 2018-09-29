import * as got from "got";
import { URL } from "url";

const baseURL = "https://www.omdbapi.com";

interface IFindParams {
  /** Movie title */
  t?: string;
  /** IMDb ID */
  i?: string;
  type?: "movie" | "series" | "episode";
  /** Year of release */
  y?: number;
  plot?: "short" | "full";
}
export async function find(apiKey: string, params: IFindParams) {
  const url = new URL(baseURL);
  url.searchParams.set("apikey", apiKey);

  Object.entries(params).forEach(([key, val]) => {
    if (!val) {
      return;
    }

    url.searchParams.set(key, val);
  });

  const { body } = await got.get(url.toString());

  const obj = JSON.parse(body);

  if (obj.Response === "False") {
    throw new Error(obj.Error || `Error on searching for ${params}`);
  }

  return obj;
}
