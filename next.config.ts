import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'http://192.168.1.8',
    'http://192.168.1.8:3000',
    '192.168.1.8',
  ],
}

export default nextConfig
