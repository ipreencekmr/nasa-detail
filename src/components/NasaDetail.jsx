import React from 'react';
import PropTypes from 'prop-types';
import { loadLanguagePack, updateLocale } from '@americanexpress/one-app-ducks';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { MarsRover } from './MarsRover';
import { Asteroids } from './Asteroids';
import { DonkiNotif } from './DonkiNotif';
import { getLanguageDataSelector, getLocaleSelector } from '../selectors/marketSelector';
import { MODULE_NAME } from '../constants/module';

export const NasaDetail = ({ languageData, localeName, params }) => {
  const { id } = params || {};

  const renderComponent = (detailId) => {
    switch (detailId) {
      case 'mro':
        return <MarsRover />;
      case 'neo':
        return <Asteroids />;
      case 'donki':
        return <DonkiNotif />;
      default:
        return <DonkiNotif />;
    }
  };

  if (languageData.greeting) {
    return (
      <IntlProvider locale={localeName} messages={languageData}>
        {renderComponent(id)}
      </IntlProvider>
    );
  }
  return null;
};

NasaDetail.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
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
    await dispatch(loadLanguagePack(MODULE_NAME, { fallbackLocale: 'en-US' }));
  },
});

export const mapStateToProps = (state, ownProps) => ({
  languageData: getLanguageDataSelector(state, ownProps.locale, MODULE_NAME),
  localeName: getLocaleSelector(state),
});

export const loadModuleData = ({ store: { dispatch } }) => dispatch(loadLanguagePack(MODULE_NAME, { fallbackLocale: 'en-US' }));

NasaDetail.holocron = {
  name: MODULE_NAME,
  loadModuleData,
};

export default connect(mapStateToProps, mapDispatchToProps)(NasaDetail);
