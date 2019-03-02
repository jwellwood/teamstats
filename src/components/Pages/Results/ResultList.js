import React from 'react';
import PropTypes from 'prop-types';
// MUI
import Spinner from '../../layout/Warnings/Spinner';
// Components
import ResultCard from './Result/ResultsCard/ResultCard';

const ResultList = props => {
  const { results, teamName } = props;
  if (results) {
    return results.map(result => (
      <ResultCard key={result.id} result={result} teamName={teamName} />
    ));
  }
  if (results.length === 0) return <div>Start adding results!</div>;
  return <Spinner />;
};

ResultList.propTypes = {
  results: PropTypes.instanceOf(Array),
  teamName: PropTypes.string,
};

ResultList.defaultProps = { results: [], teamName: '' };

export default ResultList;
