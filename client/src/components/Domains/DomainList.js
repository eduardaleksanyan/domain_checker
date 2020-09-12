import React from 'react';
import { DateDomain } from './DateDomain';

const DomainList = ({ domains, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className="list-group mb-4">
      {domains.map(domain => (
        <li key={domain.id} className="list-group-item">
          <span className="mr-3">
            {domain.name}
          </span>

          {domain.is_valid
            ? <span className="badge badge-success small">Is Valid</span>
            : <span className="badge badge-danger small">NOT Valid</span>
          }

          <DateDomain date={domain.date} />
        </li>
      ))}
    </ul>
  );
};

export default DomainList;
