module.exports = {
  target: "serverless",
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ]
  },
}
