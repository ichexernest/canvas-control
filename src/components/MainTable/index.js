import { React, useState, useMemo } from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useBlockLayout } from 'react-table'
// A great library for fuzzy filtering/sorting items
import { matchSorter } from 'match-sorter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Wrapper, BWrapper, BContent } from './MainTable.styles'
import { FixedSizeList } from 'react-window'
import SearchBar from '../SearchBar'
import makeData from './makeData'
import scrollbarWidth from './ScrollBarWidth'

// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <BWrapper>
            <BContent>
                <FontAwesomeIcon className="icon" icon={faSearch} />
                <input
                    type='text'
                    value={value || ""}
                    onChange={e => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder={`Search in ${count} records...`}
                    style={{
                        fontSize: '1.1rem',
                        border: '0',
                    }}
                />
            </BContent>
        </BWrapper>
    )
}

// Define a default UI for filtering
function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

// Our table component
function Table({ columns, data }) {
    const filterTypes = useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    )

    const defaultColumn = useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
            width: 150,
        }),
        []
    )

    const scrollBarSize = React.useMemo(() => scrollbarWidth(), [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        visibleColumns,
        totalColumnsWidth,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            defaultColumn, // Be sure to pass the defaultColumn option
            filterTypes,
        },
        useBlockLayout,
        useFilters, // useFilters!
        useGlobalFilter // useGlobalFilter!
    )

    // We don't want to render all of the rows for this example, so cap
    // it for this use case
    //const firstPageRows = rows.slice(0, 10)

    const RenderRow = React.useCallback(
        ({ index, style }) => {
            const row = rows[index]
            prepareRow(row)
            return (
                <div
                    {...row.getRowProps({
                        style,
                    })}
                    className="tr"
                >
                    {row.cells.map(cell => {
                        return (
                            <div {...cell.getCellProps()} className="td">
                                {cell.render('Cell')}
                            </div>
                        )
                    })}
                </div>
            )
        },
        [prepareRow, rows]
    )

    return (
        <>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />

            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    {/* Render the columns filter UI */}
                                </th>
                            ))}
                        </tr>
                    ))}
                    {/* <tr>
                        <th
                            colSpan={visibleColumns.length}
                            style={{
                                textAlign: 'left',
                            }}
                        >
                        </th>
                    </tr> */}
                </thead>
                <tbody {...getTableBodyProps()}>
                    <FixedSizeList
                        height={400}
                        itemCount={rows.length}
                        itemSize={35}
                        width={totalColumnsWidth + scrollBarSize}
                    >
                        {RenderRow}
                    </FixedSizeList>
                </tbody>
            </table>
            <br />
            <div>Showing the first 10 results of {rows.length} rows</div>
            <div>
                <pre>
                    <code>{JSON.stringify(state.filters, null, 2)}</code>
                </pre>
            </div>
        </>
    )
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
    return rows.filter(row => {
        const rowValue = row.values[id]
        return rowValue >= filterValue
    })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== 'number'

function MainTable() {
    const columns = useMemo(
        () => [
            {
                Header: '案號',
                accessor: '案號',
            },
            {
                Header: '建檔日期',
                accessor: '建檔日期',
            },
            {
                Header: '說明',
                accessor: '說明',

            },
            {
                Header: '立案人員',
                accessor: '立案人員',

            },
            {
                Header: '通知信箱',
                accessor: '通知信箱',

            },
            {
                Header: '來源文件',
                accessor: '來源文件',

            },
            {
                Header: '比對文件',
                accessor: '比對文件',

            },
            {
                Header: '比對結果',
                accessor: '比對結果',
            },
            {
                Header: '查詢比對結果',
                accessor: '查詢比對結果',
            },
        ],
        []
    )

    const data = useMemo(() => makeData(100000), [])

    return (
        <Wrapper>
            <Table columns={columns} data={data} />
        </Wrapper>
    )
}

export default MainTable;
