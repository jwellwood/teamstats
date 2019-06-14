import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
// Components
import Container from '../../layout/hoc/Container';
import PageHeader from '../../layout/Navs/PageHeader';
import SquadList from './List/SquadList';
import SquadTotals from './Totals/SquadTotals';

const Players = props => {
  const { players, results } = props;
  const totalMatches = results.filter(result => !result.forfeitedMatch);
  return (
    <Container>
      <PageHeader title="Squad" icon="" link="/" />
      <SquadTotals players={players} results={totalMatches} allGames={results} />
      <SquadList players={players} results={totalMatches} allGames={results} />
    </Container>
  );
};

Players.propTypes = {
  firestore: PropTypes.shape({}).isRequired,
  players: PropTypes.instanceOf(Array),
  results: PropTypes.instanceOf(Array),
};

Players.defaultProps = { players: [], results: [] };

export default compose(
  firestoreConnect([
    { collection: 'players', orderBy: ['apps', 'desc'] },
    { collection: 'results' },
  ]),
  // eslint-disable-next-line no-unused-vars
  connect((state, props) => ({
    players: state.firestore.ordered.players,
    results: state.firestore.ordered.results,
  })),
)(Players);
