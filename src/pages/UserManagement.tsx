import { Shield, UserPlus, Activity, Eye } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Analyst' | 'Viewer';
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

interface ActivityLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  details: string;
}

export default function UserManagement() {
  const users: User[] = [
    {
      id: 'U001',
      name: 'Admin User',
      email: 'admin@pii.or.id',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2024-02-05 10:30',
    },
    {
      id: 'U002',
      name: 'Data Analyst',
      email: 'analyst@pii.or.id',
      role: 'Analyst',
      status: 'Active',
      lastLogin: '2024-02-05 09:15',
    },
    {
      id: 'U003',
      name: 'John Viewer',
      email: 'viewer@pii.or.id',
      role: 'Viewer',
      status: 'Active',
      lastLogin: '2024-02-04 16:45',
    },
  ];

  const activityLogs: ActivityLog[] = [
    {
      id: 'L001',
      user: 'Admin User',
      action: 'Model Training',
      timestamp: '2024-02-05 10:25',
      details: 'Started training for Membership Classifier model',
    },
    {
      id: 'L002',
      user: 'Data Analyst',
      action: 'Data Upload',
      timestamp: '2024-02-05 09:10',
      details: 'Uploaded new member data (250 records)',
    },
    {
      id: 'L003',
      user: 'Admin User',
      action: 'User Management',
      timestamp: '2024-02-04 15:30',
      details: 'Created new user account for John Viewer',
    },
    {
      id: 'L004',
      user: 'Data Analyst',
      action: 'Prediction',
      timestamp: '2024-02-04 14:20',
      details: 'Generated 15 membership status predictions',
    },
  ];

  const roleColors = {
    Admin: 'bg-red-50 text-red-600 border-red-200',
    Analyst: 'bg-blue-50 text-blue-600 border-blue-200',
    Viewer: 'bg-gray-50 text-gray-600 border-gray-200',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            User & Access Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage users, roles, and monitor system activity
          </p>
        </div>
        <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center gap-2">
          <UserPlus size={18} />
          Add New User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-red-50 rounded-lg">
              <Shield className="text-red-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-900">1</span>
          </div>
          <p className="text-sm text-gray-600">Administrators</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Activity className="text-blue-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-900">1</span>
          </div>
          <p className="text-sm text-gray-600">Data Analysts</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-gray-50 rounded-lg">
              <Eye className="text-gray-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-900">1</span>
          </div>
          <p className="text-sm text-gray-600">Viewers</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          User Accounts
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  User ID
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Role
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Last Login
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {user.id}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{user.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full border ${
                        roleColors[user.role]
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-sm font-medium rounded-full">
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {user.lastLogin}
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="text-orange-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-900">Activity Logs</h2>
        </div>
        <div className="space-y-3">
          {activityLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium text-gray-900">{log.user}</span>
                    <span className="px-2 py-1 bg-orange-50 text-orange-600 text-xs font-medium rounded">
                      {log.action}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{log.details}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                  {log.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Role Permissions
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="p-4 border-2 border-red-200 rounded-lg bg-red-50">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Shield className="text-red-600" size={20} />
              Administrator
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                Full system access
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                User management
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                Model training & deployment
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                Data upload & management
              </li>
            </ul>
          </div>

          <div className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Activity className="text-blue-600" size={20} />
              Data Analyst
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                View all data & reports
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                Data upload & preprocessing
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                Run predictions & analysis
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                Export reports
              </li>
            </ul>
          </div>

          <div className="p-4 border-2 border-gray-200 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Eye className="text-gray-600" size={20} />
              Viewer
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                View dashboards
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                View reports & analytics
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                Read-only access
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                No data modification
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
