import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { cardAPI } from '../services/api';

const CardDetail = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCard = async (cardId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await cardAPI.getCardById(cardId);
      setCard(data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Credit card not found');
      } else {
        setError('Failed to fetch credit card details. Please try again.');
      }
      console.error('Error fetching card:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCard(id);
  }, [id]);

  const formatAnnualFee = (fee) => {
    if (fee === 0) return 'Gratis';
    return `Rp ${fee.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading credit card details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card-detail">
        <div className="error">
          {error}
          <div style={{ marginTop: '1rem' }}>
            <Link to="/" className="btn btn-primary">
              ← Kembali ke Daftar Kartu Kredit
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="card-detail">
        <div className="error">
          Kartu kredit tidak ditemukan
          <div style={{ marginTop: '1rem' }}>
            <Link to="/" className="btn btn-primary">
              ← Kembali ke Daftar Kartu Kredit
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-detail">
      <div className="breadcrumb" style={{ marginBottom: '2rem' }}>
        <Link to="/" className="btn btn-secondary">
          ← Kembali ke Daftar Kartu Kredit
        </Link>
      </div>

      <img 
        src={card.imageUrl} 
        alt={card.name}
        className="card-detail-image"
      />

      <div className="card-detail-content">
        <h1 className="card-detail-title">{card.name}</h1>
        
        <div className="card-detail-description">
          {card.description}
        </div>

        {card.features && card.features.length > 0 && (
          <div className="card-detail-features">
            <h3>Fitur</h3>
            <div className="feature-list">
              {card.features.map((feature, index) => (
                <span key={index} className="feature-tag">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="card-detail-footer">
          <div className="card-info">
            <div className="info-item">
              <span className="annual-fee">   
                {formatAnnualFee(card.annualFee)}
                <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: '#718096' }}>{' / tahun'}</span>
              </span>
            </div>
          </div>

          <div className="card-actions">
            <a 
              href={card.applyLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-success"
            >
              Ajukan Sekarang
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
