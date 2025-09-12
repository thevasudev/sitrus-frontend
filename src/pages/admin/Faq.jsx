import React, { useState, useEffect } from 'react';
import { createFaq, getAllfaqs, getfaqById, updatefaq, deletefaq } from '../../api/faqApi';
import theme from '../../theme/Theme';

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all FAQs on component mount
  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
  try {
    setLoading(true);
    setError("");
    const resp = await getAllfaqs();
    console.log("Fetched FAQs:", resp);

    // Accept {data:[...]}, {faqs:[...]}, or an array directly
    const list = Array.isArray(resp)
      ? resp
      : Array.isArray(resp?.data)
      ? resp.data
      : Array.isArray(resp?.faqs)
      ? resp.faqs
      : [];

    setFaqs(list);
  } catch (err) {
    setError("Failed to fetch FAQs");
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (editingFaq) {
        await updatefaq(editingFaq._id, formData);
      } else {
        await createFaq(formData);
      }
      
      setIsModalOpen(false);
      setFormData({ question: '', answer: '' });
      setEditingFaq(null);
      fetchFaqs(); // Refresh the list
    } catch (err) {
      setError(editingFaq ? 'Failed to update FAQ' : 'Failed to create FAQ');
      console.error(err);
    }
  };

const handleEdit = async (id) => {
  try {
    const resp = await getfaqById(id);
    const faq = resp?.data || resp; // unwrap {data:{...}} shape
    setEditingFaq(faq);
    setFormData({
      question: faq?.question || "",
      answer: faq?.answer || "",
    });
    setIsModalOpen(true);
  } catch (err) {
    setError("Failed to fetch FAQ details");
    console.error(err);
  }
};


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      try {
        await deletefaq(id);
        fetchFaqs(); // Refresh the list
      } catch (err) {
        setError('Failed to delete FAQ');
        console.error(err);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFaq(null);
    setFormData({ question: '', answer: '' });
  };

  return (
    <div style={{ 
      padding: '2rem', 
      // backgroundColor: theme.colors.background,
      minHeight: '100vh',
      color: theme.colors.foreground,
      fontFamily: theme.fonts.body
    }}>
      <div style={{ 
        // maxWidth: '1200px', 
        margin: '0 auto',
        backgroundColor: theme.colors.card,
        borderRadius: theme.radii.lg,
        padding: '2rem',
        // boxShadow: theme.shadows.card
      }}>
        {/* Header with Create Button */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem',
          borderBottom: `1px solid ${theme.colors.border}`,
          paddingBottom: '1rem'
        }}>
          <h1 style={{ 
            fontFamily: theme.fonts.heading,
            margin: 0,
            color: theme.colors.primary
          }}>
            FAQ Management
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.primaryForeground,
              border: 'none',
              borderRadius: theme.radii.md,
              padding: '0.75rem 1.5rem',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: theme.transitions.smooth
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = theme.colors.primaryLight}
            onMouseOut={(e) => e.target.style.backgroundColor = theme.colors.primary}
          >
            Create FAQ
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: theme.colors.destructive,
            color: theme.colors.destructiveForeground,
            padding: '1rem',
            borderRadius: theme.radii.sm,
            marginBottom: '1.5rem'
          }}>
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Loading FAQs...</p>
          </div>
        )}

        {/* FAQ List */}
        {!loading && faqs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>No FAQs found. Create your first one!</p>
          </div>
        )}

        {!loading && faqs.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map(faq => (
              <div key={faq._id} style={{
                backgroundColor: theme.colors.muted,
                borderRadius: theme.radii.md,
                padding: '1.5rem',
                border: `1px solid ${theme.colors.border}`
              }}>
                <h3 style={{ 
                  marginTop: 0, 
                  marginBottom: '0.5rem',
                  color: theme.colors.primaryDark
                }}>
                  {faq.question}
                </h3>
                <p style={{ 
                  marginBottom: '1.5rem',
                  color: theme.colors.mutedForeground
                }}>
                  {faq.answer}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleEdit(faq._id)}
                    style={{
                      backgroundColor: theme.colors.accent,
                      color: theme.colors.accentForeground,
                      border: 'none',
                      borderRadius: theme.radii.sm,
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      fontFamily: 'inherit'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(faq._id)}
                    style={{
                      backgroundColor: theme.colors.destructive,
                      color: theme.colors.destructiveForeground,
                      border: 'none',
                      borderRadius: theme.radii.sm,
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      fontFamily: 'inherit'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create/Edit Modal */}
        {isModalOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: theme.colors.card,
              borderRadius: theme.radii.lg,
              padding: '2rem',
              width: '90%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflow: 'auto'
            }}>
              <h2 style={{
                marginTop: 0,
                fontFamily: theme.fonts.heading,
                color: theme.colors.primary
              }}>
                {editingFaq ? 'Edit FAQ' : 'Create New FAQ'}
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600'
                  }}>
                    Question
                  </label>
                  <input
                    type="text"
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `1px solid ${theme.colors.border}`,
                      borderRadius: theme.radii.sm,
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600'
                  }}>
                    Answer
                  </label>
                  <textarea
                    name="answer"
                    value={formData.answer}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `1px solid ${theme.colors.border}`,
                      borderRadius: theme.radii.sm,
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                      resize: 'vertical'
                    }}
                  />
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    style={{
                      backgroundColor: theme.colors.muted,
                      color: theme.colors.mutedForeground,
                      border: 'none',
                      borderRadius: theme.radii.sm,
                      padding: '0.75rem 1.5rem',
                      cursor: 'pointer',
                      fontFamily: 'inherit'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: theme.colors.primary,
                      color: theme.colors.primaryForeground,
                      border: 'none',
                      borderRadius: theme.radii.sm,
                      padding: '0.75rem 1.5rem',
                      cursor: 'pointer',
                      fontFamily: 'inherit'
                    }}
                  >
                    {editingFaq ? 'Update FAQ' : 'Create FAQ'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Faq;