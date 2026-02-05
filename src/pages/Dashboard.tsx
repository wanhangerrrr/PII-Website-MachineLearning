import { Users, UserCheck, Award, Database, TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: 'positive' | 'negative';
}

function StatCard({ title, value, icon, change, changeType }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          {change && (
            <p
              className={`text-sm mt-2 flex items-center gap-1 ${
                changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              <TrendingUp size={16} />
              {change}
            </p>
          )}
        </div>
        <div className="p-3 bg-orange-50 rounded-lg">{icon}</div>
      </div>
    </div>
  );
}

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}

export default function Dashboard() {
  const regionData = [
    { name: 'Jakarta', count: 2450, percentage: 35 },
    { name: 'Jawa Barat', count: 1820, percentage: 26 },
    { name: 'Jawa Timur', count: 1260, percentage: 18 },
    { name: 'Sumatera', count: 910, percentage: 13 },
    { name: 'Lainnya', count: 560, percentage: 8 },
  ];

  const certificationData = [
    { level: 'IPM (Madya)', count: 2800, color: 'bg-orange-500' },
    { level: 'IPU (Utama)', count: 1900, color: 'bg-orange-400' },
    { level: 'IPP (Pratama)', count: 1500, color: 'bg-orange-300' },
    { level: 'Belum Tersertifikasi', count: 800, color: 'bg-gray-300' },
  ];

  const membershipGrowth = [
    { month: 'Jan', count: 5200 },
    { month: 'Feb', count: 5450 },
    { month: 'Mar', count: 5680 },
    { month: 'Apr', count: 5920 },
    { month: 'May', count: 6150 },
    { month: 'Jun', count: 6420 },
    { month: 'Jul', count: 6680 },
    { month: 'Aug', count: 6890 },
    { month: 'Sep', count: 7000 },
  ];

  const maxCount = Math.max(...membershipGrowth.map((d) => d.count));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">
          Monitor and analyze PII membership and ML system performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Members"
          value="7,000"
          icon={<Users className="text-orange-600" size={24} />}
          change="+12.5% from last month"
          changeType="positive"
        />
        <StatCard
          title="Active Members"
          value="6,200"
          icon={<UserCheck className="text-orange-600" size={24} />}
          change="+8.3% from last month"
          changeType="positive"
        />
        <StatCard
          title="Certified Engineers"
          value="6,200"
          icon={<Award className="text-orange-600" size={24} />}
          change="+15.2% from last month"
          changeType="positive"
        />
        <StatCard
          title="ML Training Data"
          value="12,450"
          icon={<Database className="text-orange-600" size={24} />}
          change="Updated today"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Membership Growth (2024)">
          <div className="space-y-2">
            <div className="flex items-end justify-between h-48 gap-2">
              {membershipGrowth.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-gray-100 rounded-t-lg relative flex items-end justify-center">
                    <div
                      className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg transition-all hover:from-orange-600 hover:to-orange-500"
                      style={{
                        height: `${(data.count / maxCount) * 192}px`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="text-center text-sm text-gray-500 mt-4">
              Total growth: +1,800 members (34.6%)
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Distribution by Region">
          <div className="space-y-3">
            {regionData.map((region, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {region.name}
                  </span>
                  <span className="text-sm text-gray-600">
                    {region.count} ({region.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full transition-all"
                    style={{ width: `${region.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Distribution by Certification Level">
        <div className="space-y-4">
          {certificationData.map((cert, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {cert.level}
                  </span>
                  <span className="text-sm text-gray-600">{cert.count} members</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className={`${cert.color} h-3 rounded-full transition-all`}
                    style={{ width: `${(cert.count / 7000) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
