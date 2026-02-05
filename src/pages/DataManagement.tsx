import { useState } from 'react';
import { Search, Filter, Upload, Download, RefreshCw } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  email: string;
  region: string;
  certification: string;
  status: 'Active' | 'Inactive';
  joinDate: string;
}

export default function DataManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCertification, setSelectedCertification] = useState('all');

  const members: Member[] = [
    {
      id: 'PII-001',
      name: 'Budi Santoso',
      email: 'budi.santoso@email.com',
      region: 'Jakarta',
      certification: 'IPM (Madya)',
      status: 'Active',
      joinDate: '2020-01-15',
    },
    {
      id: 'PII-002',
      name: 'Siti Nurhaliza',
      email: 'siti.n@email.com',
      region: 'Jawa Barat',
      certification: 'IPU (Utama)',
      status: 'Active',
      joinDate: '2019-03-22',
    },
    {
      id: 'PII-003',
      name: 'Ahmad Dahlan',
      email: 'ahmad.d@email.com',
      region: 'Jawa Timur',
      certification: 'IPP (Pratama)',
      status: 'Active',
      joinDate: '2021-06-10',
    },
    {
      id: 'PII-004',
      name: 'Dewi Lestari',
      email: 'dewi.l@email.com',
      region: 'Sumatera',
      certification: 'IPM (Madya)',
      status: 'Inactive',
      joinDate: '2018-11-05',
    },
    {
      id: 'PII-005',
      name: 'Rudi Hartono',
      email: 'rudi.h@email.com',
      region: 'Jakarta',
      certification: 'Belum Tersertifikasi',
      status: 'Active',
      joinDate: '2023-02-14',
    },
  ];

  const regions = ['Jakarta', 'Jawa Barat', 'Jawa Timur', 'Sumatera', 'Lainnya'];
  const certifications = [
    'IPU (Utama)',
    'IPM (Madya)',
    'IPP (Pratama)',
    'Belum Tersertifikasi',
  ];

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion =
      selectedRegion === 'all' || member.region === selectedRegion;
    const matchesStatus =
      selectedStatus === 'all' || member.status === selectedStatus;
    const matchesCertification =
      selectedCertification === 'all' ||
      member.certification === selectedCertification;

    return (
      matchesSearch && matchesRegion && matchesStatus && matchesCertification
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Management</h1>
          <p className="text-gray-600 mt-1">
            Manage and analyze PII membership data
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2">
            <Download size={18} />
            Export
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center gap-2">
            <Upload size={18} />
            Upload Data
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Data Upload & Preprocessing
        </h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors cursor-pointer">
          <Upload className="mx-auto text-gray-400 mb-3" size={48} />
          <p className="text-gray-700 font-medium mb-1">
            Click to upload or drag and drop
          </p>
          <p className="text-sm text-gray-500">CSV or Excel files (Max 10MB)</p>
        </div>
        <div className="mt-4 flex items-center justify-between p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <RefreshCw className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Preprocessing Status
              </p>
              <p className="text-sm text-gray-600">
                Last update: 2024-02-05 - 12,450 records processed
              </p>
            </div>
          </div>
          <span className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full">
            Ready
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name, ID, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Filter
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white"
              >
                <option value="all">All Regions</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select
              value={selectedCertification}
              onChange={(e) => setSelectedCertification(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white"
            >
              <option value="all">All Certifications</option>
              {certifications.map((cert) => (
                <option key={cert} value={cert}>
                  {cert}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Member ID
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Region
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Certification
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Join Date
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {member.id}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {member.name}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {member.email}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {member.region}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {member.certification}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        member.status === 'Active'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {member.joinDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredMembers.length} of {members.length} members
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-orange-600 text-white rounded-lg text-sm hover:bg-orange-700">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
