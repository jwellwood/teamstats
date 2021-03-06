import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Components
import Overall from './Sections/Overall/Overall';
import GoalStats from './Sections/GoalStats/GoalStats';
import HomeAndAway from './Sections/HomeAndAway/HomeAndAway';
import ByMonth from './Sections/ByMonth/ByMonth';
import BoxContainer from '../../../layout/hoc/BoxContainer';
// functions

import {
  getResultsWithoutForfeits,
  getAllWins,
  getAllDraws,
  getAllLosses,
  getGoalsFor,
  getGoalsAgainst,
  getAllHomeMatches,
  getAllAwayMatches,
} from '../../../../functions/Results/functions';
import SecondaryTabs from '../../../layout/Stats/SecondaryTabs';

class ResultsStats extends Component {
  state = { includeForfeits: true };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { results } = this.props;
    const { includeForfeits } = this.state;
    const teamResults = !includeForfeits
      ? getResultsWithoutForfeits(results)
      : results;
    const homeResults = getAllHomeMatches(teamResults);
    const awayResults = getAllAwayMatches(teamResults);
    const totalMatches = teamResults.length;
    const totalWins = getAllWins(teamResults).length;
    const totalDraws = getAllDraws(teamResults).length;
    const totalLosses = getAllLosses(teamResults).length;
    const totalGoalsFor = getGoalsFor(teamResults);
    const totalGoalsAgainst = getGoalsAgainst(teamResults);

    const matchTotals = {
      totalMatches,
      totalWins,
      totalDraws,
      totalLosses,
      totalGoalsFor,
      totalGoalsAgainst,
    };

    const tabTitles = [
      { id: 1, icon: 'list-ul' },
      { id: 2, icon: 'futbol' },
      { id: 3, icon: 'store-alt' },
      { id: 4, icon: 'chart-line' },
    ];
    const tabContent = [
      {
        id: 1,
        content: (
          <Overall
            matchTotals={matchTotals}
            handleChange={this.handleChange('includeForfeits')}
            checked={includeForfeits}
            value='includeforfeits'
          />
        ),
      },
      {
        id: 2,
        content: (
          <GoalStats
            results={teamResults}
            handleChange={this.handleChange('includeForfeits')}
            checked={includeForfeits}
            value='includeforfeits'
          />
        ),
      },
      {
        id: 3,
        content: (
          <HomeAndAway
            homeResults={homeResults}
            awayResults={awayResults}
            handleChange={this.handleChange('includeForfeits')}
            checked={includeForfeits}
            value='includeforfeits'
          />
        ),
      },
      {
        id: 4,
        content: (
          <ByMonth
            results={teamResults}
            handleChange={this.handleChange('includeForfeits')}
            checked={includeForfeits}
            value='includeforfeits'
          />
        ),
      },
    ];

    return (
      <SecondaryTabs tabTitles={tabTitles}>
        {tabContent.map(content => (
          <BoxContainer key={content.id}>{content.content}</BoxContainer>
        ))}
      </SecondaryTabs>
    );
  }
}

ResultsStats.propTypes = { results: PropTypes.instanceOf(Array).isRequired };

export default ResultsStats;
