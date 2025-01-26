import axios from 'axios';

export const validateToken = async (token: string) => {
  try {
    const response = await axios.post('/api/verify-token', { token });
    console.log('Token validation result:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error validating token:', error);
    return null;
  }
};
