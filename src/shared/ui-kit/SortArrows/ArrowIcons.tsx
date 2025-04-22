import React from 'react';
import ChevronDown from '../../../assets/icons/chevrons/ChevronDown';
import ChevronUp from '../../../assets/icons/chevrons/ChevronUp';

import s from './ArrowIcons.module.scss';
interface ArrowIconsProps {
    isUpward: boolean;
}

const ArrowIcons: React.FC<ArrowIconsProps> = ({ isUpward }) => {
    return (
        <div className={s.chevron}>
            {isUpward ? <ChevronUp /> : <ChevronDown />}
        </div>
    );
};

export default ArrowIcons;
