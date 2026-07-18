import { useState } from 'react'

import Header from '../../GlobalHelpers/Header'
import NextPatientCard from '../../Components/Reception/NextPatientCard';
import ReceptionGridTable from '../../Components/Reception/ReceptionGridTable';
import AvailableClinicModal from '../../Components/Reception/AvailableClinicModal';
import FullyBookedClinicModal from '../../Components/Reception/FullyBookedClinicModal';
import PatientCard, { type PatientCardVariant } from '../../Components/Reception/PatientCard'

import '../../styles/Reception.css'
import { AppointmentModal } from '../../Components/Reception/AppointmentGridTable';

export default function Reception() {

  // State to track which card is currently active/selected
  const [timePeriod, setTimePeriod] = useState<string>('this-week');
  const [activeCard, setActiveCard] = useState<PatientCardVariant>('waiting');
  const [showClinicModal, setShowClinicModal] = useState<boolean>(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState<boolean>(false);
  const [showFullyBookedClinicModal, setShowFullyBookedClinicModal] = useState<boolean>(false);

  return (
    <div className="container-fluid p-3">

      {/* Header */}
      <Header heading="Reception" />

      {/* Patient Cards */}
      <div
        className="d-flex flex-nowrap align-items-center justify-content-start gap-3 my-3 pb-2 overflow-x-auto w-100"
      // style={{ minWidth: '1112px' }}
      >

        <PatientCard
          variant="booked"
          title="Fully Booked Clinics"
          countText="3 Clinics"
          buttonText="View"
          imageSrc="/Assets/Images/FullyBooked.png" // Update this path to match your project
          isActive={activeCard === 'booked'}
          onClick={() => setActiveCard('booked')}
          onButtonClick={() => {
            setShowFullyBookedClinicModal(true);
          }}
        />

        <FullyBookedClinicModal show={showFullyBookedClinicModal} handleClose={() => setShowFullyBookedClinicModal(false)} />
          
        <PatientCard
          variant="available"
          title="Clinic Available"
          countText="5 clinics"
          buttonText="Create Appointment"
          imageSrc="/Assets/Images/ClinicAvailable.png" // Update this path to match your project
          isActive={activeCard === 'available'}
          onClick={() => setActiveCard('available')}
          onButtonClick={() => {
            setShowAppointmentModal(true);
          }}
        />

        <AppointmentModal show={showAppointmentModal} handleClose={() => setShowAppointmentModal(false)} />

        <PatientCard
          variant="waiting"
          title="Patients Waiting"
          countText="23 Patients"
          buttonText="Add new Patient"
          imageSrc="/Assets/Images/PatientWaiting.png" // Update this path to match your project
          isActive={activeCard === 'waiting'}
          onClick={() => setActiveCard('waiting')}
          onButtonClick={() => {
            setShowClinicModal(true);
          }}
        />

        <AvailableClinicModal show={showClinicModal} handleClose={() => setShowClinicModal(false)} />

        <NextPatientCard
          cardHeadingText="Next Patient"
          departmentText="Internal Medicine"
          doctorNameText="Dr. Samer Yousif"
          patientLabelText="Patient Name"
          patientNameValue="Ahmed Abdullah"
          appointmentTypeText="Consultation"
          checkInButtonText="Check-in Now"
          skipButtonText="Skip"
          onCheckInClick={() => console.log("Checking in user right now...")}
          onSkipClick={() => console.log("Skipping item point context...")}
          onMoreOptionsClick={() => console.log("Open options modal dropdown...")}
        />


      </div>

      <div className="d-flex justify-content-between mb-3" style={{ maxHeight: "36px" }}>
        <h3 className="reception-sub-title fs-24 fw-600 text-muted">Patients</h3>
        <div className='border-0'>
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="reception-time-select border-0 h-100"
          >
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
          </select>
        </div>
      </div>

      <ReceptionGridTable />
    </div>
  )
}
