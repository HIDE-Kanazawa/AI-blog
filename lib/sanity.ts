import { createClient, type ClientConfig, type SanityClient } from "@sanity/client";

export const SANITY_PROJECT_ID = "your-project-id";
export const SANITY_DATASET = "production";
export const SANITY_API_VERSION = "2024-01-01";
export const SANITY_WRITE_TOKEN = "your-write-token";

const baseConfig: ClientConfig = {
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
};

export const sanityReadClient: SanityClient = createClient({
  ...baseConfig,
  useCdn: true,
});

export const sanityWriteClient: SanityClient = createClient({
  ...baseConfig,
  useCdn: false,
  token: SANITY_WRITE_TOKEN,
});
