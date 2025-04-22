import React from 'react';
import formatPhoneNumber from '../../../utils/formatPhoneNumber';
import s from './ContactInfo.module.scss';

interface ContactInfoProps {
    name?: string;
    company?: string;
    number: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ name, company, number }) => {
    let content: React.ReactNode = (
        <div className={s.number}>{formatPhoneNumber(number)}</div>
    );

    if (name && company) {
        content = (
            <>
                <div className={s.name}>{name}</div>
                <div className={s.company}>{company}</div>
            </>
        );
    } else if (name) {
        content = (
            <>
                <div className={s.name}>{name}</div>
                <div className={s.number + ' ' + s.grey}>
                    {formatPhoneNumber(number)}
                </div>
            </>
        );
    }

    return <div className={s.contactInfo}>{content}</div>;
};

export default ContactInfo;
