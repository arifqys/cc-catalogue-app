import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cardAPI } from '../services/api';
import CardForm from '../components/CardForm';

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const fetchCards = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cardAPI.getAllCards();
      setCards(data);
    } catch (err) {
      setError('Gagal mengambil kartu kredit. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleCreateCard = async (cardData) => {
    try {
      const newCard = await cardAPI.createCard(cardData);
      setCards([newCard, ...cards]);
      setShowForm(false);
    } catch (err) {
      setError('Gagal membuat kartu kredit. Silakan coba lagi.');
    }
  };

  const handleUpdateCard = async (cardData) => {
    try {
      const updatedCard = await cardAPI.updateCard(editingCard.id, cardData);
      setCards(cards.map(card => card.id === editingCard.id ? updatedCard : card));
      setEditingCard(null);
      setShowForm(false);
    } catch (err) {
      setError('Gagal memperbarui kartu kredit. Silakan coba lagi.');
    }
  };

  const handleDeleteCard = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kartu kredit ini?')) {
      try {
        await cardAPI.deleteCard(id);
        setCards(cards.filter(card => card.id !== id));
      } catch (err) {
        setError('Gagal menghapus kartu kredit. Silakan coba lagi.');      }
    }
  };

  const handleEditCard = (card) => {
    setEditingCard(card);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCard(null);
  };

  const formatAnnualFee = (fee) => {
    if (fee === 0) return 'Gratis';
    return `Rp ${fee.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Memuat kartu kredit...</h2>
      </div>
    );
  }

  return (
    <div className="card-list">
      <button 
        className="btn btn-primary"
        onClick={() => setShowForm(true)}
      >
        + Tambah Kartu Kredit Baru
      </button>

      {error && (
        <div className="error">
          {error}
          <button 
            className="btn btn-secondary" 
            onClick={() => setError(null)}
            style={{ marginLeft: '1rem' }}
          >
            Tutup
          </button>
        </div>
      )}

      <div className="card-grid">
        {cards.map((card) => (
          <div key={card.id} className="card">
            <img 
              src={card.imageUrl} 
              alt={card.name}
              className="card-image"
            />
            <div className="card-content">
              <h3 className="card-title">{card.name}</h3>
              <p className="card-description">{card.description}</p>
              
              {card.features && card.features.length > 0 && (
                <div className="card-features">
                  <h4>Fitur</h4>
                  <div className="feature-list">
                    {card.features.map((feature, index) => (
                      <span key={index} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="card-footer">
                <div className="annual-fee">
                  {formatAnnualFee(card.annualFee)}
                  <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: '#718096' }}>
                    {' / tahun'}
                  </span>
                </div>
                <div className="card-actions">
                  <Link 
                    to={`/card/${card.id}`} 
                    className="btn btn-primary"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>

              <div className="admin-actions" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleEditCard(card)}
                  style={{ marginRight: '0.5rem' }}
                >
                  Ubah
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDeleteCard(card.id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">
                {editingCard ? 'Ubah Kartu Kredit' : 'Tambah Kartu Kredit Baru'}
              </h2>
              <button className="close-btn" onClick={handleCloseForm}>
                ×
              </button>
            </div>

            <CardForm
              card={editingCard}
              onSubmit={editingCard ? handleUpdateCard : handleCreateCard}
              onCancel={handleCloseForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CardList;
