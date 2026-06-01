"use client";

export default function MenuItemForm() {
  return (
    <form className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Name</label>
        <input
          type="text"
          className="w-full rounded-md border p-2"
          placeholder="Menu Item Name"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Price</label>
        <input
          type="number"
          className="w-full rounded-md border p-2"
          placeholder="0"
        />
      </div>
      <button
        type="button"
        className="rounded-md bg-stone-900 px-4 py-2 text-white hover:bg-stone-800"
      >
        Save Menu Item
      </button>
    </form>
  );
}
