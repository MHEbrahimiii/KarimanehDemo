import DashboardBreadcrumb from "@/components/Breadcrumbs";

interface MemberDetailPageProps {
  params: {
    id: string;
  };
}

export default function MemberDetailPage({ params }: MemberDetailPageProps) {
  return (
    <>
      <DashboardBreadcrumb current="جزئیات عضو" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">جزئیات عضو</h1>
        <p>شناسه عضو: {params.id}</p>
      </div>
    </>
  );
}

