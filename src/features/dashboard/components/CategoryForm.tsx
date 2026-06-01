"use client";

export default function CategoryForm() {
  return (
    <form className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Category Name</label>
        <input
          type="text"
          className="w-full rounded-md border p-2"
          placeholder="e.g. Coffee"
        />
      </div>
      <button
        type="button"
        className="rounded-md bg-stone-900 px-4 py-2 text-white hover:bg-stone-800"
      >
        Save Category
      </button>
    </form>
  );
}
