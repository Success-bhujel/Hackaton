import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import "./App.css"
import { MapPin, Phone, AlertTriangle, Navigation, ChevronLeft, Home, Shield, FileText, Camera, X, MoreVertical, LogIn, Lock, Bell, Search } from 'lucide-react';

const NepalDisasterApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [reportForm, setReportForm] = useState({ type: '', description: '', location: 'Kathmandu', image: null });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  const emergencyContacts = [
    { name: 'Police Control', number: '100', icon: '👮' },
    { name: 'Fire Engine', number: '101', icon: '🚒' },
    { name: 'Ambulance Service', number: '102', icon: '🚑' },
    { name: 'Traffic Police', number: '103', icon: '🚦' },
    { name: 'Tourist Police', number: '1144', icon: '🗺️' }
  ];

  const currentLocation = { lat: 27.7172, lng: 85.3240, name: 'Kathmandu' };



  const riskZones = [
    { id: 1, name: 'Kathmandu', risk: 'high', color: '#ef4444', population: 2500000, description: 'High seismic activity zone. Dense population.' },
    { id: 2, name: 'Pokhara', risk: 'moderate', color: '#f59e0b', population: 500000, description: 'Prone to floods and landslides.' },
    { id: 3, name: 'Lalitpur', risk: 'high', color: '#ef4444', population: 800000, description: 'Historic structures at risk.' },
    { id: 4, name: 'Bhaktapur', risk: 'moderate', color: '#f59e0b', population: 300000, description: 'Old infrastructure needs reinforcement.' },
    { id: 5, name: 'Biratnagar', risk: 'low', color: '#22c55e', population: 250000, description: 'Stable plains, low earthquake risk.' },
    { id: 6, name: 'Chitwan', risk: 'moderate', color: '#f59e0b', population: 600000, description: 'Wildlife corridor, flood risks.' },
    { id: 7, name: 'Illam', risk: 'low', color: '#22c55e', population: 150000, description: 'Hilly terrain, generally stable.' },
    { id: 8, name: 'Dharan', risk: 'moderate', color: '#f59e0b', population: 200000, description: 'Landslide prone areas nearby.' },
    { id: 9, name: 'Butwal', risk: 'high', color: '#ef4444', population: 180000, description: 'Near fault line, high alert.' },
    { id: 10, name: 'Janakpur', risk: 'low', color: '#22c55e', population: 170000, description: 'Flood prone but low seismic risk.' }
  ];

  const [riskFilter, setRiskFilter] = useState('all');



  const emergencyShelters = [
    { id: 1, name: 'St. Mary Government Shelter', capacity: 5000, available: 3200, distance: '2.5 km', lat: 27.7000, lng: 85.3200 },
    { id: 2, name: 'Tundikhel Emergency Center', capacity: 8000, available: 5500, distance: '3.8 km', lat: 27.7050, lng: 85.3150 },
    { id: 3, name: 'Patan Community Hall', capacity: 3000, available: 2100, distance: '4.2 km', lat: 27.6680, lng: 85.3220 }
  ];

  const satelliteAlerts = [
    { id: 1, type: 'earthquake', severity: 'high', message: 'Seismic activity detected. Magnitude 5.2 expected in 30 minutes', time: '2 min ago' },
    { id: 2, type: 'flood', severity: 'moderate', message: 'Heavy rainfall alert. Flood risk in low-lying areas', time: '15 min ago' },
    { id: 3, type: 'landslide', severity: 'high', message: 'Landslide warning for hilly regions. Evacuate immediately', time: '5 min ago' }
  ];

  const initiateEmergencyCall = () => {
    setIsEmergencyModalOpen(true);
  };

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  const submitHazardReport = () => {
    if (!reportForm.type || !reportForm.description) {
      alert('⚠️ Please fill in all fields');
      return;
    }
    alert('✅ Hazard Report Submitted!\nAuthorities have been notified.');
    setReportForm({ type: '', description: '', location: 'Kathmandu', image: null });
    setCurrentScreen('home');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReportForm({ ...reportForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setReportForm({ ...reportForm, image: null });
  };

  return (
    <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl overflow-hidden">



        {/* HOME SCREEN */}
        {currentScreen === 'home' && (<>
          <div className="h-full bg-gradient-to-b from-blue-600 to-blue-800 overflow-y-auto pb-24">

            {/* Header */}
            <div className="px-6 py-8 text-white relative flex justify-between items-center">
              <div className="relative z-20">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition backdrop-blur-sm"
                >
                  <Bell size={24} className="text-white" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-blue-600"></span>
                </button>

                {isNotificationsOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
                      <h3 className="text-gray-800 font-bold text-sm">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {satelliteAlerts.map(alert => (
                        <div key={alert.id} className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50">
                          <div className="flex items-start gap-2">
                            <AlertTriangle size={14} className={alert.severity === 'high' ? 'text-red-500' : 'text-yellow-500'} />
                            <div>
                              <p className="text-xs font-bold text-gray-800">{alert.type.toUpperCase()}</p>
                              <p className="text-xs text-gray-500 line-clamp-2">{alert.message}</p>
                              <span className="text-[10px] text-gray-400 mt-1 block">{alert.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-red-500 to-blue-300 bg-clip-text text-transparent drop-shadow-sm">DRISTI</h1>
              </div>

              {/* Three Dot Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition backdrop-blur-sm"
                >
                  <MoreVertical size={24} className="text-white" />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl overflow-hidden py-1 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setCurrentScreen('login');
                      }}
                      className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition text-gray-700"
                    >
                      <LogIn size={18} className="text-blue-600" />
                      <span className="font-medium">Login</span>
                    </button>
                    <button
                      className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition text-gray-700 border-t border-gray-100"
                    >
                      <Shield size={18} className="text-blue-600" />
                      <span className="font-medium">Admin Panel</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 mb-6">
              <button
                onClick={initiateEmergencyCall}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-2xl font-bold text-xl shadow-lg flex items-center justify-center gap-3 transition"
              >
                <Phone size={28} />
                EMERGENCY CONTACT
              </button>
            </div>

            {/* Satellite Alerts */}
            <div className="px-6 mb-6">
              <h2 className="text-white font-bold mb-3 flex items-center gap-2">
                <AlertTriangle size={20} />
                Active Alerts
              </h2>
              <div className="space-y-3">
                {satelliteAlerts.map(alert => (
                  <div key={alert.id} className="bg-white rounded-xl p-4 shadow">
                    <div className="flex items-start justify-between mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${alert.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">{alert.time}</span>
                    </div>
                    <p className="text-gray-800 font-medium text-sm">{alert.message}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Zones */}
            <div className="px-6 mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-white font-bold flex items-center gap-2">
                  <Shield size={20} />
                  Risk Zones
                </h2>
                <button
                  onClick={() => setCurrentScreen('riskZones')}
                  className="text-blue-200 text-xs font-bold hover:text-white transition"
                >
                  View All &rarr;
                </button>
              </div>
              <div className="space-y-2">
                {riskZones.slice(0, 4).map(zone => (
                  <button
                    key={zone.id}
                    onClick={() => setCurrentScreen('riskZones')}
                    className="w-full bg-white rounded-xl p-4 flex items-center justify-between shadow hover:bg-gray-50 transition"
                  >
                    <div className="text-left">
                      <h3 className="font-bold text-gray-800">{zone.name}</h3>
                      <p className="text-xs text-gray-500">{(zone.population / 1000000).toFixed(1)}M population</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-xs font-bold ${zone.risk === 'high' ? 'bg-red-100 text-red-700' :
                      zone.risk === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                      {zone.risk.toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-6 pb-6">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setCurrentScreen('shelters')}
                  className="bg-white text-blue-700 py-4 rounded-xl font-bold shadow hover:shadow-lg transition"
                >
                  Find Shelter
                </button>
                <button
                  onClick={() => setCurrentScreen('report')}
                  className="bg-white text-blue-700 py-4 rounded-xl font-bold shadow hover:shadow-lg transition"
                >
                  Report Hazard
                </button>
              </div>
            </div>
          </div>
        </>)}

        {/* LOGIN SCREEN */}
        {currentScreen === 'login' && (
          <div className="h-full bg-white overflow-y-auto pb-24 flex flex-col">
            <div className="p-6">
              <button onClick={() => setCurrentScreen('home')} className="mb-6 text-gray-500 hover:text-gray-800 p-2 -ml-2 rounded-full hover:bg-gray-100 w-fit transition">
                <ChevronLeft size={32} />
              </button>

              <div className="mb-10">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                  <Lock size={32} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-500">Sign in to access emergency coordination features.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="officer@nepal.gov.np"
                    className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  />
                </div>

                <button
                  onClick={() => {
                    alert('Successfully Logged In');
                    setCurrentScreen('home');
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition text-lg mt-4"
                >
                  Sign In
                </button>

                <p className="text-center text-gray-500 text-sm mt-4">
                  Protected by Nepal Government IT Infrastructure
                </p>
              </div>
            </div>
          </div>
        )}

        {/* RISK ZONES FULL SCREEN */}
        {currentScreen === 'riskZones' && (
          <div className="h-full bg-gray-50 overflow-y-auto pb-24">
            <div className="bg-blue-600 px-6 py-4 flex items-center gap-4 shadow sticky top-0 z-20">
              <button onClick={() => setCurrentScreen('home')} className="text-white">
                <ChevronLeft size={28} />
              </button>
              <h2 className="text-white font-bold text-xl">Risk Assessment</h2>
            </div>

            {/* Filter Tabs */}
            <div className="bg-white p-4 shadow-sm sticky top-[72px] z-10 overflow-x-auto no-scrollbar">
              <div className="flex gap-2">
                {['all', 'high', 'moderate', 'low'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setRiskFilter(filter)}
                    className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${riskFilter === filter
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {filter === 'all' ? 'All Zones' :
                      filter === 'high' ? 'High Risk' :
                        filter === 'moderate' ? 'Moderate Risk' : 'Safe Zones'}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 space-y-4">
              {riskZones
                .filter(zone => riskFilter === 'all' || zone.risk === riskFilter)
                .map(zone => (
                  <div key={zone.id} className="bg-white rounded-xl p-5 shadow border-l-4 border-l-transparent transition hover:shadow-md"
                    style={{ borderLeftColor: zone.risk === 'high' ? '#ef4444' : zone.risk === 'moderate' ? '#f59e0b' : '#22c55e' }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{zone.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${zone.risk === 'high' ? 'bg-red-100 text-red-700' :
                        zone.risk === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                        {zone.risk}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{zone.description || 'Seismic and flood risk analysis pending.'}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-1">
                        <Shield size={16} />
                        <span>{zone.risk === 'high' ? 'Major Fault Line' : zone.risk === 'moderate' ? 'Flood Plains' : 'Stable Region'}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* SHELTERS SCREEN */}
        {currentScreen === 'shelters' && (
          <div className="h-full bg-gray-50 overflow-y-auto pb-24">
            <div className="bg-blue-600 px-6 py-4 flex items-center gap-4 shadow">
              <button onClick={() => setCurrentScreen('home')} className="text-white">
                <ChevronLeft size={28} />
              </button>
              <h2 className="text-white font-bold text-xl">Emergency Shelters</h2>
            </div>

            <div className="w-full h-64 bg-gray-200 relative">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-11/12 max-w-sm">
                <div className="bg-white rounded-xl shadow-lg flex items-center px-4 py-3">
                  <Search size={20} className="text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Search shelters..."
                    className="bg-transparent border-none focus:outline-none text-base w-full text-gray-700 font-medium"
                  />
                </div>
              </div>
              <MapComponent
                center={currentLocation}
                markers={emergencyShelters.map(s => ({
                  position: { lat: s.lat, lng: s.lng },
                  title: s.name
                }))}
              />
            </div>

            <div className="p-6 space-y-4">
              {emergencyShelters.map(shelter => (
                <div key={shelter.id} className="bg-white rounded-xl p-5 shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 mb-1">{shelter.name}</h3>
                      <p className="text-sm text-gray-500">{shelter.distance} away</p>
                    </div>
                    <MapPin className="text-blue-600" size={24} />
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Available Space</span>
                      <span className="font-bold text-gray-800">{shelter.available}/{shelter.capacity}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(shelter.available / shelter.capacity) * 100}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const url = `https://www.google.com/maps/dir/?api=1&destination=${shelter.lat},${shelter.lng}`;
                      window.open(url, '_blank');
                    }}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
                  >
                    <Navigation size={18} />
                    Navigate Here
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REPORT HAZARD SCREEN */}
        {currentScreen === 'report' && (
          <div className="h-full bg-gray-50 overflow-y-auto pb-24">
            <div className="bg-blue-600 px-6 py-4 flex items-center gap-4 shadow">
              <button onClick={() => setCurrentScreen('home')} className="text-white">
                <ChevronLeft size={28} />
              </button>
              <h2 className="text-white font-bold text-xl">Report Hazard</h2>
            </div>

            <div className="p-6">
              <div className="bg-white rounded-xl p-6 shadow">
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Hazard Type</label>
                  <select
                    value={reportForm.type}
                    onChange={(e) => setReportForm({ ...reportForm, type: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select type...</option>
                    <option value="earthquake">Earthquake</option>
                    <option value="flood">Flood</option>
                    <option value="landslide">Landslide</option>
                    <option value="fire">Fire</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Description</label>
                  <textarea
                    value={reportForm.description}
                    onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                    placeholder="Describe what you're seeing..."
                    rows="5"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Location</label>
                  <select
                    value={reportForm.location}
                    onChange={(e) => setReportForm({ ...reportForm, location: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {riskZones.map(zone => (
                      <option key={zone.id} value={zone.name}>{zone.name}</option>
                    ))}
                    <option value="Other">Other Location</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Attach Image</label>
                  {!reportForm.image ? (
                    <label className="w-full border-2 border-dashed border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
                      <Camera className="text-gray-400 mb-2" size={32} />
                      <span className="text-gray-500 text-sm">Tap to take photo or upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  ) : (
                    <div className="relative">
                      <img
                        src={reportForm.image}
                        alt="Report preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={submitHazardReport}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-around">
          <button
            onClick={() => setCurrentScreen('home')}
            className={`flex flex-col items-center gap-1 ${currentScreen === 'home' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <Home size={24} />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button
            onClick={() => setCurrentScreen('shelters')}
            className={`flex flex-col items-center gap-1 ${currentScreen === 'shelters' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <Shield size={24} />
            <span className="text-xs font-medium">Shelters</span>
          </button>
          <button
            onClick={() => setCurrentScreen('report')}
            className={`flex flex-col items-center gap-1 ${currentScreen === 'report' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <FileText size={24} />
            <span className="text-xs font-medium">Report</span>
          </button>
        </div>

        {/* Emergency Modal */}
        {isEmergencyModalOpen && (
          <div className="absolute inset-0 bg-black bg-opacity-80 z-50 flex items-end sm:items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
              <div className="bg-red-600 p-4 flex justify-between items-center">
                <h2 className="text-white font-bold text-xl flex items-center gap-2">
                  <Phone size={24} /> Emergency Contacts
                </h2>
                <button onClick={() => setIsEmergencyModalOpen(false)} className="text-white hover:bg-red-700 rounded-full p-1 transition">
                  <X size={24} />
                </button>
              </div>
              <div className="p-4 space-y-3">
                {emergencyContacts.map((contact) => (
                  <button
                    key={contact.number}
                    onClick={() => handleCall(contact.number)}
                    className="w-full flex items-center justify-between bg-gray-50 hover:bg-red-50 p-4 rounded-xl border border-gray-100 transition group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{contact.icon}</span>
                      <div className="text-left">
                        <div className="font-bold text-gray-800 group-hover:text-red-700">{contact.name}</div>
                        <div className="text-sm text-gray-500">Tap to call</div>
                      </div>
                    </div>
                    <span className="text-xl font-black text-gray-300 group-hover:text-red-600">{contact.number}</span>
                  </button>
                ))}
              </div>
              <div className="bg-gray-100 p-3 text-center text-xs text-gray-500">
                Help is just a tap away
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default NepalDisasterApp;