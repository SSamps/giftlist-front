import React from 'react';

interface props {
    label: string;
    body: string;
    controlLabel?: string;
    controlAction?: React.Dispatch<React.SetStateAction<boolean>>;
    danger?: boolean;
}

const ProfileRow: React.FC<props> = ({ label, body, controlLabel, controlAction, danger }) => {
    return (
        <div className='profileRow'>
            <div className='profileRow-info'>
                <div className='profileRow-info-label'>
                    <strong>{label}</strong>
                </div>
                <div className='profileRow-info-body'>{body}</div>
            </div>
            {controlAction && controlLabel && (
                <div
                    className={`profileRow-controls btn-block${danger ? '-danger' : ''}`}
                    onClick={() => controlAction(true)}
                >
                    {controlLabel}
                </div>
            )}
        </div>
    );
};

export default ProfileRow;
