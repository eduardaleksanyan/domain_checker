import React from 'react'
import moment from 'moment'

export const DateDomain = ({ date }) => {

  let start = moment();
  let end = moment(date);
  let days = end.diff(start, "days");

  return (
    <span className="float-right mr-20">
      {
        days < 0 
        ? <span className="text-danger">Expired</span>
        : <span className="text-success">Will expire after {days} days</span>
      }

      <span className="ml-2 small">({end.format('LL')})</span>
    </span>
  )
}
