/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/fde",
        destination: "/resume/FDE.pdf",
        permanent: false,
      },
      {
        source: "/csm",
        destination: "/resume/CSM.pdf",
        permanent: false,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push(
        "onnxruntime-node"
      );
    }

    return config;
  },
};

export default nextConfig;