/** @type {import('next').NextConfig} */
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin');

const nextConfig = {
    experimental: {
        serverActions: true,
        serverActionsBodySizeLimit: "2mb"
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.plugins = [...config.plugins, new PrismaPlugin()];
        }

        return config;
    },
}

module.exports = nextConfig
