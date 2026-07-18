import { useState } from 'react';
import CustomFormDropdown from '../../GlobalHelpers/CustomFormDropdown';
import type { DropdownOption } from '../../GlobalHelpers/CustomFormDropdown';
import DateFilterCalendar from '../../GlobalHelpers/DateFilterCalendar';
import TinyEditor from '../TinyEditor';
import '../../styles/InPatients.css';

export default function InPatients() {
    const [formStep, setFormStep] = useState<'basic' | 'details'>('basic');
    const [visitType, setVisitType] = useState<DropdownOption | null>(null);
    const [showDobCalendar, setShowDobCalendar] = useState(false);
    const [selectedDob, setSelectedDob] = useState<Date | null>(null);


    // Basic Details Form State
    const [formData, setFormData] = useState({
        searchPatient: '',
        visitType: '',
        phoneNumber: '',

        firstName: '',
        fatherName: '',
        grandFatherName: '',
        familyName: '',
        motherName: '',

        hospitalName: '',
        doctorName: '',
        operationName: '',
        surgeryPrice: '',

        nationalIdNumber: '',
        nationalIdFile: null as File | null,
        referralDocuments: [] as File[],

        extDoctorName: '',
        extOperationName: '',
        extSurgeryPrice: '',
        extNationalIdNumber: '',
        extNationalIdFile: null as File | null,
        extReferralDocuments: [] as File[],

        gender: null as DropdownOption | null,
        dob: '',
        age: '',
        bloodGroup: null as DropdownOption | null,
        address: '',
        notes: '',
    });

    const visitTypeOptions = [
        { id: 'Hospital Referal', name: 'Hospital Referral' },
        { id: 'External Doctor', name: 'External Doctor' },
        { id: 'Internal Doctor', name: 'Internal Doctor' }
    ];

    const genderOptions = [
        { id: 'Male', name: 'Male' },
        { id: 'Female', name: 'Female' },
        { id: 'Other', name: 'Other' }
    ];

    const bloodGroupOptions = [
        { id: 'O+', name: 'O+' },
        { id: 'O-', name: 'O-' },
        { id: 'A+', name: 'A+' },
        { id: 'A-', name: 'A-' },
        { id: 'B+', name: 'B+' },
        { id: 'B-', name: 'B-' },
        { id: 'AB+', name: 'AB+' },
        { id: 'AB-', name: 'AB-' }
    ];

    const handleBasicInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleVisitTypeChange = (option: DropdownOption | null) => {
        setVisitType(option);
        if (option) {
            setFormData(prev => ({
                ...prev,
                visitType: option.id
            }));
        }
    };

    const handleGenderChange = (option: DropdownOption | null) => {
        setFormData(prev => ({
            ...prev,
            gender: option
        }));
    };

    const handleBloodGroupChange = (option: DropdownOption | null) => {
        setFormData(prev => ({
            ...prev,
            bloodGroup: option
        }));
    };

    const handleDateChange = (date: Date) => {
        const selectedDate = new Date(date);
        const today = new Date();

        // Calculate age
        let years = today.getFullYear() - selectedDate.getFullYear();
        let months = today.getMonth() - selectedDate.getMonth();
        let days = today.getDate() - selectedDate.getDate();

        // Adjust for negative days
        if (days < 0) {
            months--;
            const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += prevMonth.getDate();
        }

        // Adjust for negative months
        if (months < 0) {
            years--;
            months += 12;
        }

        // Determine what to display
        let ageDisplay = '';
        if (years > 0) {
            ageDisplay = `${years} year${years > 1 ? 's' : ''}`;
        } else if (months > 0) {
            ageDisplay = `${months} month${months > 1 ? 's' : ''}`;
        } else {
            ageDisplay = `${days} day${days > 1 ? 's' : ''}`;
        }

        setFormData(prev => ({
            ...prev,
            dob: selectedDate.toISOString().split('T')[0],
            age: ageDisplay
        }));
    };

    const handleNationalIdSelect = (file: File) => {
        if (visitType && visitType.id === 'Hospital Referal') {
            setFormData(prev => ({
                ...prev,
                nationalIdFile: file
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                extNationalIdFile: file
            }));
        }
    };

    const handleReferralDocumentsSelect = (files: FileList) => {
        const filesArray = Array.from(files);
        if (visitType && visitType.id === 'Hospital Referal') {
            setFormData(prev => ({
                ...prev,
                referralDocuments: filesArray
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                extReferralDocuments: filesArray
            }));
        }
    };

    const handleEditorChange = (content: string) => {
        setFormData(prev => ({
            ...prev,
            notes: content
        }));
    };

    const handleNext = () => {
        // Validate basic form data before moving to next step
        if (visitType && formData.phoneNumber) {
            setFormStep('details');
        } else {
            alert('Please fill in all required fields');
        }
    };

    const handleCancel = () => {
        setFormStep('basic');
        setVisitType(null);
        // Reset form or handle as needed
    };

    const handleSubmit = () => {
        const nationalIdFile =
            visitType?.id === 'Hospital Referal'
                ? formData.nationalIdFile
                : formData.extNationalIdFile;

        const referralFiles =
            visitType?.id === 'Hospital Referal'
                ? formData.referralDocuments
                : formData.extReferralDocuments;

        const payload = {
            ...formData,

            visitType: {
                id: visitType?.id,
                name: visitType?.name
            },

            gender: formData.gender
                ? {
                    id: formData.gender.id,
                    name: formData.gender.name
                }
                : null,

            bloodGroup: formData.bloodGroup
                ? {
                    id: formData.bloodGroup.id,
                    name: formData.bloodGroup.name
                }
                : null,

            nationalIdFile: nationalIdFile
                ? {
                    fileName: nationalIdFile.name,
                    filePath: nationalIdFile.webkitRelativePath || '',
                    size: nationalIdFile.size,
                    type: nationalIdFile.type,
                    file: nationalIdFile
                }
                : null,

            referralDocuments: referralFiles.map(file => ({
                fileName: file.name,
                filePath: file.webkitRelativePath || '',
                size: file.size,
                type: file.type,
                file
            }))
        };

        console.log('===== INPATIENT FORM DATA =====');
        console.log(payload);

        console.log('Visit Type:', visitType?.name);
        console.log('Gender:', formData.gender?.name);
        console.log('Blood Group:', formData.bloodGroup?.name);

        console.log(
            'National ID Number:',
            visitType?.id === 'Hospital Referal'
                ? formData.nationalIdNumber
                : formData.extNationalIdNumber
        );

        console.log('National ID File:', nationalIdFile);

        console.log(
            'National ID File Name:',
            nationalIdFile?.name
        );

        console.log(
            'National ID File Path:',
            nationalIdFile?.webkitRelativePath
        );

        console.log('Referral Files:');

        referralFiles.forEach((file, index) => {
            console.log(`File ${index + 1}`, {
                name: file.name,
                path: file.webkitRelativePath,
                size: file.size,
                type: file.type,
                file
            });
        });
    };

    return (
        <div>
            {formStep === 'basic' ? (
                <div className={`formContainer`}>
                    <h5 className="fs-18 fw-500 mb-3">Basic Patient Details</h5>

                    {/* Row 1: Search Patient */}
                    <div className="formRow">
                        <div className="formGroup">
                            <label className="customLabel">Search Patient</label>
                            <div className="inputWrapper">
                                <input
                                    type="text"
                                    name="searchPatient"
                                    placeholder="Search Patient By Name or file No"
                                    value={formData.searchPatient}
                                    onChange={handleBasicInputChange}
                                    className="customInput"
                                />
                                <i className="ri-search-line"></i>
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Visit Type and Phone Number */}
                    <div className="formRow">
                        <div className="formGroup">
                            <label className="customLabel">Visit Type <span className='text-danger'>*</span></label>
                            <CustomFormDropdown
                                options={visitTypeOptions}
                                value={visitType}
                                onChange={handleVisitTypeChange}
                                placeholder="Select Visit Type"
                            />
                        </div>
                        <div className="formGroup">
                            <label className="customLabel">Phone Number <span className='text-danger'>*</span></label>
                            <div className="inputWrapper">
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    placeholder="Enter Phone Number"
                                    value={formData.phoneNumber}
                                    onChange={handleBasicInputChange}
                                    className="customInput"
                                />
                                <i className="ri-phone-line"></i>
                            </div>
                        </div>
                    </div>

                    {/* Conditional Fields Based on Visit Type */}
                    {visitType && visitType.id === 'Hospital Referal' && (
                        <>
                            {/* Row 3: Name Fields */}
                            <div className="formRow">
                                <div className="formGroup">
                                    <label className="customLabel">First Name <span className='text-danger'>*</span></label>
                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="Enter First Name"
                                            value={formData.firstName}
                                            onChange={handleBasicInputChange}
                                            className="customInput"
                                        />
                                        <i className="ri-user-line"></i>
                                    </div>
                                </div>
                                <div className="formGroup">
                                    <label className="customLabel">Father Name <span className='text-danger'>*</span></label>
                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            name="fatherName"
                                            placeholder="Enter Father Name"
                                            value={formData.fatherName}
                                            onChange={handleBasicInputChange}
                                            className="customInput"
                                        />
                                        <i className="ri-user-line"></i>
                                    </div>
                                </div>
                                <div className="formGroup">
                                    <label className="customLabel">GrandFather Name <span className='text-danger'>*</span></label>
                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            name="grandFatherName"
                                            placeholder="Enter GrandFather Name"
                                            value={formData.grandFatherName}
                                            onChange={handleBasicInputChange}
                                            className="customInput"
                                        />
                                        <i className="ri-user-line"></i>
                                    </div>
                                </div>
                            </div>

                            {/* Row 4: Family and Mother Name */}
                            <div className="formRow">
                                <div className="formGroup">
                                    <label className="customLabel">Family Name <span className='text-danger'>*</span></label>
                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            name="familyName"
                                            placeholder="Enter Family Name"
                                            value={formData.familyName}
                                            onChange={handleBasicInputChange}
                                            className="customInput"
                                        />
                                        <i className="ri-user-line"></i>
                                    </div>
                                </div>
                                <div className="formGroup">
                                    <label className="customLabel">Mother Name <span className='text-danger'>*</span></label>
                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            name="motherName"
                                            placeholder="Enter Mother Name"
                                            value={formData.motherName}
                                            onChange={handleBasicInputChange}
                                            className="customInput"
                                        />
                                        <i className="ri-user-line"></i>
                                    </div>
                                </div>
                            </div>

                            {/* Row 5: Hospital and Doctor Name */}
                            <div className="formRow">
                                <div className="formGroup">
                                    <label className="customLabel">Hospital Name <span className='text-danger'>*</span></label>
                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            name="hospitalName"
                                            placeholder="Enter Hospital Name"
                                            value={formData.hospitalName}
                                            onChange={handleBasicInputChange}
                                            className="customInput"
                                        />
                                        <i className="ri-hospital-line"></i>
                                    </div>
                                </div>
                                <div className="formGroup">
                                    <label className="customLabel">Doctor Name <span className='text-danger'>*</span></label>
                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            name="doctorName"
                                            placeholder="Enter Doctor Name"
                                            value={formData.doctorName}
                                            onChange={handleBasicInputChange}
                                            className="customInput"
                                        />
                                        <i className="ri-stethoscope-line"></i>
                                    </div>
                                </div>
                            </div>

                            {/* Row 6: Operation and Operation Price */}
                            <div className="formRow">
                                <div className="formGroup">
                                    <label className="customLabel">Operation Name <span className='text-danger'>*</span></label>
                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            name="operationName"
                                            placeholder="Enter Operation Name"
                                            value={formData.operationName}
                                            onChange={handleBasicInputChange}
                                            className="customInput"
                                        />
                                        <i className="ri-scissors-2-line"></i>
                                    </div>
                                </div>
                                <div className="formGroup">
                                    <label className="customLabel">Operation Price <span className='text-danger'>*</span></label>
                                    <div className="inputWrapper">
                                        <input
                                            type="number"
                                            name="surgeryPrice"
                                            placeholder="Enter Operation Price"
                                            value={formData.surgeryPrice}
                                            onChange={handleBasicInputChange}
                                            className="customInput"
                                        />
                                        <i className="ri-money-dollar-circle-line"></i>
                                    </div>
                                </div>
                            </div>

                            {/* Row 7: National ID and Uploads */}
                            <div className="formRow">
                                <div className="formGroup">
                                    <label className="customLabel">National ID Number <span className='text-danger'>*</span></label>
                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            name="nationalIdNumber"
                                            placeholder="Enter National ID Number"
                                            value={formData.nationalIdNumber}
                                            onChange={handleBasicInputChange}
                                            className="customInput"
                                        />
                                        <i className="ri-id-card-line"></i>
                                    </div>
                                </div>
                                <div className="formGroup">
                                    <label className="customLabel">Upload National ID <span className='text-danger'>*</span></label>
                                    <div className="uploadBox" onClick={() => document.getElementById('nationalIdInput')?.click()}>
                                        {formData.nationalIdFile ? (
                                            <span>{formData.nationalIdFile.name}</span>
                                        ) : (
                                            <>
                                                <p>Upload National ID</p>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        id="nationalIdInput"
                                        type="file"
                                        accept=".png,.jpeg,.jpg"
                                        onChange={(e) => e.target.files && handleNationalIdSelect(e.target.files[0])}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                <div className="formGroup">
                                    <label className="customLabel">Upload Referral Documents <span className='text-danger'>*</span></label>
                                    <div className="uploadBox" onClick={() => document.getElementById('referralInput')?.click()}>
                                        {formData.referralDocuments.length > 0 ? (
                                            <span>{formData.referralDocuments.length} file(s) selected</span>
                                        ) : (
                                            <>
                                                <p>Upload Referral Documents</p>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        id="referralInput"
                                        type="file"
                                        multiple
                                        accept=".png,.jpeg,.jpg,.pdf"
                                        onChange={(e) => e.target.files && handleReferralDocumentsSelect(e.target.files)}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {(visitType && visitType.id === 'External Doctor') || (visitType && visitType.id === 'Internal Doctor') ? (
                        <>
                            {/* Row 5: Doctor Name and Referral Documents */}
                            <div className="formRow">
                                <div className="formGroup">
                                    <label className="customLabel">Doctor Name <span className='text-danger'>*</span></label>
                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            name="extDoctorName"
                                            placeholder="Enter Doctor Name"
                                            value={formData.extDoctorName}
                                            onChange={handleBasicInputChange}
                                            className="customInput"
                                        />
                                        <i className="ri-stethoscope-line"></i>
                                    </div>
                                </div>
                                <div className="formGroup">
                                    <label className="customLabel">Upload Referral Documents <span className='text-danger'>*</span></label>
                                    <div className="uploadBox" onClick={() => document.getElementById('extReferralInput')?.click()}>
                                        {formData.extReferralDocuments.length > 0 ? (
                                            <span>{formData.extReferralDocuments.length} file(s) selected</span>
                                        ) : (
                                            <>
                                                <p>Upload Referral Documents</p>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        id="extReferralInput"
                                        type="file"
                                        multiple
                                        accept=".png,.jpeg,.jpg,.pdf"
                                        onChange={(e) => e.target.files && handleReferralDocumentsSelect(e.target.files)}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            </div>

                            {/* Row 6: Operation Name and Operation Price */}
                            <div className="formRow">
                                <div className="formGroup">
                                    <label className="customLabel">Operation Name <span className='text-danger'>*</span></label>
                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            name="extOperationName"
                                            placeholder="Enter Operation Name"
                                            value={formData.extOperationName}
                                            onChange={handleBasicInputChange}
                                            className="customInput"
                                        />
                                        <i className="ri-scissors-2-line"></i>
                                    </div>
                                </div>
                                <div className="formGroup">
                                    <label className="customLabel">Operation Price <span className='text-danger'>*</span></label>
                                    <div className="inputWrapper">
                                        <input
                                            type="number"
                                            name="extSurgeryPrice"
                                            placeholder="Enter Operation Price"
                                            value={formData.extSurgeryPrice}
                                            onChange={handleBasicInputChange}
                                            className="customInput"
                                        />
                                        <i className="ri-money-dollar-circle-line"></i>
                                    </div>
                                </div>
                            </div>

                            {/* Row 7: National ID and Upload */}
                            <div className="formRow">
                                <div className="formGroup">
                                    <label className="customLabel">National ID Number <span className='text-danger'>*</span></label>
                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            name="extNationalIdNumber"
                                            placeholder="Enter National ID Number"
                                            value={formData.extNationalIdNumber}
                                            onChange={handleBasicInputChange}
                                            className="customInput"
                                        />
                                        <i className="ri-id-card-line"></i>
                                    </div>
                                </div>
                                <div className="formGroup">
                                    <label className="customLabel">Upload National ID <span className='text-danger'>*</span></label>
                                    <div className="uploadBox" onClick={() => document.getElementById('extNationalIdInput')?.click()}>
                                        {formData.extNationalIdFile ? (
                                            <span>{formData.extNationalIdFile.name}</span>
                                        ) : (
                                            <>
                                                <p>Upload National ID</p>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        id="extNationalIdInput"
                                        type="file"
                                        accept=".png,.jpeg,.jpg"
                                        onChange={(e) => e.target.files && handleNationalIdSelect(e.target.files[0])}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            </div>
                        </>
                    ) : null}

                    {/* Action Buttons */}
                    <div className="d-flex justify-content-between border-0 pb-0 mt-5">
                        <button
                            type="button"
                            className="aph-modal-btn-height outline-0 col-md-4 border border-danger text-danger bg-white fs-18 fw-400"
                            onClick={handleCancel}>
                            Cancel
                        </button>
                        <button
                            type='button'
                            className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                            onClick={handleNext}
                            disabled={!visitType || !formData.phoneNumber}
                        >
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                <div className={`formContainer`}>
                    <h5 className="fs-18 fw-500 mb-3">Patient Details</h5>

                    {/* Row 1: Gender, DOB, Age */}
                    <div className="formRow">
                        <div className="formGroup">
                            <label className="customLabel">Gender <span className='text-danger'>*</span></label>
                            <CustomFormDropdown
                                options={genderOptions}
                                value={formData.gender}
                                onChange={handleGenderChange}
                                placeholder="Select Gender"
                            />
                        </div>
                        <div className="formGroup">
                            <label className="customLabel">Date of Birth <span className='text-danger'>*</span></label>
                            <div style={{ position: 'relative' }}>
                                <div
                                    className="customInput d-flex align-items-center"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setShowDobCalendar(!showDobCalendar)}
                                >
                                    {selectedDob
                                        ? `${String(selectedDob.getDate()).padStart(2, "0")}/${String(selectedDob.getMonth() + 1).padStart(2, "0")}/${selectedDob.getFullYear()}`
                                        : 'DD/MM/YYYY'
                                    }
                                </div>
                                {showDobCalendar && (
                                    <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1000, marginTop: '4px' }}>
                                        <DateFilterCalendar
                                            selectedDate={selectedDob}
                                            onDateSelect={(date) => {
                                                setSelectedDob(date);
                                                setShowDobCalendar(false);
                                                handleDateChange(date);
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="formGroup">
                            <label className="customLabel">Age <span className='text-danger'>*</span></label>
                            <div className="inputWrapper">
                                <input
                                    type="text"
                                    value={`${formData.age}`}
                                    disabled
                                    className="customInput"
                                    placeholder="Auto-calculated"
                                />
                                <i className="ri-calendar-line"></i>
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Blood Group and Address */}
                    <div className="formRow">
                        <div className="formGroup">
                            <label className="customLabel">Blood Group <span className='text-danger'>*</span></label>
                            <CustomFormDropdown
                                options={bloodGroupOptions}
                                value={formData.bloodGroup}
                                onChange={handleBloodGroupChange}
                                placeholder="Select Blood Group"
                            />
                        </div>
                        <div className="formGroup">
                            <label className="customLabel">Address <span className='text-danger'>*</span></label>
                            <div className="inputWrapper">
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Enter Address"
                                    value={formData.address}
                                    onChange={handleBasicInputChange}
                                    className="customInput"
                                />
                                <i className="ri-map-pin-line"></i>
                            </div>
                        </div>
                    </div>

                    {/* Row 3: Notes */}
                    <div className="formRow">
                        <div className="fullWidthGroup">
                            <label className="customLabel">Notes</label>
                            <TinyEditor
                                value={formData.notes}
                                onChange={handleEditorChange}
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex justify-content-between border-0 pb-0 mt-5">
                        <button
                            className="aph-modal-btn-height outline-0 col-md-4 border border-danger text-danger bg-white fs-18 fw-400"
                            onClick={handleCancel}>
                            Cancel
                        </button>
                        <button
                            className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                            onClick={handleSubmit}>
                            Send a request to Accountant
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
