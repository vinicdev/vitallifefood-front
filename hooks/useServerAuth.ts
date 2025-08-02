import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const useServerAuth = async () => {
  const cookieStore = await cookies();

  const getAccessToken = () => {
    return cookieStore.get("accessToken")?.value;
  };

  const isAuthenticated = () => {
    const token = getAccessToken();
    return !!token;
  };

  const requireAuth = (redirectTo = "/auth/admin") => {
    if (!isAuthenticated()) {
      redirect(redirectTo);
    }
  };

  const requireGuest = (redirectTo = "/admin/dashboard") => {
    if (isAuthenticated()) {
      redirect(redirectTo);
    }
  };

  return {
    getAccessToken,
    isAuthenticated,
    requireAuth,
    requireGuest,
  };
};
