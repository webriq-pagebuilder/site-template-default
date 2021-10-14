module.exports = {
  target: "experimental-serverless-trace",
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
