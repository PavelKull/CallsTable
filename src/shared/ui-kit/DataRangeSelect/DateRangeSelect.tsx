import React, { useEffect, useState } from 'react';
import CalendIcon from '../../../assets/icons/CalendIcon';
import ChevronLeft from '../../../assets/icons/chevrons/ChevronLeft';
import ChevronRight from '../../../assets/icons/chevrons/ChevronRight';
import InputMask from 'react-input-mask';

import s from './DateRangeSelect.module.scss';

type DateRangeOption = '3 дня' | 'Неделя' | 'Месяц' | 'Год' | 'Указать даты';

const parseDate = (str: string): Date | null => {
    const [dd, mm, yy] = str.split('.');
    if (!dd || !mm || !yy) return null;
    const yyyy = `20${yy}`;
    const date = new Date(+yyyy, +mm - 1, +dd);
    return isNaN(date.getTime()) ? null : date;
};

const formatDateDMY = (date: Date): string => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yy = String(date.getFullYear()).slice(2);
    return `${dd}.${mm}.${yy}`;
};

const formatDate = (date: Date): string => date.toISOString().split('T')[0];

interface Props {
    value: DateRangeOption;
    onChange: (value: DateRangeOption) => void;
    onDateChange?: (start: Date, end: Date) => void;
}

const DateRangeSelect: React.FC<Props> = ({
    value,
    onChange,
    onDateChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStart, setCurrentStart] = useState(new Date());
    const [currentEnd, setCurrentEnd] = useState(new Date());
    const [customStart, setCustomStart] = useState('');
    const [customEnd, setCustomEnd] = useState('');
    const options: DateRangeOption[] = [
        '3 дня',
        'Неделя',
        'Месяц',
        'Год',
        'Указать даты',
    ];

    useEffect(() => {
        if (value !== 'Указать даты') {
            const today = new Date();
            const [start, end] = calculateRange(today, value);
            setCurrentStart(start);
            setCurrentEnd(end);
            setCustomStart(formatDateDMY(start));
            setCustomEnd(formatDateDMY(end));
            console.log(start, end);
            onDateChange?.(start, end);
        }
    }, [value]);

    const getRangeLength = (option: DateRangeOption): number => {
        switch (option) {
            case '3 дня':
                return 3;
            case 'Неделя':
                return 7;
            case 'Месяц':
                return 30;
            case 'Год':
                return 365;
            default:
                return 0;
        }
    };

    const calculateRange = (
        endDate: Date,
        option: DateRangeOption
    ): [Date, Date] => {
        const length = getRangeLength(option);
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - length + 1);
        return [startDate, endDate];
    };

    const handleSelect = (option: DateRangeOption) => {
        onChange(option);
        setIsOpen(false);

        if (option !== 'Указать даты') {
            const [start, end] = calculateRange(currentStart, option);
            const formattedStart = formatDateDMY(start);
            const formattedEnd = formatDateDMY(end);
            setCustomStart(formattedStart);
            setCustomEnd(formattedEnd);
            onDateChange?.(start, end);
        }
    };

    const handlePrev = () => {
        const currentIndex = options.indexOf(value);
        if (currentIndex > 0) {
            const newValue = options[currentIndex - 1];
            handleSelect(newValue);
        }
    };

    const handleNext = () => {
        const currentIndex = options.indexOf(value);
        if (currentIndex < options.length - 1) {
            const newValue = options[currentIndex + 1];
            handleSelect(newValue);
        }
    };

    const handleCustomDateChange = (
        type: 'start' | 'end',
        rawValue: string
    ) => {
        if (type === 'start') {
            setCustomStart(rawValue);
        } else {
            setCustomEnd(rawValue);
        }
    };

    const handleCustomDateEnter = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key !== 'Enter') return;

        const startDate = parseDate(customStart);
        const endDate = parseDate(customEnd);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (startDate && endDate && endDate <= today && startDate <= endDate) {
            setCurrentStart(startDate);
            setCurrentEnd(endDate);
            setCustomStart(formatDateDMY(startDate));
            setCustomEnd(formatDateDMY(endDate));
            onDateChange?.(startDate, endDate);
            onChange('Указать даты');
        }
    };

    return (
        <div
            className={`${s.dateRangeSelect} ${
                isOpen ? s.dateRangeSelectOpen : ''
            }`}
        >
            <div className={s.compact}>
                <button onClick={handlePrev} className={s.rangeBtns}>
                    <ChevronLeft />
                </button>
                <button
                    className={s.selectButton}
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <div className={s.calendarIcon}>
                        <CalendIcon />
                    </div>
                    <span className={s.selectHeader}>{value}</span>
                </button>
                <button onClick={handleNext} className={s.rangeBtns}>
                    <ChevronRight />
                </button>
            </div>

            {isOpen && (
                <div className={s.dropdown}>
                    {options.map((option) => (
                        <div
                            key={option}
                            className={`${s.option} ${
                                value === option ? s.active : ''
                            } ${option === 'Указать даты' ? s.disabled : ''}`}
                            onClick={
                                option !== 'Указать даты'
                                    ? () => handleSelect(option)
                                    : undefined
                            }
                        >
                            {option}
                        </div>
                    ))}

                    <div className={s.customDateWrapper}>
                        <div className={s.dateInputs}>
                            <InputMask
                                mask="99.99.99"
                                value={customStart}
                                onChange={(e) =>
                                    handleCustomDateChange(
                                        'start',
                                        e.target.value
                                    )
                                }
                                onKeyDown={handleCustomDateEnter}
                            >
                                {(inputProps: any) => (
                                    <input
                                        {...inputProps}
                                        className={s.dateInput}
                                        placeholder={
                                            formatDateDMY(currentStart) ||
                                            '__.__.__'
                                        }
                                    />
                                )}
                            </InputMask>

                            <span> - </span>

                            <InputMask
                                mask="99.99.99"
                                value={customEnd}
                                onChange={(e) =>
                                    handleCustomDateChange(
                                        'end',
                                        e.target.value
                                    )
                                }
                                onKeyDown={handleCustomDateEnter}
                            >
                                {(inputProps: any) => (
                                    <input
                                        {...inputProps}
                                        className={s.dateInput}
                                        placeholder={
                                            formatDateDMY(currentEnd) ||
                                            '__.__.__'
                                        }
                                    />
                                )}
                            </InputMask>
                        </div>
                        <div className={s.iconWrapper}>
                            <CalendIcon />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateRangeSelect;
