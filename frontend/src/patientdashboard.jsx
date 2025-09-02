import React, { useState } from 'react';

const CustomModal = ({ message, onClose }) => (
  <div className="custom-modal-backdrop">
    <div className="custom-modal-content">
      <p className="modal-text">{message}</p>
      <button 
        onClick={onClose} 
        className="modal-button"
      >
        OK
      </button>
    </div>
  </div>
);

const Patient = () => {
  const [view, setView] = useState('patient');
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    moodScore: '',
    riskLevel: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBookAppointment = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: Date.now(), // Unique ID for the appointment
      ...formData,
    };
    setAppointments([...appointments, newAppointment]);
    setFormData({ name: '', age: '', gender: '', moodScore: '', riskLevel: '' });
    setModalMessage("Email sent successfully!");
    setShowModal(true);
  };

  const handleManageAppointment = (id, action) => {
    const updatedAppointments = appointments.filter(appt => appt.id !== id);
    setAppointments(updatedAppointments);
  };

  return (
    <>
      <style>
        {`
          /* Base Styles */
          body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .app-container {
            background-color: #f3f4f6;
            min-height: 100vh;
            padding: 1.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .main-card {
            max-width: 60rem;
            width: 100%;
            background-color: #ffffff;
            padding: 2.5rem;
            border-radius: 1rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }

          /* Header */
          .header-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
          }

          .main-heading {
            font-size: 2.25rem;
            font-weight: 700;
            color: #1f2937;
          }

          .button-group {
            display: flex;
            gap: 0.5rem;
          }

          .panel-button {
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
            transition-duration: 200ms;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            border: none;
            cursor: pointer;
          }

          .panel-button.active {
            background-color: #2563eb;
            color: #ffffff;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }

          .panel-button:not(.active) {
            background-color: #e5e7eb;
            color: #4b5563;
          }

          .panel-button:not(.active):hover {
            background-color: #d1d5db;
          }

          /* Patient Panel */
          .patient-panel {
            padding-top: 1rem;
          }

          .panel-heading {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #374151;
          }

          .form-container {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .input-group-container {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .form-group {
            display: flex;
            flex-direction: column;
          }

          .form-label {
            font-size: 0.875rem;
            font-weight: 500;
            color: #4b5563;
            margin-bottom: 0.25rem;
          }

          .form-input {
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 0.375rem;
            outline: none;
            transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 150ms;
            width: 100%;
          }

          .form-input:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
          }

          .submit-button {
            width: 100%;
            padding: 0.75rem;
            margin-top: 1rem;
            background-color: #2563eb;
            color: #ffffff;
            font-weight: 700;
            border-radius: 0.5rem;
            border: none;
            cursor: pointer;
            transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 200ms;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }

          .submit-button:hover {
            background-color: #1d4ed8;
          }

          /* Insurer Panel */
          .insurer-panel {
            padding-top: 1rem;
          }

          .no-appointments-text {
            color: #6b7280;
            text-align: center;
            padding: 2rem 0;
          }

          .table-container {
            overflow-x: auto;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            border: 1px solid #e5e7eb;
          }

          .appointments-table {
            min-width: 100%;
            border-collapse: collapse;
          }

          .table-header {
            background-color: #f9fafb;
          }

          .table-header-cell {
            padding: 0.75rem 1.5rem;
            text-align: left;
            font-size: 0.75rem;
            font-weight: 500;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .table-body {
            background-color: #ffffff;
          }

          .table-row:hover {
            background-color: #f9fafb;
          }

          .table-cell {
            padding: 1rem 1.5rem;
            white-space: nowrap;
            font-size: 0.875rem;
            color: #1f2937;
          }

          .table-cell-actions {
            padding: 1rem 1.5rem;
            white-space: nowrap;
            font-size: 0.875rem;
            font-weight: 500;
            display: flex;
            gap: 0.5rem;
          }

          .action-button-accept {
            color: #16a34a;
            border: none;
            background: transparent;
            cursor: pointer;
            transition: color 200ms ease-in-out;
          }

          .action-button-accept:hover {
            color: #14532d;
          }

          .action-button-reject {
            color: #dc2626;
            border: none;
            background: transparent;
            cursor: pointer;
            transition: color 200ms ease-in-out;
          }

          .action-button-reject:hover {
            color: #7f1d1d;
          }

          /* Modal */
          .custom-modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .custom-modal-content {
            background-color: #ffffff;
            padding: 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            max-width: 24rem;
            width: 100%;
            margin: 0 1rem;
            text-align: center;
          }

          .modal-text {
            font-size: 1.125rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #1f2937;
          }

          .modal-button {
            padding: 0.5rem 1.5rem;
            background-color: #2563eb;
            color: #ffffff;
            border-radius: 0.375rem;
            border: none;
            cursor: pointer;
            transition: background-color 200ms ease-in-out;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          }

          .modal-button:hover {
            background-color: #1d4ed8;
          }

          /* Responsive adjustments */
          @media (max-width: 640px) {
            .header-container {
              flex-direction: column;
              align-items: flex-start;
            }
            .main-heading {
              margin-bottom: 1rem;
              font-size: 1.75rem;
            }
            .main-card {
              padding: 1.5rem;
            }
          }
        `}
      </style>
      <div className="app-container">
        <div className="main-card">
          <div className="header-container">
            <h1 className="main-heading">Appointment Management</h1>
            <div className="button-group">
              <button
                onClick={() => setView('patient')}
                className={`panel-button ${view === 'patient' ? 'active' : ''}`}
              >
                Patient Panel
              </button>
              <button
                onClick={() => setView('insurer')}
                className={`panel-button ${view === 'insurer' ? 'active' : ''}`}
              >
                Insurer Panel
              </button>
            </div>
          </div>

          {view === 'patient' && (
            <div className="patient-panel">
              <h2 className="panel-heading">Patient Detail</h2>
              <form onSubmit={handleBookAppointment} className="form-container">
                <div className="input-group-container">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <textarea
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      rows="3"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input
                      id="age"
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <input
                      id="gender"
                      type="text"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="moodScore" className="form-label">Mood Score</label>
                    <input
                      id="moodScore"
                      type="text"
                      name="moodScore"
                      value={formData.moodScore}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="riskLevel" className="form-label">Risk Level</label>
                    <input
                      id="riskLevel"
                      type="text"
                      name="riskLevel"
                      value={formData.riskLevel}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="submit-button"
                >
                  Book Appointment
                </button>
              </form>
            </div>
          )}

          {view === 'insurer' && (
            <div className="insurer-panel">
              <h2 className="panel-heading">Manage Appointments</h2>
              {appointments.length === 0 ? (
                <p className="no-appointments-text">No new appointments to manage.</p>
              ) : (
                <div className="table-container">
                  <table className="appointments-table">
                    <thead className="table-header">
                      <tr>
                        {['Name', 'Age', 'Gender', 'Mood Score', 'Risk Level', 'Actions'].map((header) => (
                          <th
                            key={header}
                            scope="col"
                            className="table-header-cell"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="table-body">
                      {appointments.map((appt) => (
                        <tr key={appt.id} className="table-row">
                          <td className="table-cell">{appt.name}</td>
                          <td className="table-cell">{appt.age}</td>
                          <td className="table-cell">{appt.gender}</td>
                          <td className="table-cell">{appt.moodScore}</td>
                          <td className="table-cell">{appt.riskLevel}</td>
                          <td className="table-cell-actions">
                            <button
                              onClick={() => handleManageAppointment(appt.id, 'accept')}
                              className="action-button-accept"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleManageAppointment(appt.id, 'reject')}
                              className="action-button-reject"
                            >
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
        {showModal && <CustomModal message={modalMessage} onClose={() => setShowModal(false)} />}
      </div>
    </>
  );
};

export default Patient;
