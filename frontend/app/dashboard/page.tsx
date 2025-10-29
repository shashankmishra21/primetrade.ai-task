'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { taskAPI } from '@/lib/api';
import TaskModal from '@/app/components/TaskModal';

export default function Dashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'PENDING',
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userData || !token || userData === 'undefined') {
      router.push('/login');
      return;
    }

    try {
      setUser(JSON.parse(userData));
      fetchTasks();
    } catch (error) {
      console.error('Parse error:', error);
      router.push('/login');
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getAll();
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Fetch tasks error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await taskAPI.update(editingId, formData);
      } else {
        await taskAPI.create(formData);
      }
      setShowModal(false);
      setFormData({ title: '', description: '', status: 'PENDING' });
      setEditingId(null);
      fetchTasks();
    } catch (error) {
      alert('Error saving task');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Delete this task?')) {
      try {
        await taskAPI.delete(id);
        fetchTasks();
      } catch (error) {
        alert('Error deleting task');
      }
    }
  };

  const handleEdit = (task: any) => {
    setEditingId(task.id);
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status,
    });
    setShowModal(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-400">
          <div className="w-5 h-5 border-2 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  // Calculate stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t: any) => t.status === 'COMPLETED').length;
  const inProgressTasks = tasks.filter((t: any) => t.status === 'IN_PROGRESS').length;
  const pendingTasks = tasks.filter((t: any) => t.status === 'PENDING').length;

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* navbar */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold text-white">Task Management System</h1>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
                <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-gray-300">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition text-sm border border-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition text-center">
            <h3 className="text-3xl font-bold text-white mb-2">{totalTasks}</h3>
            <p className="text-sm text-gray-400">Total Tasks</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition text-center">
            <h3 className="text-3xl font-bold text-gray-400 mb-2">{pendingTasks}</h3>
            <p className="text-sm text-gray-400">Pending</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition text-center">
            <h3 className="text-3xl font-bold text-yellow-400 mb-2">{inProgressTasks}</h3>
            <p className="text-sm text-gray-400">In Progress</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition text-center">
            <h3 className="text-3xl font-bold text-green-400 mb-2">{completedTasks}</h3>
            <p className="text-sm text-gray-400">Completed</p>
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg">
          <div className="p-6 border-b border-gray-800 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">All Tasks</h3>
              <p className="text-sm text-gray-400">{totalTasks} tasks found</p>
            </div>
            <button
              onClick={() => {
                setShowModal(true);
                setEditingId(null);
                setFormData({ title: '', description: '', status: 'PENDING' });
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Task</span>
            </button>
          </div>

          <div className="p-6">
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-400 mb-2">No tasks yet</h3>
                <p className="text-sm text-gray-500">Create your first task to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map((task: any) => (
                  <div
                    key={task.id}
                    className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:bg-gray-800 hover:border-gray-600 transition group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${task.status === 'COMPLETED' ? 'bg-green-400' :
                        task.status === 'IN_PROGRESS' ? 'bg-yellow-400' :
                          'bg-gray-500'
                        }`}></div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white mb-1 group-hover:text-blue-400 transition">
                          {task.title}
                        </h4>
                        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                          {task.description || 'No description'}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${task.status === 'COMPLETED' ? 'bg-green-900/50 text-green-400 border border-green-800' :
                            task.status === 'IN_PROGRESS' ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-800' :
                              'bg-gray-700 text-gray-300 border border-gray-600'
                            }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${task.status === 'COMPLETED' ? 'bg-green-400' :
                              task.status === 'IN_PROGRESS' ? 'bg-yellow-400' :
                                'bg-gray-400'
                              }`}></span>
                            {task.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleEdit(task)}
                          className="p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="p-2 bg-red-900/50 text-red-400 rounded-lg hover:bg-red-900 transition"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <TaskModal
        showModal={showModal}
        editingId={editingId}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        setShowModal={setShowModal}
        setEditingId={setEditingId}
      />
    </div>
  );
}
