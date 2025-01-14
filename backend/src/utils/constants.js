const cookieHeader = {
  httpOnly: true,
  secure: true, // Use true if deployed over HTTPS
  sameSite: "none", // Set to 'none' for cross-origin cookies
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};

export { cookieHeader };
