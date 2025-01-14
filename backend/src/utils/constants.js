const cookieHeader = {
  httpOnly: true,
  secure: true, // Use true if deployed over HTTPS
  sameSite: "none", // Set to 'none' for cross-origin cookies
};

export { cookieHeader };
