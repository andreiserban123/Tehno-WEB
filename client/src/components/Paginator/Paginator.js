import './Paginator.css'
import React, { useState } from 'react'

const Paginator = (props) => {
  const { onPageChange, onPageSizeChange, totalRecords } = props
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  return (
    <div className='paginator'>
      <div className='navigators'>
        <button onClick={() => {
          if (page > 1) {
            setPage(page - 1)
            onPageChange(page - 1)
          }
        }}>Previous</button>
        <button onClick={() => {
          if (page < Math.ceil(totalRecords / pageSize)) {
            setPage(page + 1)
            onPageChange(page + 1)
          }
        }}>Next</button>
      </div>
      <label>
        Page Size:
        <input type='number' value={pageSize} onChange={e => {
            setPageSize(e.target.value)
            onPageSizeChange(e.target.value)
          }
        } />
      </label>
    </div>
  )
}

export default Paginator