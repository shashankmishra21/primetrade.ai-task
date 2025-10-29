'use client';

interface TaskModalProps {
  showModal: boolean;
  editingId: number | null;
  formData: {
    title: string;
    description: string;
    status: string;
  };
  setFormData: (data: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setShowModal: (show: boolean) => void;
  setEditingId: (id: number | null) => void;
}

export default function TaskModal({
  showModal,
  editingId,
  formData,
  setFormData,
  handleSubmit,
  setShowModal,
  setEditingId,
}: TaskModalProps) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-lg w-full max-w-md">
        <div className="p-5 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">
            {editingId ? 'Edit Task' : 'New Task'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-300">
              Title
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 bg-black border border-gray-800 rounded text-white focus:outline-none focus:border-blue-600 transition"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-300">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 bg-black border border-gray-800 rounded text-white focus:outline-none focus:border-blue-600 transition resize-none"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-300">
              Status
            </label>
            <select
              className="w-full px-3 py-2 bg-black border border-gray-800 rounded text-white focus:outline-none focus:border-blue-600 transition"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {editingId ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setEditingId(null);
              }}
              className="flex-1 px-4 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
