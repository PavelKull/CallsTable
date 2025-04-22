import React from 'react';
import { useTable, useSortBy } from 'react-table';
import s from './CallsTable.module.scss';

type Props = {
    data: any[];
    columns: any;
    loading: boolean;
    error: Error | null;
};

const CallTableContent: React.FC<Props> = ({
    data,
    columns,
    loading,
    error,
}) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data }, useSortBy);

    return (
        <div className={s.tableWrapper}>
            {error && <p className={s.message}>Ошибка: {error.message}</p>}
            <table {...getTableProps()} className={s.table}>
                <thead>
                    {headerGroups.map((hg) => (
                        <tr key={hg.id} {...hg.getHeaderGroupProps()}>
                            {hg.headers.map((col) => (
                                <th
                                    key={col.id}
                                    {...col.getHeaderProps()}
                                    className={col.className}
                                >
                                    {col.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {loading && (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className={s.loadingRow}
                            >
                                Загрузка данных...
                            </td>
                        </tr>
                    )}
                    {!loading && rows.length === 0 && (
                        <tr>
                            <td colSpan={columns.length} className={s.message}>
                                Нет данных
                            </td>
                        </tr>
                    )}
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr
                                key={row.id}
                                {...row.getRowProps()}
                                className={s.row}
                            >
                                {row.cells.map((cell) => (
                                    <td
                                        key={cell.column.id}
                                        {...cell.getCellProps()}
                                        className={cell.column.className}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default CallTableContent;
