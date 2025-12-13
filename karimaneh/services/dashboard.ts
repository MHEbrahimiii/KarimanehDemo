import { dashboardMock } from "@/mock/dashboard";

export const getDashboardMock = async () => {
  return new Promise<typeof dashboardMock>((resolve) =>
    setTimeout(() => resolve(dashboardMock), 600)
  );
};
