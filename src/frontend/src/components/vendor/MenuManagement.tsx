import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { MenuCategory, MenuItem } from "@/data/mockVendorData";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

const categories: MenuCategory[] = [
  "All",
  "Breakfast",
  "Snacks",
  "Meals",
  "Drinks",
  "Chinese",
];

type FormData = Omit<MenuItem, "id">;

const emptyForm: FormData = {
  name: "",
  price: 0,
  category: "Meals",
  image: "",
  available: true,
};

export default function MenuManagement({ menuItems, setMenuItems }: Props) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("All");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filtered =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((m) => m.category === activeCategory);

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  }

  function openEdit(item: MenuItem) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image,
      available: item.available,
    });
    setDialogOpen(true);
  }

  function handleSave() {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!form.price || form.price <= 0) {
      toast.error("Valid price is required");
      return;
    }
    if (editingId) {
      setMenuItems((prev) =>
        prev.map((m) => (m.id === editingId ? { ...m, ...form } : m)),
      );
      toast.success("Item updated!");
    } else {
      const newItem: MenuItem = { ...form, id: `M${Date.now()}` };
      setMenuItems((prev) => [...prev, newItem]);
      toast.success("Item added!");
    }
    setDialogOpen(false);
  }

  function handleDelete(id: string) {
    setMenuItems((prev) => prev.filter((m) => m.id !== id));
    toast.success("Item deleted");
    setDeleteConfirmId(null);
  }

  function toggleAvailable(id: string) {
    setMenuItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, available: !m.available } : m)),
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-sm text-gray-500">
            Add, edit, or remove food items from your menu.
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-orange-500 hover:bg-orange-600 text-white shrink-0"
          data-ocid="menu.add_button"
        >
          <Plus size={16} className="mr-1" /> Add Item
        </Button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2" data-ocid="menu.filter.tab">
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              activeCategory === cat
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-orange-50"
            }`}
            data-ocid={`menu.${cat.toLowerCase()}.tab`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        data-ocid="menu.list"
      >
        {filtered.map((item, i) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden"
            data-ocid={`menu.item.${i + 1}`}
          >
            <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop";
                }}
              />
            </div>
            <div className="p-3">
              <p className="font-semibold text-gray-900 text-sm truncate">
                {item.name}
              </p>
              <p className="text-orange-500 font-bold text-sm">₹{item.price}</p>
              <p className="text-xs text-gray-400 mb-2">{item.category}</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">
                  {item.available ? "Available" : "Unavailable"}
                </span>
                <Switch
                  checked={item.available}
                  onCheckedChange={() => toggleAvailable(item.id)}
                  data-ocid={`menu.switch.${i + 1}`}
                />
              </div>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => openEdit(item)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 text-xs font-medium transition-colors"
                  data-ocid={`menu.edit_button.${i + 1}`}
                >
                  <Pencil size={12} /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(item.id)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 text-xs font-medium transition-colors"
                  data-ocid={`menu.delete_button.${i + 1}`}
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div
            className="col-span-full py-12 text-center text-gray-400"
            data-ocid="menu.empty_state"
          >
            No items in this category.
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md" data-ocid="menu.dialog">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Item" : "Add New Item"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1.5">
              <Label>Item Name</Label>
              <Input
                placeholder="e.g. Veg Biryani"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                data-ocid="menu.name.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Price (₹)</Label>
              <Input
                type="number"
                min="0"
                placeholder="e.g. 80"
                value={form.price || ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    price: Number.parseInt(e.target.value) || 0,
                  }))
                }
                data-ocid="menu.price.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <select
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    category: e.target.value as MenuItem["category"],
                  }))
                }
                data-ocid="menu.category.select"
              >
                {categories
                  .filter((c) => c !== "All")
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label>Image URL</Label>
              <Input
                placeholder="https://..."
                value={form.image}
                onChange={(e) =>
                  setForm((f) => ({ ...f, image: e.target.value }))
                }
                data-ocid="menu.image.input"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              data-ocid="menu.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={handleSave}
              data-ocid="menu.save_button"
            >
              {editingId ? "Save Changes" : "Add Item"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog
        open={!!deleteConfirmId}
        onOpenChange={() => setDeleteConfirmId(null)}
      >
        <DialogContent className="max-w-sm" data-ocid="menu.delete_dialog">
          <DialogHeader>
            <DialogTitle>Delete Item?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            This action cannot be undone. The item will be permanently removed
            from your menu.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmId(null)}
              data-ocid="menu.delete_cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
              data-ocid="menu.delete_confirm_button"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
