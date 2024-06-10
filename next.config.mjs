/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  externals: {
    // 해당 URL을 무시하도록 설정
    // 해당 자원을 직접 포함하지 않고 외부에서 로드하도록 함
    './pages/hot-reloader-client.ts?b634': 'commonjs2 ./pages/hot-reloader-client.ts?b634'
  }
};

export default nextConfig;
