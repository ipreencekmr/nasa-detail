import React from 'react';
import PropTypes from 'prop-types';
import { loadLanguagePack, updateLocale } from '@americanexpress/one-app-ducks';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { MarsRover } from './MarsRover';
import { Asteroids } from './Asteroids';
import { DonkiNotif } from './DonkiNotif';

export const NasaDetail = ({ languageData, localeName, params }) => {
  const { id } = params || {};

  if (languageData.greeting) {
    return (
      <IntlProvider locale={localeName} messages={languageData}>
        {id==='mro'?<MarsRover />:(id==='neo'?<Asteroids />:<DonkiNotif />)}
      </IntlProvider>
    );
  }
  return null;
};

NasaDetail.propTypes = {
  params: PropTypes.string,
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  languageData: PropTypes.shape({
    greeting: PropTypes.string.isRequired,
  }).isRequired,
  localeName: PropTypes.string.isRequired,
};

export const mapDispatchToProps = (dispatch) => ({
  switchLanguage: async ({ target }) => {
    await dispatch(updateLocale(target.value));
    await dispatch(loadLanguagePack('nasa-detail', { fallbackLocale: 'en-US' }));
  },
});

export const mapStateToProps = (state) => {
  const localeName = state.getIn(['intl', 'activeLocale']);
  const languagePack = state.getIn(
    ['intl', 'languagePacks', localeName, 'nasa-detail'],
    fromJS({})
  ).toJS();

  return {
    languageData: languagePack && languagePack.data ? languagePack.data : {},
    localeName,
  };
};

export const loadModuleData = ({ store: { dispatch } }) => dispatch(loadLanguagePack('nasa-detail', { fallbackLocale: 'en-US' }));

NasaDetail.holocron = {
  name: 'nasa-detail',
  loadModuleData,
};

export default connect(mapStateToProps, mapDispatchToProps)(NasaDetail);
