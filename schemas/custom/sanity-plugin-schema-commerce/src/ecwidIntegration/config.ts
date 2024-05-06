const ecwidStoreID = process.env.SANITY_STUDIO_ECWID_STORE_ID || process.env.NEXT_PUBLIC_ECWID_STORE_ID;
const ecwidPublicToken = process.env.SANITY_STUDIO_ECWID_PUBLIC_TOKEN || process.env.NEXT_PUBLIC_ECWID_PUBLIC_TOKEN;

export const payload = {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${ecwidPublicToken}`,
  },
};

export const ecwidApiUrl = `https://app.ecwid.com/api/v3/${ecwidStoreID}/products`;