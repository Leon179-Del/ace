import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaStar, FaTools, FaUserPlus, FaInfoCircle, FaCopy, FaCheck } from 'react-icons/fa';
import "../css/service.css"; 

const Service = () => {
  // Persistence logic
  const [providers, setProviders] = useState(() => {
    const saved = localStorage.getItem('ace_local_providers');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Ace Quick Fix", county: "Nairobi", phone: "254700000000", stars: 3 }
    ];
  });

  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    localStorage.setItem('ace_local_providers', JSON.stringify(providers));
  }, [providers]);

  // List of all 47 Counties in Kenya
  const counties = [
    "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo Marakwet", "Embu", "Garissa", "Homa Bay", "Isiolo", "Kajiado", 
    "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", 
    "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Marsabit", "Murang'a", "Nairobi", 
    "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya", "Taita Taveta", "Tana River", 
    "Tharaka Nithi", "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
  ];

  const handleCopy = (number, id) => {
    navigator.clipboard.writeText(number);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newEntry = {
      id: Date.now(),
      name: formData.get("name"),
      county: formData.get("county"),
      phone: formData.get("phone").replace(/\D/g, ''),
      stars: 3 
    };
    setProviders([newEntry, ...providers]);
    e.target.reset();
    alert("Successfully registered! Scroll up to see your profile.");
  };

  return (
    <div className="service-page mt-4">
      <div className="container py-5">
        
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="brand-header display-4 fw-bold">
            <FaTools className="me-3" />INSTALLATION HUB
          </h1>
          <div className="alert-disclaimer d-inline-block shadow-sm">
            <FaInfoCircle className="me-2" />
            Pricing is negotiated directly. Copy a number to start a chat.
          </div>
        </div>

        {/* SECTION 1: PROVIDERS (Now First) */}
        <h3 className="mb-4 text-dark fw-bold">Available Experts</h3>
        <div className="row g-4 mb-5">
          {providers.map((p) => (
            <div key={p.id} className="col-md-6 col-lg-4">
              <div className="card provider-card h-100 shadow-sm border-0">
                <div className="card-body p-4 text-center">
                  <div className="star-rating mb-2">
                    {[...Array(p.stars)].map((_, i) => <FaStar key={i} className="mx-1" />)}
                  </div>
                  <h5 className="fw-bold mb-1">{p.name}</h5>
                  <p className="text-muted small mb-3">
                    <FaMapMarkerAlt className="text-danger" /> {p.county} County
                  </p>
                  
                  <div className="phone-display mb-3">
                    <span className="fw-bold">{p.phone}</span>
                  </div>

                  <button 
                    onClick={() => handleCopy(p.phone, p.id)}
                    className={`btn w-100 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2 transition-all ${copiedId === p.id ? 'btn-success' : 'btn-dark'}`}
                  >
                    {copiedId === p.id ? <><FaCheck /> Copied!</> : <><FaCopy /> Copy Number</>}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-5" />

        {/* SECTION 2: REGISTER (Now Second) */}
        <div className="card registration-card shadow-lg border-0">
          <div className="card-body p-4 p-md-5">
            <h4 className="text-white mb-4 d-flex align-items-center gap-2">
              <FaUserPlus className="text-warning" /> Join as a Service Provider
            </h4>
            
            <form onSubmit={handleRegister} className="row g-4">
              <div className="col-md-4">
                <label className="form-label text-warning small fw-bold">NAME / BUSINESS</label>
                <input name="name" className="form-control premium-input" placeholder="Enter name" required />
              </div>
              <div className="col-md-3">
                <label className="form-label text-warning small fw-bold">SELECT COUNTY</label>
                <select name="county" className="form-select premium-input" required>
                  <option value="">-- All 47 Counties --</option>
                  {counties.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label text-warning small fw-bold">WHATSAPP NUMBER</label>
                <input name="phone" className="form-control premium-input" placeholder="254..." required />
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <button type="submit" className="btn btn-ace-yellow w-100 fw-bold">REGISTER</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Service;
