import React from 'react';
import classNames from 'classnames';

import s from './Avatar.module.scss';
import UserIcon from '../../../assets/icons/UserIcon';

interface AvatarProps {
    personAvatar?: string;
    personName?: string;
    personSurname?: string;
    className?: string;
    style?: React.CSSProperties;
}

const Avatar: React.FC<AvatarProps> = ({
    personAvatar,
    personName,
    personSurname,
    className,
    style,
}) => {
    const hasInitials =
        personName &&
        personSurname &&
        personName.length > 0 &&
        personSurname.length > 0;

    const initials = hasInitials ? `${personName[0]}${personSurname[0]}` : null;

    const isValidInitials = initials
        ? /^[A-Za-zА-Яа-я]$/.test(initials[0]) &&
          /^[A-Za-zА-Яа-я]$/.test(initials[1])
        : false;

    let content;
    if (personAvatar) {
        content = (
            <img
                src={personAvatar}
                alt={`${personName ?? ''} ${personSurname ?? ''}`}
                className={s.avatar__image}
            />
        );
    } else if (isValidInitials && initials) {
        content = <span className={s.avatar__initials}>{initials}</span>;
    } else {
        content = (
            <div className={s.avatar__icon}>
                <UserIcon />
            </div>
        );
    }

    return (
        <div className={classNames(s.avatar, className)} style={style}>
            {content}
        </div>
    );
};

export default Avatar;
