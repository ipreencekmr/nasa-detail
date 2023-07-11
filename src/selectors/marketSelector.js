import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

export const localeSelector = (state) => state.getIn(['intl', 'activeLocale']);
export const languageDataSelector = (state, localeName, moduleName) => state.getIn(['intl', 'languagePacks', localeName, moduleName], fromJS({}));

export const getLocaleSelector = createSelector(
  localeSelector,
  (locale) => locale
);

export const getLanguageDataSelector = createSelector(
  languageDataSelector,
  (languagePack) => languagePack?.toJS()?.data || {}
);
