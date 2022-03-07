import { React, useState, useMemo} from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faAngleRight,faAngleLeft,faAngleDoubleRight,faAngleDoubleLeft,faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Wrapper, SearchWrapper, GlobalContent,PageContent,PageWrapper, Button } from './MTable.styles'
//import makeData from './makeData'
import { Link } from "react-router-dom";

// const SourcePath = ({ values }) => {
//   // Loop through the array and create a badge-like component instead of a comma-separated string
//   return (
//     <>
//       {(
//         <Button key={values} className="badge" onClick={()=>console.log("click "+values)}>
//           download
//         </Button>
//       )
//       }
//     </>
//   );
// };
const DetailLink = ({ caseNo, createDTime}) => {
  // Loop through the array and create a badge-like component instead of a comma-separated string
  return (
    <>
      {(
        <Link to={`/${caseNo}/${createDTime}`}>
        <Button>
          go        <FontAwesomeIcon className="icon" icon={faArrowRight} />
        </Button>
        </Link>

      )
      }
    </>
  );
};
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
    //rows, // rows for the table based on the data passed
    prepareRow,
    page,// Prepare the row (this function needs to be called for each row before getting the row props)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, globalFilter },
  } = useTable({
    columns,
    data
  },
    useFilters,
    useGlobalFilter,
    usePagination,
  );
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
      </PageWrapper>
    </>
  );
}

const MTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: '案號',
        accessor: 'Vhno',
      },
      {
        Header: '建檔日期',
        accessor: 'CreateTime',
      },
      {
        Header: '立案人員',
        accessor: 'CreateEmp',
      },
      {
        Header: '公司別',
        accessor: 'Co',
      },
      {
        Header: '通知信箱',
        accessor: 'Email',

      },
      // {
      //   Header: '來源文件',
      //   accessor: 'SrcFileName',
      //   Cell: ({ cell }) => <SourcePath values={cell.row.values.SrcFileName} />,

      // },
      // {
      //   Header: '比對文件',
      //   accessor: 'RefFileName',
      //   Cell: ({ cell}) => <SourcePath values={cell.row.values.RefFileName} />,

      // },
      {
        Header: '比對程序',
        accessor: 'Result',
      },
      {
        Header: '比對結果查詢',
        Cell: ({ cell }) => <DetailLink caseNo={cell.row.values.Vhno} createDTime={cell.row.values.CreateTime.slice(0, 8)}  />,
      },
    ],
    []
  )

  const mainData = useMemo(() => data, [])
  return (
    <Wrapper>
      <Table columns={columns} data={mainData} />
    </Wrapper>
  )
}

export default MTable;
