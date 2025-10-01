import React, { useState, useEffect } from 'react';

const CardForm = ({ card, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    description: '',
    annualFee: 0,
    applyLink: '',
    features: []
  });
  const [featureInput, setFeatureInput] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (card) {
      setFormData({
        name: card.name || '',
        imageUrl: card.imageUrl || '',
        description: card.description || '',
        annualFee: card.annualFee || 0,
        applyLink: card.applyLink || '',
        features: card.features || []
      });
    }
  }, [card]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'annualFee') {
      setFormData(prev => ({
        ...prev,
        annualFee: parseInt(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddFeature();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama kartu kredit wajib diisi';
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'URL gambar kartu kredit wajib diisi';
    } else if (!isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'Silakan masukkan URL yang valid';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi kartu kredit wajib diisi';
    }

    if (!formData.applyLink.trim()) {
      newErrors.applyLink = 'URL pengajuan kartu kredit wajib diisi';
    } else if (!isValidUrl(formData.applyLink)) {
      newErrors.applyLink = 'Silakan masukkan URL yang valid';
    }

    if (Number(formData.annualFee) < 0) {
      newErrors.annualFee = 'Biaya tahunan tidak boleh negatif';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-form">
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Nama Kartu Kredit *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`form-input ${errors.name ? 'error' : ''}`}
          placeholder="e.g., Kartu Kredit BNI Mastercard Gold"
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="imageUrl" className="form-label">
          URL Gambar Kartu Kredit *
        </label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className={`form-input ${errors.imageUrl ? 'error' : ''}`}
          placeholder="https://example.com/gambar-kartu-kredit.jpg"
        />
        {errors.imageUrl && <span className="error-text">{errors.imageUrl}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Deskripsi Kartu Kredit *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={`form-input form-textarea ${errors.description ? 'error' : ''}`}
          placeholder="Deskripsikan detail terkait kartu kredit"
          rows="4"
        />
        {errors.description && <span className="error-text">{errors.description}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="annualFee" className="form-label">
          Biaya Tahunan (Rp)
        </label>
        <input
          type="number"
          id="annualFee"
          name="annualFee"
          value={formData.annualFee}
          onChange={handleChange}
          className={`form-input ${errors.annualFee ? 'error' : ''}`}
          placeholder="Rp 0"
          min="0"
        />
        {errors.annualFee && <span className="error-text">{errors.annualFee}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="applyLink" className="form-label">
          URL Pengajuan Kartu Kredit *
        </label>
        <input
          type="url"
          id="applyLink"
          name="applyLink"
          value={formData.applyLink}
          onChange={handleChange}
          className={`form-input ${errors.applyLink ? 'error' : ''}`}
          placeholder="https://example.com/pengajuan-kartu-kredit"
        />
        {errors.applyLink && <span className="error-text">{errors.applyLink}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Fitur</label>
        <div className="feature-input-group">
          <input
            type="text"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="form-input"
            placeholder="e.g., Pengajuan online"
          />
          <button
            type="button"
            onClick={handleAddFeature}
            className="btn btn-secondary"
          >
            Tambah
          </button>
        </div>
        
        {formData.features.length > 0 && (
          <div className="feature-list">
            {formData.features.map((feature, index) => (
              <span key={index} className="feature-tag">
                {feature}
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(index)}
                  className="remove-feature-btn"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {card ? 'Ubah Kartu Kredit' : 'Tambah Kartu Kredit'}
        </button>
      </div>
    </form>
  );
};

export default CardForm;
