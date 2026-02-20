import { dashboardMock } from "@/mock/dashboard";

export type DashboardData = typeof dashboardMock;

export const getDashboardMock = async () => {
  return new Promise<DashboardData>((resolve) =>
    setTimeout(() => resolve(dashboardMock), 600)
  );
};
