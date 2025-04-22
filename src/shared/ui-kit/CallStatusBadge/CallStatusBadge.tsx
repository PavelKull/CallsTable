import styles from './CallStatusBadge.module.scss';

type CallQuality = 'excellent' | 'good' | 'bad';

interface CallStatusBadgeProps {
    type: CallQuality;
    label?: string;
}

const CallStatusBadge = ({ type, label }: CallStatusBadgeProps) => {
    const text =
        label ||
        {
            excellent: 'Отлично',
            good: 'Хорошо',
            bad: 'Плохо',
        }[type];

    return <span className={styles.badge + ' ' + styles[type]}>{text}</span>;
};

export default CallStatusBadge;
