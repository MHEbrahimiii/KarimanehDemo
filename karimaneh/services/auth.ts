export const sendOtp = async (phone: string) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ success: true }), 500)
  );
};

export const verifyOtp = async (code: string) => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          token: "mock-token",
          user: { name: "علی رضایی", role: "مدیر صندوق" },
        }),
      500
    )
  );
};
