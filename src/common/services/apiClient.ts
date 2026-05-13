import axios from 'axios';
import Constants from 'expo-constants';

const BACKEND_PORT = 3333;
function resolverBaseUrl(): string {
  const override = process.env.EXPO_PUBLIC_API_URL;
  if (override) return override;

  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const host = hostUri.split(':')[0];
    return `http://${host}:${BACKEND_PORT}/api`;
  }

  return `http://localhost:${BACKEND_PORT}/api`;
}

export const apiClient = axios.create({
  baseURL: resolverBaseUrl(),
  timeout: 60000,
});
