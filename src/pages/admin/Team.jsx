import React, { useState, useEffect } from 'react';
import { getTeams, updateteamById, cerateTeam } from '../../api/teamApi';
import { storage } from '../../utils/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import theme from '../../theme/Theme';

const TeamManager = () => {
  const [teams, setTeams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch all teams on component mount
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getTeams();
      // Accept {data:[...]} or array directly
      const teamsData = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : [];
      setTeams(teamsData);
    } catch (err) {
      setError('Failed to fetch team members');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file) => {
    try {
      setUploadProgress(0);
      const fileExtension = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExtension}`;
      const storageRef = ref(storage, `team-images/${fileName}`);
      // Simple upload (no progress events with uploadBytes)
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setUploadProgress(100);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  };

  const deleteImage = async (imageUrl) => {
    try {
      // Robustly extract the storage path from a Firebase download URL
      // URL looks like: .../o/team-images%2Ffile.png?alt=media&token=...
      const pathEncoded = imageUrl.split('/o/')[1]?.split('?')[0];
      if (!pathEncoded) return;
      const fullPath = decodeURIComponent(pathEncoded); // e.g. 'team-images/file.png'
      const imageRef = ref(storage, fullPath);
      await deleteObject(imageRef);
    } catch (error) {
      console.error('Error deleting image:', error);
      // non-fatal
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      let imageUrl = editingTeam ? editingTeam.image : '';

      // Upload new image if provided
      if (formData.image) {
        // Delete old image if editing and there was a previous one
        if (editingTeam?.image) {
          await deleteImage(editingTeam.image);
        }
        imageUrl = await uploadImage(formData.image);
      }

      const payload = {
        name: formData.name.trim(),
        role: formData.role.trim(),
        description: formData.description.trim(),
        image: imageUrl,
      };

      if (editingTeam) {
        await updateteamById(editingTeam._id, payload);
        setSuccess('Team member updated successfully!');
      } else {
        await cerateTeam(payload);
        setSuccess('Team member created successfully!');
      }

      setIsModalOpen(false);
      resetForm();
      fetchTeams();
    } catch (err) {
      setError(editingTeam ? 'Failed to update team member' : 'Failed to create team member');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (team) => {
    setEditingTeam(team);
    setFormData({
      name: team.name || '',
      role: team.role || '',
      description: team.description || '',
      image: null,
    });
    setImagePreview(team.image || null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id, imageUrl) => {
    // Replace with a custom modal if you prefer
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        // Delete image from Firebase (non-fatal if it fails)
        if (imageUrl) {
          await deleteImage(imageUrl);
        }
        // Delete from backend
        // await deleteTeam(id);
        setSuccess('Team member deleted successfully!');
        fetchTeams();
      } catch (err) {
        setError('Failed to delete team member');
        console.error(err);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      description: '',
      image: null,
    });
    setImagePreview(null);
    setEditingTeam(null);
    setUploadProgress(0);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // Clear success message after 3 seconds
  useEffect(() => {
    if (success) {
      const t = setTimeout(() => setSuccess(''), 3000);
      return () => clearTimeout(t);
    }
  }, [success]);

  return (
    <div
      style={{
        // padding: '2rem',
        // backgroundColor: theme.colors.background,
        minHeight: '100vh',
        color: theme.colors.foreground,
        fontFamily: theme.fonts.body,
      }}
    >
      <div
        style={{
        //   maxWidth: '1200px',
        //   margin: '0 auto',
        //   backgroundColor: theme.colors.card,
          borderRadius: theme.radii.lg,
          padding: '2rem',
          boxShadow: theme.shadows.card,
        }}
      >
        {/* Header with Create Button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            borderBottom: `1px solid ${theme.colors.border}`,
            paddingBottom: '1rem',
          }}
        >
          <h1
            style={{
              fontFamily: theme.fonts.heading,
              margin: 0,
              color: theme.colors.primary,
            }}
          >
            Team Management
          </h1>
          <button
            onClick={() => {
              setEditingTeam(null);
              setImagePreview(null);
              setFormData({ name: '', role: '', description: '', image: null });
              setIsModalOpen(true);
            }}
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.primaryForeground,
              border: 'none',
              borderRadius: theme.radii.md,
              padding: '0.75rem 1.5rem',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: theme.transitions.smooth,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = theme.colors.primaryLight)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = theme.colors.primary)}
          >
            <span>+</span> Add Team Member
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div
            style={{
              backgroundColor: theme.colors.success,
              color: theme.colors.primaryForeground,
              padding: '1rem',
              borderRadius: theme.radii.sm,
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>✓</span> {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div
            style={{
              backgroundColor: theme.colors.destructive,
              color: theme.colors.destructiveForeground,
              padding: '1rem',
              borderRadius: theme.radii.sm,
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>⚠</span> {error}
          </div>
        )}

        {/* Loading State */}
        {loading && !isModalOpen && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Loading team members...</p>
          </div>
        )}

        {/* Team List */}
        {!loading && teams.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>No team members found. Add your first one!</p>
          </div>
        )}

        {!loading && teams.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {teams.map((team) => (
              <div
                key={team._id}
                style={{
                  backgroundColor: theme.colors.muted,
                  borderRadius: theme.radii.md,
                  padding: '1.5rem',
                  border: `1px solid ${theme.colors.border}`,
                  transition: theme.transitions.smooth,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {team.image && (
                  <div
                    style={{
                      width: '100%',
                      height: '200px',
                      borderRadius: theme.radii.sm,
                      overflow: 'hidden',
                      marginBottom: '1rem',
                    }}
                  >
                    <img
                      src={team.image}
                      alt={team.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                )}

                <h3
                  style={{
                    marginTop: 0,
                    marginBottom: '0.5rem',
                    color: theme.colors.primaryDark,
                    fontSize: '1.25rem',
                  }}
                >
                  {team.name}
                </h3>

                {team.role && (
                  <p
                    style={{
                      margin: '0 0 0.5rem 0',
                      color: theme.colors.primary,
                      fontWeight: '600',
                    }}
                  >
                    {team.role}
                  </p>
                )}

                {team.description && (
                  <p
                    style={{
                      marginBottom: '1.5rem',
                      color: theme.colors.mutedForeground,
                      lineHeight: '1.6',
                      flexGrow: 1,
                    }}
                  >
                    {team.description}
                  </p>
                )}

                <div
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    justifyContent: 'flex-end',
                    borderTop: `1px solid ${theme.colors.border}`,
                    paddingTop: '1rem',
                    marginTop: 'auto',
                  }}
                >
                  <button
                    onClick={() => handleEdit(team)}
                    style={{
                      backgroundColor: theme.colors.accent,
                      color: theme.colors.accentForeground,
                      border: 'none',
                      borderRadius: theme.radii.sm,
                      padding: '0.5rem 1.25rem',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      transition: theme.transitions.smooth,
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = theme.colors.accentLight)}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = theme.colors.accent)}
                  >
                    Edit
                  </button>
                  {/* <button
                    onClick={() => handleDelete(team._id, team.image)}
                    style={{
                      backgroundColor: theme.colors.destructive,
                      color: theme.colors.destructiveForeground,
                      border: 'none',
                      borderRadius: theme.radii.sm,
                      padding: '0.5rem 1.25rem',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      transition: theme.transitions.smooth,
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    Delete
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create/Edit Modal */}
        {isModalOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: theme.colors.card,
                borderRadius: theme.radii.lg,
                padding: '2rem',
                width: '90%',
                // maxWidth: '600px',
                maxHeight: '90vh',
                overflow: 'auto',
                boxShadow: theme.shadows.lg,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontFamily: theme.fonts.heading,
                    color: theme.colors.primary,
                  }}
                >
                  {editingTeam ? 'Edit Team Member' : 'Add New Team Member'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: theme.colors.mutedForeground,
                  }}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      color: theme.colors.foreground,
                    }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `1px solid ${theme.colors.border}`,
                      borderRadius: theme.radii.sm,
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                      backgroundColor: theme.colors.input,
                      transition: theme.transitions.smooth,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = theme.colors.primary)}
                    onBlur={(e) => (e.target.style.borderColor = theme.colors.border)}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      color: theme.colors.foreground,
                    }}
                  >
                    Role *
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `1px solid ${theme.colors.border}`,
                      borderRadius: theme.radii.sm,
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                      backgroundColor: theme.colors.input,
                      transition: theme.transitions.smooth,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = theme.colors.primary)}
                    onBlur={(e) => (e.target.style.borderColor = theme.colors.border)}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      color: theme.colors.foreground,
                    }}
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `1px solid ${theme.colors.border}`,
                      borderRadius: theme.radii.sm,
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                      resize: 'vertical',
                      backgroundColor: theme.colors.input,
                      transition: theme.transitions.smooth,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = theme.colors.primary)}
                    onBlur={(e) => (e.target.style.borderColor = theme.colors.border)}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      color: theme.colors.foreground,
                    }}
                  >
                    Image {!editingTeam && '*'}
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    required={!editingTeam}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: `1px solid ${theme.colors.border}`,
                      borderRadius: theme.radii.sm,
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                      backgroundColor: theme.colors.input,
                    }}
                  />
                  {imagePreview && (
                    <div
                      style={{
                        marginTop: '0.75rem',
                        width: '100%',
                        height: 200,
                        borderRadius: theme.radii.sm,
                        overflow: 'hidden',
                        border: `1px solid ${theme.colors.border}`,
                        background: theme.colors.muted,
                      }}
                    >
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div
                      style={{
                        marginTop: '0.5rem',
                        width: '100%',
                        height: 6,
                        background: theme.colors.muted,
                        borderRadius: theme.radii.full,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${uploadProgress}%`,
                          height: '100%',
                          background: theme.colors.accent,
                          transition: 'width 0.2s ease',
                        }}
                      />
                    </div>
                  )}
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
                      fontFamily: 'inherit',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      backgroundColor: theme.colors.primary,
                      color: theme.colors.primaryForeground,
                      border: 'none',
                      borderRadius: theme.radii.sm,
                      padding: '0.75rem 1.5rem',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      opacity: loading ? 0.8 : 1,
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = theme.colors.primaryLight)}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = theme.colors.primary)}
                  >
                    {editingTeam ? (loading ? 'Updating…' : 'Update') : loading ? 'Creating…' : 'Create'}
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

export default TeamManager;
