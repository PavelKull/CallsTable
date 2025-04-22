import React from 'react';

import BlueRowIcon from '../../../assets/icons/rows/BlueRowIcon';
import GreenRowIcon from '../../../assets/icons/rows/GreenRowIcon';
import RedRowIconM from '../../../assets/icons/rows/RedRowIconM';
import RedRowIconN from '../../../assets/icons/rows/RedRowIconN';

import classNames from 'classnames';
import s from './CallStatusIcon.module.scss';

interface CallStatusIconProps {
    status: 'Дозвонился' | 'Не дозвонился';
    in_out: number;
    className?: string;
    style?: React.CSSProperties;
}

const CallStatusIcon: React.FC<CallStatusIconProps> = ({
    status,
    in_out,
    className,
    style,
}) => {
    let IconComponent;

    if (in_out === 1) {
        IconComponent = status === 'Дозвонился' ? BlueRowIcon : RedRowIconM;
    } else {
        IconComponent = status === 'Дозвонился' ? GreenRowIcon : RedRowIconN;
    }

    return (
        <div
            className={classNames(s.call__icon_wrapper, className)}
            style={style}
        >
            <IconComponent />
        </div>
    );
};

export default CallStatusIcon;
