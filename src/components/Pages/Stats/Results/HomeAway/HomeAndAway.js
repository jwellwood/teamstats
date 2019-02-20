import React from 'react';
import PropTypes from 'prop-types';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import {
  getAllWins,
  getAllDraws,
  getAllLosses,
  getGoalsFor,
  getGoalsAgainst,
  perGame,
  getPointsPer,
} from '../../../../../functions/Results/functions';
import StatsHeader from '../../../../layout/Stats/StatsHeader';
import ForfeitButton from '../forfeitButton';

const HomeAndAway = props => {
  const { homeResults, awayResults, checked, handleChange, value } = props;
  const totalPlayedHome = homeResults.length;
  const totalPlayedAway = awayResults.length;
  const homeWins = getAllWins(homeResults).length;
  const homeDraws = getAllDraws(homeResults).length;
  const homeLosses = getAllLosses(homeResults).length;
  const homeGoals = getGoalsFor(homeResults);
  const homeGoalsAgainst = getGoalsAgainst(homeResults);
  const homeGoalsPerGame = perGame(homeGoals, totalPlayedHome);
  const homeGoalsAgainstPerGame = perGame(homeGoalsAgainst, totalPlayedHome);

  const awayWins = getAllWins(awayResults).length;
  const awayDraws = getAllDraws(awayResults).length;
  const awayLosses = getAllLosses(awayResults).length;
  const awayGoals = getGoalsFor(awayResults);
  const awayGoalsAgainst = getGoalsAgainst(awayResults);
  const awayGoalsPerGame = perGame(awayGoals, totalPlayedAway);
  const awayGoalsAgainstPerGame = perGame(awayGoalsAgainst, totalPlayedAway);

  const goalDiffHome = homeGoals - homeGoalsAgainst;
  const goalDiffAway = awayGoals - awayGoalsAgainst;
  const goalDiffHomePerGame = perGame(goalDiffHome, totalPlayedHome);
  const goalDiffAwayPerGame = perGame(goalDiffAway, totalPlayedAway);
  const pointsHomePerGame = getPointsPer(homeWins, homeDraws, totalPlayedHome);
  const pointsAwayPerGame = getPointsPer(awayWins, awayDraws, totalPlayedAway);
  // Data to map
  let id = 0;
  const arrow = '-';
  // eslint-disable-next-line no-shadow
  function createData(statName, home, arrow, away) {
    id += 1;
    if (+home > +away) {
      // eslint-disable-next-line no-param-reassign
      arrow = <i style={{ color: '#222' }} className="fas fa-arrow-circle-left" />;
    } else if (+home < +away) {
      // eslint-disable-next-line no-param-reassign
      arrow = <i className="fas fa-arrow-circle-right" />;
    }
    return { id, statName, home, arrow, away };
  }

  const data = [
    createData('Played', totalPlayedHome, arrow, totalPlayedAway),
    createData('Won', homeWins, arrow, awayWins),
    createData('Drawn', homeDraws, arrow, awayDraws),
    createData('Lost', homeLosses, arrow, awayLosses),
    createData('Scored', homeGoals, arrow, awayGoals),
    createData('Conceded', homeGoalsAgainst, arrow, awayGoalsAgainst),
    createData('Goal difference', goalDiffHome, arrow, goalDiffAway),
    createData('goals / game', homeGoalsPerGame, arrow, awayGoalsPerGame),
    createData('conceded / game', homeGoalsAgainstPerGame, arrow, awayGoalsAgainstPerGame),
    createData('difference / game', goalDiffHomePerGame, arrow, goalDiffAwayPerGame),
    createData('points / game', pointsHomePerGame, arrow, pointsAwayPerGame),
  ];

  const columns = [
    {
      Header: '',
      accessor: 'statName',
      style: { fontWeight: 'bold', textAlign: 'left' },
      sortable: false,
      resizable: false,
    },
    {
      Header: 'Home',
      accessor: 'home',
      width: 60,
      style: { backgroundColor: '#d32f2f', color: '#fff', fontWeight: 'bold' },
      sortable: false,
      resizable: false,
    },
    {
      Header: '',
      accessor: 'arrow',
      width: 30,
      style: { backgroundColor: '#d32f2f', color: '#fff', fontWeight: 'bold' },
      sortable: false,
      resizable: false,
    },
    {
      Header: 'Away',
      accessor: 'away',
      width: 60,
      style: { backgroundColor: '#d32f2f', color: '#fff', fontWeight: 'bold' },
      sortable: false,
      resizable: false,
    },
  ];

  return (
    <div>
      <StatsHeader title="Home vs Away" />
      <ForfeitButton checked={checked} handleChange={handleChange} value={value} />
      <div style={{ margin: '10px' }}>
        <ReactTable
          data={data}
          columns={columns}
          showPagination={false}
          minRows={1}
          className="-striped"
          getTheadThProps={() => ({ style: { backgroundColor: '#9a0007', color: '#fff' } })}
          getTheadGroupThProps={() => ({
            style: {
              backgroundColor: '#9a0007',
              color: '#fff',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              textAlign: 'left',
            },
          })}
          getTdProps={() => ({
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            },
          })}
        />
      </div>
    </div>
  );
};
HomeAndAway.propTypes = {
  homeResults: PropTypes.instanceOf(Array).isRequired,
  awayResults: PropTypes.instanceOf(Array).isRequired,
};

export default HomeAndAway;