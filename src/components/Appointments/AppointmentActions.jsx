import React from 'react';
import { toast } from 'react-toastify';
import { updateAppointment, deleteAppointment } from '../../services/appointmentService';

function AppointmentActions({ appointment, onUpdate }) {
  const handleReschedule = async () => {
    try {
      // In a real app, you'd show a modal for selecting new date/time
      const newDateTime = new Date(Date.now() + 86400000); // Next day
      const updatedAppointment = await updateAppointment(appointment._id, {
        dateTime: newDateTime,
        status: 'Scheduled'
      });
      
      onUpdate(updatedAppointment);
      toast.success('Appointment rescheduled successfully');
    } catch (error) {
      toast.error('Failed to reschedule appointment');
    }
  };

  const handleCancel = async () => {
    try {
      const updatedAppointment = await updateAppointment(appointment._id, {
        status: 'Cancelled'
      });
      
      onUpdate(updatedAppointment);
      toast.success('Appointment cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel appointment');
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={handleReschedule}
        disabled={appointment.status === 'Cancelled'}
        className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Reschedule
      </button>
      <button
        onClick={handleCancel}
        disabled={appointment.status === 'Cancelled'}
        className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Cancel
      </button>
    </div>
  );
}

export default AppointmentActions;