import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '.';

const Pagination = (props) => {
  const { hasPrevPage, hasNextPage, prevPageLink, nextPageLink } = props;

  return (
    (hasPrevPage || hasNextPage) && (
      <div className="pagination">
        <Button
          rel={hasPrevPage ? 'prev' : null}
          type="default"
          route={hasPrevPage ? prevPageLink : null}
          disabled={!hasPrevPage}
        >
          Previous
        </Button>
        <Button
          rel={hasNextPage ? 'next' : null}
          type="default"
          route={hasNextPage ? nextPageLink : null}
          disabled={!hasNextPage}
        >
          Next
        </Button>
      </div>
    )
  );
};

Pagination.propTypes = {
  hasPrevPage: PropTypes.bool.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  prevPageLink: PropTypes.string.isRequired,
  nextPageLink: PropTypes.string.isRequired,
};

export default Pagination;
