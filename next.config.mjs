/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uwpeqcdjjspoyjamyhsj.supabase.co',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'api.sandbox.midtrans.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
