import { useState } from 'react';
import { TrendingUp, Target, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Analysis() {
  const [formData, setFormData] = useState({
    region: '',
    yearsOfMembership: '',
    currentCertification: '',
    activityScore: '',
    trainingAttendance: '',
  });

  const [prediction, setPrediction] = useState<{
    status: string;
    certification: string;
    confidence: number;
    factors: { label: string; impact: number }[];
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPrediction({
      status: 'Active',
      certification: 'IPM (Madya)',
      confidence: 87.5,
      factors: [
        { label: 'Years of Membership', impact: 92 },
        { label: 'Training Attendance', impact: 85 },
        { label: 'Activity Score', impact: 78 },
        { label: 'Regional Engagement', impact: 71 },
      ],
    });
  };

  const handleReset = () => {
    setFormData({
      region: '',
      yearsOfMembership: '',
      currentCertification: '',
      activityScore: '',
      trainingAttendance: '',
    });
    setPrediction(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Prediction & Analysis
        </h1>
        <p className="text-gray-600 mt-1">
          Use ML models to predict membership status and certification likelihood
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-orange-50 rounded-lg">
              <Target className="text-orange-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Input Parameters
              </h2>
              <p className="text-sm text-gray-600">
                Enter member details for prediction
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Region
              </label>
              <select
                value={formData.region}
                onChange={(e) =>
                  setFormData({ ...formData, region: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Select region</option>
                <option value="jakarta">Jakarta</option>
                <option value="jawa-barat">Jawa Barat</option>
                <option value="jawa-timur">Jawa Timur</option>
                <option value="sumatera">Sumatera</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years of Membership
              </label>
              <input
                type="number"
                value={formData.yearsOfMembership}
                onChange={(e) =>
                  setFormData({ ...formData, yearsOfMembership: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g. 5"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Certification
              </label>
              <select
                value={formData.currentCertification}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    currentCertification: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Select certification</option>
                <option value="none">Belum Tersertifikasi</option>
                <option value="ipp">IPP (Pratama)</option>
                <option value="ipm">IPM (Madya)</option>
                <option value="ipu">IPU (Utama)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activity Score (0-100)
              </label>
              <input
                type="number"
                value={formData.activityScore}
                onChange={(e) =>
                  setFormData({ ...formData, activityScore: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g. 85"
                min="0"
                max="100"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Training Attendance (%)
              </label>
              <input
                type="number"
                value={formData.trainingAttendance}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    trainingAttendance: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g. 75"
                min="0"
                max="100"
                required
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                Generate Prediction
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          {prediction ? (
            <>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <TrendingUp className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Prediction Results
                    </h2>
                    <p className="text-sm text-gray-600">
                      Model: Membership Status Classifier
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="text-green-600" size={20} />
                      <p className="text-sm font-medium text-gray-700">
                        Predicted Status
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {prediction.status}
                    </p>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="text-orange-600" size={20} />
                      <p className="text-sm font-medium text-gray-700">
                        Next Certification Level
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {prediction.certification}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      Confidence Score
                    </p>
                    <div className="relative">
                      <div className="w-full bg-gray-100 rounded-full h-4">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-orange-400 h-4 rounded-full transition-all flex items-center justify-end pr-2"
                          style={{ width: `${prediction.confidence}%` }}
                        >
                          <span className="text-xs font-bold text-white">
                            {prediction.confidence}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      High confidence prediction
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Contributing Factors
                </h3>
                <div className="space-y-4">
                  {prediction.factors.map((factor, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {factor.label}
                        </span>
                        <span className="text-sm text-gray-600">
                          {factor.impact}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full transition-all"
                          style={{ width: `${factor.impact}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full flex items-center justify-center">
              <div className="text-center">
                <div className="p-4 bg-gray-100 rounded-full inline-flex mb-4">
                  <Target className="text-gray-400" size={48} />
                </div>
                <p className="text-gray-600">
                  Fill in the form and generate prediction to see results
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
