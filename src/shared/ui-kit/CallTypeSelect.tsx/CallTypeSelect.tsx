import React, { useState, useRef, useEffect } from 'react';
import styles from './CallTypeSelect.module.scss';
import clsx from 'clsx';
import ChevronDown from '../../../assets/icons/chevrons/ChevronDown';
import ArrowIcons from '../SortArrows/ArrowIcons';

interface Option {
    label: string;
    value: 'all' | 'in' | 'out';
}

const options: Option[] = [
    { label: 'Все типы', value: 'all' },
    { label: 'Входящие', value: 'in' },
    { label: 'Исходящие', value: 'out' },
];

interface CallTypeSelectProps {
    value: 'all' | 'in' | 'out';
    onChange: (value: 'all' | 'in' | 'out') => void;
}

export const CallTypeSelect: React.FC<CallTypeSelectProps> = ({
    value,
    onChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => setIsOpen((prev) => !prev);
    const handleSelect = (option: Option) => {
        onChange(option.value);
        setIsOpen(false);
    };

    const selectedOption =
        options.find((opt) => opt.value === value) || options[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div className={styles.callTypeSelect} ref={containerRef}>
            <div className={styles.selectHeader} onClick={handleToggle}>
                <span>{selectedOption.label}</span>
                <ArrowIcons isUpward={isOpen} />
            </div>

            {isOpen && (
                <ul className={styles.dropdown}>
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleSelect(option)}
                            className={clsx(
                                isOpen &&
                                    option.value === value &&
                                    styles.active
                            )}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
