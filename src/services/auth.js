import axios from "axios";

const generatePublicKey = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_API}/auth/generate-public-key`
    );
    return response?.data?.data?.publicKey;
  } catch (error) {
    throw new Error(
      "Generate public key failed: " + error.response.data.message
    );
  }
};

const generateAccessToken = async (cognitoToken) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_API}/auth/generate-token`,
      {
        accessToken: cognitoToken,
      },
      null
    );
    return response?.data?.data;
  } catch (error) {
    throw new Error("Authentication Failed: " + error.response.data.message);
  }
};

const logout = async (token) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_API}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error during logout: " + error.response.data.message);
  }
};

const signUp = async (payload) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_API}/user/student`,
      payload
    );
    return response?.data;
  } catch (error) {
    throw new Error("Sign-up failed: " + error.response.data.message);
  }
};

const verifyOtp = async (payload) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_API}/auth/verify-otp`,
      payload
    );
    return response?.data;
  } catch (error) {
    throw new Error("OTP verification failed: " + error.response.data.message);
  }
};

const getCenter = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_API}/center`,
      null
    );
    return response?.data;
  } catch (error) {
    throw new Error("Failed to get center: " + error.response.data.message);
  }
};

export {
  generatePublicKey,
  generateAccessToken,
  logout,
  signUp,
  verifyOtp,
  getCenter,
};
