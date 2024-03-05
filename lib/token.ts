export const token =
  process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN ||
  process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  throw new Error("Missing SANITY STUDIO API READ TOKEN!");
}
