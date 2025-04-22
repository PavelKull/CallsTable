import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTable, useSortBy } from 'react-table';

import 'react-datepicker/dist/react-datepicker.css';
import s from './CallsTable.module.scss';

import useCalls from '../../hooks/useCalls';
import { Call } from '../../types/ICall';

import CallStatusIcon from '../../shared/ui-kit/CallTypeIcon/CallStatusIcon';
import Avatar from '../../shared/ui-kit/Avatar/Avatar';
import CallStatusBadge from '../../shared/ui-kit/CallStatusBadge/CallStatusBadge';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import getTime from '../../utils/getTime';
import getCallQuality from '../../utils/getCallQuality';
import formatDuration from '../../utils/formatDuration';
import ArrowIcons from '../../shared/ui-kit/SortArrows/ArrowIcons';
import DateRangeSelect from '../../shared/ui-kit/DataRangeSelect/DateRangeSelect';
import { CallTypeSelect } from '../../shared/ui-kit/CallTypeSelect.tsx/CallTypeSelect';
import ContactInfo from '../../shared/ui-kit/ContactInfo/ContactInfo';
import { getCalls } from '../../api/api';
import getColumns from './columns';
import CallTableContent from './callTableContent';

type RangeOption = '3 дня' | 'Неделя' | 'Месяц' | 'Год' | 'Указать даты';

const CallTable: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [typeFilter, setTypeFilter] = useState<'all' | 'in' | 'out'>('all');
    const [range, setRange] = useState<RangeOption>('3 дня');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [cuurrentQuantity, setCurrentQuantity] = useState(0);
    const tableWrapperRef = useRef<HTMLDivElement | null>(null);

    const fetchMoreData = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        setError(null);

        try {
            const response = await getCalls(buildParams(offset));

            const newResults: Call[] = Array.isArray(response.results)
                ? response.results
                : Array.isArray(response.results?.items)
                ? response.results.items
                : [];

            if (newResults.length === 0) {
                setHasMore(false);
            } else {
                setData((prev) => [...prev, ...newResults]);
                setOffset((prev) => prev + newResults.length);
            }
        } catch (e) {
            setError(e as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const fullHeight = document.body.offsetHeight;

            if (
                scrollTop + windowHeight >= fullHeight - 100 &&
                !loading &&
                hasMore
            ) {
                fetchMoreData();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

    const [sortConfig, setSortConfig] = useState<{
        by: 'date' | 'duration';
        order: 'ASC' | 'DESC';
    }>({ by: 'date', order: 'DESC' });

    const buildParams = (offsetValue = 0) => {
        const params: Record<string, any> = {};

        const today = new Date();
        let ds: Date | null = null;
        let de: Date = today;

        if (range === '3 дня') {
            ds = new Date();
            ds.setDate(ds.getDate() - 3);
        } else if (range === 'Неделя') {
            ds = new Date();
            ds.setDate(ds.getDate() - 7);
        } else if (range === 'Месяц') {
            ds = new Date();
            ds.setMonth(ds.getMonth() - 1);
        } else if (range === 'Год') {
            ds = new Date();
            ds.setFullYear(ds.getFullYear() - 1);
        } else if (range === 'Указать даты' && startDate && endDate) {
            ds = startDate;
            de = endDate;
        }

        if (ds) {
            const pad = (n: number) => String(n).padStart(2, '0');
            params.date_start = `${ds.getFullYear()}-${pad(
                ds.getMonth() + 1
            )}-${pad(ds.getDate())}`;
            params.date_end = `${de.getFullYear()}-${pad(
                de.getMonth() + 1
            )}-${pad(de.getDate())}`;
        }

        params.sort_by = sortConfig.by;
        params.order = sortConfig.order;
        params.limit = 30;
        params.offset = offsetValue;

        return params;
    };

    const filteredData = useMemo(() => {
        if (typeFilter === 'all') return data;
        if (typeFilter === 'in')
            return data.filter((call) => call.in_out === 1);
        if (typeFilter === 'out')
            return data.filter((call) => call.in_out === 0);
        return data;
    }, [data, typeFilter]);

    useEffect(() => {
        let isCurrent = true;

        const sortData = async () => {
            const limit = data.length;
            if (limit === 0) return;

            setLoading(true);
            setError(null);

            try {
                const response = await getCalls({ ...buildParams(0), limit });
                if (!isCurrent) return;

                const newResults = Array.isArray(response.results)
                    ? response.results
                    : response.results?.items || [];

                setData(newResults);
            } catch (e) {
                if (isCurrent) setError(e as Error);
            } finally {
                if (isCurrent) setLoading(false);
            }
        };

        sortData();

        return () => {
            isCurrent = false;
        };
    }, [sortConfig]);

    useEffect(() => {
        const fetchInitial = async () => {
            setLoading(true);
            setOffset(0);
            setHasMore(true);
            setError(null);

            try {
                const response = await getCalls(buildParams());
                const newResults = Array.isArray(response.results)
                    ? response.results
                    : response.results?.items || [];

                setData(newResults);
                setOffset(newResults.length);
                setHasMore(newResults.length > 0);
            } catch (e) {
                setError(e as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchInitial();
    }, [typeFilter, range, startDate, endDate, sortConfig]);

    const columns = React.useMemo(
        () => getColumns(sortConfig, setSortConfig),
        [sortConfig, setSortConfig]
    );

    const tableInstance = useTable(
        { columns, data: filteredData || [] },
        useSortBy
    );
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance;

    return (
        <div className={s.wrapper}>
            <div className={s.filters}>
                <CallTypeSelect value={typeFilter} onChange={setTypeFilter} />
                <DateRangeSelect
                    value={range}
                    onChange={setRange}
                    onDateChange={(s, e) => {
                        setStartDate(s);
                        setEndDate(e);
                    }}
                />
            </div>

            <CallTableContent
                data={data}
                columns={columns}
                loading={loading}
                error={error}
            />
        </div>
    );
};

export default CallTable;
