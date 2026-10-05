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
  experimental: {
    serverComponentsExternalPackages: [
      "@xenova/transformers",
      "onnxruntime-node",
    ],
    outputFileTracingExcludes: {
      "*": [
        "node_modules/onnxruntime-node/bin/napi-v3/darwin/**",
        "node_modules/onnxruntime-node/bin/napi-v3/win32/**",
        "node_modules/onnxruntime-node/bin/napi-v3/linux/arm64/**",
        "node_modules/@xenova/transformers/.cache/**",
      ],
    },
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