import React, { useState, useEffect } from 'react';
import DomainList from './DomainList';
import ReactPaginate from 'react-paginate';
import { PAGE_COUNT } from '../../common/constants';
import { DoaminApi } from '../../api/api';

export default function Domains() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const fetchDomains = async (page) => {
    setLoading(true);
    const response = await DoaminApi.getDomains(page, PAGE_COUNT);
    setDomains(response.data);
    setLoading(false);
  };

  useEffect(() => {
    const getDomainsCount = async () => {
      const response = await DoaminApi.getDomainCount();
      setPageCount(response.data.count / PAGE_COUNT);
    };

    fetchDomains(0);
    getDomainsCount();

  }, []);

  function handlePageChange(data) {
    fetchDomains(data.selected);
  }

  return (
    <div className="container">

      <div className="mt-3">
        <h1 className="text-primary mb-3">Domain List</h1>
        <DomainList domains={domains} loading={loading} />
      </div>
      <div className="float-right">
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          previousLinkClassName={'page-link'}
          activeClassName={'page-item active'}
          disabledClassName={'page-item disabled'}
          activeLinkClassName={'page-link'}
          pageLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          breakLinkClassName={'page-link'}
        />
      </div>
    </div>
  );
}
