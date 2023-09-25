import { IGetJobAdsResponse } from "@/models/IGetJobAdsResponse";
import { IGetJobAds } from "@/models/IGetJobAds";
import { get } from "@/services/ServiceBase";

// Base values that pre-filters search results
const REQUEST_SPECCS = import.meta.env.VITE_REQUEST_SPECCS;

export const getJobAds = async (params: IGetJobAds) => {
  if ((params.historicalFrom && params.historicalTo) === undefined) {
    return await get<IGetJobAdsResponse>(
      `search?employer=${params.employer}${REQUEST_SPECCS}`
    );
  }

  if (params.historicalTo === undefined) {
    return await get<IGetJobAdsResponse>(
      `search?employer=${params.employer}&historical-from=${params.historicalFrom}${REQUEST_SPECCS}`
    );
  }

  if (params.historicalFrom === undefined) {
    return await get<IGetJobAdsResponse>(
      `search?employer=${params.employer}&historical-to=${params.historicalTo}${REQUEST_SPECCS}`
    );
  }

  return await get<IGetJobAdsResponse>(
    `search?employer=${params.employer}&historical-from=${params.historicalFrom}&historical-to=${params.historicalTo}${REQUEST_SPECCS}`
  );
};

// Feature for version 2.0

export const getAd = async (id: string) => {
  return await get(`ad/${id}`);
};
