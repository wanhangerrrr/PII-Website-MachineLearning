import { Brain, Activity, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface ModelCardProps {
  name: string;
  type: string;
  status: 'active' | 'training' | 'inactive';
  accuracy: number;
  lastTrained: string;
}

function ModelCard({ name, type, status, accuracy, lastTrained }: ModelCardProps) {
  const statusConfig = {
    active: { color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle },
    training: { color: 'text-blue-600', bg: 'bg-blue-50', icon: Clock },
    inactive: { color: 'text-gray-600', bg: 'bg-gray-50', icon: AlertCircle },
  };

  const StatusIcon = statusConfig[status].icon;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-50 rounded-lg">
            <Brain className="text-orange-600" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600">{type}</p>
          </div>
        </div>
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig[status].bg}`}
        >
          <StatusIcon size={16} className={statusConfig[status].color} />
          <span
            className={`text-sm font-medium capitalize ${statusConfig[status].color}`}
          >
            {status}
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Accuracy</span>
          <span className="text-sm font-semibold text-gray-900">
            {accuracy}%
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full"
            style={{ width: `${accuracy}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Last trained: {lastTrained}
        </p>
      </div>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: number;
  color: string;
}

function MetricCard({ label, value, color }: MetricCardProps) {
  return (
    <div className="flex-1">
      <p className="text-sm text-gray-600 mb-2">{label}</p>
      <div className="relative">
        <svg className="w-full h-32" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={`${value * 3.14} 314`}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
          <text
            x="60"
            y="65"
            textAnchor="middle"
            className="text-2xl font-bold"
            fill="#111827"
          >
            {value}%
          </text>
        </svg>
      </div>
    </div>
  );
}

export default function MachineLearning() {
  const models = [
    {
      name: 'Membership Status Classifier',
      type: 'Classification Model',
      status: 'active' as const,
      accuracy: 94.2,
      lastTrained: '2024-02-01',
    },
    {
      name: 'Certification Predictor',
      type: 'Prediction Model',
      status: 'active' as const,
      accuracy: 89.7,
      lastTrained: '2024-01-28',
    },
    {
      name: 'Member Clustering',
      type: 'Clustering Model',
      status: 'training' as const,
      accuracy: 87.3,
      lastTrained: '2024-01-15',
    },
  ];

  const performanceMetrics = {
    accuracy: 94.2,
    precision: 92.8,
    recall: 91.5,
    f1Score: 92.1,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Machine Learning Models
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor and manage ML model performance
          </p>
        </div>
        <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium">
          Train New Model
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {models.map((model, index) => (
          <ModelCard key={index} {...model} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="text-orange-600" size={24} />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Primary Model Performance Metrics
            </h2>
            <p className="text-sm text-gray-600">
              Membership Status Classifier - Last Updated: Feb 1, 2024
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <MetricCard
            label="Accuracy"
            value={performanceMetrics.accuracy}
            color="#ea580c"
          />
          <MetricCard
            label="Precision"
            value={performanceMetrics.precision}
            color="#f97316"
          />
          <MetricCard
            label="Recall"
            value={performanceMetrics.recall}
            color="#fb923c"
          />
          <MetricCard
            label="F1-Score"
            value={performanceMetrics.f1Score}
            color="#fdba74"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Training History
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Model
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Accuracy
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Dataset Size
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  date: '2024-02-01',
                  model: 'Membership Classifier',
                  accuracy: 94.2,
                  dataset: '12,450',
                  status: 'Success',
                },
                {
                  date: '2024-01-28',
                  model: 'Certification Predictor',
                  accuracy: 89.7,
                  dataset: '11,200',
                  status: 'Success',
                },
                {
                  date: '2024-01-15',
                  model: 'Member Clustering',
                  accuracy: 87.3,
                  dataset: '10,800',
                  status: 'Success',
                },
                {
                  date: '2024-01-05',
                  model: 'Membership Classifier',
                  accuracy: 92.8,
                  dataset: '10,200',
                  status: 'Success',
                },
              ].map((entry, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{entry.date}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{entry.model}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {entry.accuracy}%
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {entry.dataset} records
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-sm font-medium rounded-full">
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
