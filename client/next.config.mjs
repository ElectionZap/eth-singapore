/** @type {import('next').NextConfig} */
const nextConfig = {
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000, // Verifica mudanças nos arquivos a cada segundo
      aggregateTimeout: 300, // Aguarda 300ms antes de recompilar
      ignored: /node_modules/, // Ignora a pasta node_modules para evitar lentidão
    };
    return config;
  },
  images: {
    domains: ["i.scdn.co", "teal-magic-alligator-248.mypinata.cloud"],
  },
};

export default nextConfig;
