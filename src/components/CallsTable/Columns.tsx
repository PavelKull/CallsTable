import getTime from '../../utils/getTime';
import getCallQuality from '../../utils/getCallQuality';
import formatDuration from '../../utils/formatDuration';
import CallStatusIcon from '../../shared/ui-kit/CallTypeIcon/CallStatusIcon';
import Avatar from '../../shared/ui-kit/Avatar/Avatar';
import CallStatusBadge from '../../shared/ui-kit/CallStatusBadge/CallStatusBadge';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import ArrowIcons from '../../shared/ui-kit/SortArrows/ArrowIcons';
import ContactInfo from '../../shared/ui-kit/ContactInfo/ContactInfo';
import s from './CallsTable.module.scss';

const getColumns = (sortConfig: any, setSortConfig: any) => [
    {
        Header: 'Тип',
        accessor: 'status',
        Cell: ({ row }: any) => (
            <CallStatusIcon
                status={row.original.status}
                in_out={row.original.in_out}
            />
        ),
        className: s.typeColumn,
    },
    {
        Header: (
            <div
                className={s.headerWithArrow}
                onClick={() => {
                    setSortConfig((prev: any) => ({
                        by: 'date',
                        order:
                            prev.by === 'date' && prev.order === 'ASC'
                                ? 'DESC'
                                : 'ASC',
                    }));
                }}
            >
                Время
                <ArrowIcons
                    isUpward={
                        sortConfig.by === 'date' && sortConfig.order === 'ASC'
                    }
                />
            </div>
        ),
        accessor: 'date',
        Cell: ({ value }: any) => (
            <span className={s.timeColumn}>{getTime(value)}</span>
        ),
        className: s.timeColumn,
    },
    {
        Header: 'Сотрудник',
        accessor: 'person_name',
        Cell: ({ row }: any) => (
            <Avatar
                personName={row.original.person_name}
                personSurname={row.original.person_surname}
                personAvatar={row.original.person_avatar}
            />
        ),
        className: s.employeeColumn,
    },
    {
        Header: 'Звонок',
        accessor: 'contact_info',
        Cell: ({ row }: any) => (
            <ContactInfo
                name={row.original.contact_name}
                company={row.original.contact_company}
                number={row.original.from_number}
            />
        ),
        className: s.phoneColumn,
    },
    {
        Header: 'Источник',
        accessor: 'source',
        Cell: ({ value }: any) => (
            <span className={s.sourceColumn}>{value}</span>
        ),
        className: s.sourceColumn,
    },
    {
        Header: 'Оценка',
        accessor: 'quality',
        Cell: ({ row }: any) => (
            <CallStatusBadge type={getCallQuality(row.original)} />
        ),
        className: s.ratingColumn,
    },
    {
        Header: (
            <div
                className={s.lastHeaderTitle}
                onClick={() => {
                    setSortConfig((prev: any) => ({
                        by: 'duration',
                        order:
                            prev.by === 'duration' && prev.order === 'ASC'
                                ? 'DESC'
                                : 'ASC',
                    }));
                }}
            >
                Длительность
                <ArrowIcons
                    isUpward={
                        sortConfig.by === 'duration' &&
                        sortConfig.order === 'ASC'
                    }
                />
            </div>
        ),
        accessor: 'time',
        Cell: ({ row, value }: any) => (
            <div className={s.audioCell}>
                <span className={s.duration}>
                    {value !== 0 && formatDuration(value)}
                </span>
                <div className={s.player}>
                    {row.original.record && (
                        <AudioPlayer
                            duration={row.original.time}
                            recordId={row.original.record}
                            partnershipId={row.original.partnership_id}
                        />
                    )}
                </div>
            </div>
        ),
        className: s.audioColumn,
    },
];

export default getColumns;