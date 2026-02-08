/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        serverActions: true,
        serverActionsBodySizeLimit: "2mb"
    },
    webpack: (config) => {
        return config;
    },
}

module.exports = nextConfig
