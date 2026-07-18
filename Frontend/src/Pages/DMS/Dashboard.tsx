import { useState } from 'react';

import Header from '../../GlobalHelpers/Header';
import FolderComponent from '../../GlobalHelpers/FolderComponent';


import '../../styles/dms.css';

interface FolderData {
    id: string;
    title: string;
    value: number;
    subText?: string;
    defaultActive?: boolean;
}

export default function Dashboard() {

    const folders: FolderData[] = [
        {
            id: 'today-records',
            title: "Today's Records",
            value: 11,
        },
        {
            id: 'registered-records',
            title: 'Registered Files',
            value: 501,
            subText: 'Births: 420 | Deaths: 81',
        },
        {
            id: 'official-correspondence',
            title: 'Official Correspondence',
            value: 951,
            subText: 'Issued: 351 | Received: 600',
        },
        {
            id: 'total-documents',
            title: 'Total Documents',
            value: 1789,
            subText: 'General archives: 1,189 | Life events: 600',
            defaultActive: true,
        },
    ];

    const defaultActiveCard = folders.find((folder) => folder.defaultActive)?.id || null;
    const [activeFolderId, setActiveFolderId] = useState<string | null>(defaultActiveCard);

    return (
        <div className="container-fluid p-3">

            <Header
                heading="DMS"
                subHeading="Dashboard"
            />

            <div className="d-flex justify-content-between align-items-center gap-4 mt-3 mb-4" style={{ maxHeight: "45px" }}>
                <p className='fs-24 fw-700'>Dashboard</p>
                <div className="Plus-btn">
                    <div className='text-white fs-16 fw-400'>New Files</div>
                    <img src="/Assets/Icons/WhitePlusCircle.svg" alt="WhitePlusCircle" width={24} height={24} />
                </div>
            </div>

            <div className="DMS-Stats my-3">

                {folders.map((folder) => (

                    <FolderComponent
                        key={folder.id}
                        title={folder.title}
                        value={folder.value}
                        subText={folder.subText}
                        active={activeFolderId === folder.id}
                        onClick={() => setActiveFolderId(folder.id)}
                    />

                ))}

            </div>

        </div>
    );
}