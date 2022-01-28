import { React, useState, useMemo} from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination, useRowSelect } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faAngleRight,faAngleLeft,faAngleDoubleRight,faAngleDoubleLeft,faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Wrapper, SearchWrapper, GlobalContent,PageContent,PageWrapper, Button } from './MTable.styles'
import makeData from './makeData'
import { Link } from "react-router-dom";

const SourcePath = ({ values }) => {
  // Loop through the array and create a badge-like component instead of a comma-separated string
  return (
    <>
      {(
        <Button key={values} className="badge">
          download
        </Button>
      )
      }
    </>
  );
};
const DetailLink = ({ values }) => {
  // Loop through the array and create a badge-like component instead of a comma-separated string
  return (
    <>
      {(
        <Link to={`/${values}`}>
          go
        </Link>

      )
      }
    </>
  );
};
// const IndeterminateCheckbox = forwardRef(
//   ({ indeterminate, ...rest }, ref) => {
//     const defaultRef = useRef()
//     const resolvedRef = ref || defaultRef

//     useEffect(() => {
//       resolvedRef.current.indeterminate = indeterminate
//     }, [resolvedRef, indeterminate])

//     return (
//       <>
//         <input type="checkbox" ref={resolvedRef} {...rest} />
//       </>
//     )
//   }
// )
// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
})=> {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <GlobalContent>
    <FontAwesomeIcon className="icon" icon={faSearch} />
    <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Search ${count} records...`}
      />
  </GlobalContent>
  )
}

const Table = ({ columns, data }) => {
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow,
    page,// Prepare the row (this function needs to be called for each row before getting the row props)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    setFilter,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter },
  } = useTable({
    columns,
    data
  },
    useFilters,
    useGlobalFilter,
    usePagination,
    // useRowSelect,
    // hooks => {
    //   hooks.visibleColumns.push(columns => [
    //     //Let's make a column for selection
    //     {
    //       id: 'selection',
    //       // The header can use the table's getToggleAllRowsSelectedProps method
    //       // to render a checkbox
    //       Header: ({ getToggleAllPageRowsSelectedProps }) => (
    //         <div>
    //           <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
    //         </div>
    //       ),
    //       // The cell can use the individual row's getToggleRowSelectedProps method
    //       // to the render a checkbox
    //       Cell: ({ row }) => (
    //         <div>
    //           <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //         </div>
    //       ),
    //     },
    //     ...columns,
    //   ])
    // }
  );

  const [filterInput, setFilterInput] = useState("");

  // Update the state when input changes
  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("說明", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFilterInput(value);
  };


  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <>
      <SearchWrapper>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      </SearchWrapper>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <PageWrapper>
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        <FontAwesomeIcon className="icon" icon={faAngleDoubleLeft} />
        </Button>
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
        <FontAwesomeIcon className="icon" icon={faAngleLeft} />
        </Button>
        <span>
            {pageIndex + 1} of {pageOptions.length}
          </span>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
        <FontAwesomeIcon className="icon" icon={faAngleRight} />
        </Button>
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        <FontAwesomeIcon className="icon" icon={faAngleDoubleRight} />
        </Button>
          <PageContent>
          <FontAwesomeIcon className="icon" icon={faArrowRight} />
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
          />
        </PageContent>
        {/* <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select> */}
        {/* <pre>
          <code>
            {JSON.stringify(
              {
                selectedRowIds: selectedRowIds,
                'selectedFlatRows[].original': selectedFlatRows.map(
                  d => d.original
                ),
              },
              null,
              2
            )}
          </code>
        </pre> */}
        {/* <pre>
          <code>
            {JSON.stringify(
              {
                pageIndex,
                pageSize,
                pageCount,
                canNextPage,
                canPreviousPage,
              },
              null,
              2
            )}
          </code>
        </pre> */}
      </PageWrapper>
    </>
  );
}

const MTable = () => {
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
        Cell: ({ cell: { value } }) => <SourcePath values={value} />,

      },
      {
        Header: '比對文件',
        accessor: '比對文件',
        Cell: ({ cell: { value } }) => <SourcePath values={value} />,

      },
      {
        Header: '比對程序',
        accessor: '比對程序',
      },
      {
        Header: '比對結果查詢',
        accessor: '比對結果查詢',
        Cell: ({ cell: { value } }) => <DetailLink values={value} />,
      },
    ],
    []
  )

  const data = useMemo(() => makeData(1000), [])
  return (
    <Wrapper>
      <Table columns={columns} data={data} />
    </Wrapper>
  )
}

export default MTable;
