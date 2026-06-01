import MenuItemForm from "@/features/dashboard/components/MenuItemForm";

export default function EditMenuItemPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          Edit Menu Item: {params.id}
        </h2>
      </div>
      <div className="rounded-md border bg-white p-6">
        <MenuItemForm />
      </div>
    </div>
  );
}
