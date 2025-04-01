/** @type {import('next').NextConfig} */
const nextConfig = {
       devIndicators: false,
       experimental: {
              serverActions: {
                     bodySizeLimit: '3mb',
              },
       },
       images: {
              domains: [
                     'lh3.googleusercontent.com'
              ]
       }
};

export default nextConfig;
