import {
  USER_ID,
  ACCESS_TOKEN,
  INSTAGRAM_GRAPH_URL,
  API_VERSION,
} from "utils/social-accounts/instagram";

async function handler(req, res) {
  // process based on request method
  if (req.method === "GET") {
    return getInstagramUserMedia(req, res);
  } else {
    return res.status(400).send("Invalid request!");
  }
}

// Get Instagram User profile
// reference: https://developers.facebook.com/docs/instagram-basic-display-api/reference/user
async function getInstagramUserProfile(req, res) {
  try {
    return await fetch(
      `${INSTAGRAM_GRAPH_URL}/${API_VERSION}/${USER_ID}?fields=media_count,username&edges=media&access_token=${ACCESS_TOKEN}`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((response) => res.status(200).json(response));
  } catch (error) {
    console.error("[ERROR] Failed to GET linked Instagram user! ", error);
    return res
      .status(400)
      .json({ error: "Failed to GET linked Instagram user!" });
  }
}

// Get Instagram user profile media
// reference: https://developers.facebook.com/docs/instagram-basic-display-api/reference/user/media
async function getInstagramUserMedia(req, res) {
  try {
    // get media posts
    return await fetch(
      `${INSTAGRAM_GRAPH_URL}/${API_VERSION}/${USER_ID}/media?fields=caption,id,is_shared_to_feed,media_type,media_url,permalink,thumbnail_url,timestamp,username&edges=children&access_token=${ACCESS_TOKEN}`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((response) => res.status(200).json(response));
  } catch (error) {
    console.error(
      "[ERROR] Failed to GET media feed for linked Instagram user! ",
      error
    );
    return res
      .status(400)
      .json({ error: "Failed to GET media feed for linked Instagram user!" });
  }
}

export default handler;
