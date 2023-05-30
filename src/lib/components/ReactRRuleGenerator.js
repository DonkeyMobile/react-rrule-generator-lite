import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cloneDeep, set } from 'lodash';

import Start from './Start/index';
import Repeat from './Repeat/index';
import End from './End/index';
import computeRRuleToString from '../utils/computeRRule/toString/computeRRule';
import computeRRuleFromString from '../utils/computeRRule/fromString/computeRRule';
import configureInitialState from '../utils/configureInitialState';
import translateLabel from '../utils/translateLabel';
import translations from '../translations';
import '../styles/index.css';

const ReactRRuleGenerator = ({ id = null, value = '', config = {}, onChange = () => {}, calendarComponent = null, translations = translations.english }) => {
  const [state, setState] = useState(() => configureInitialState(config, calendarComponent, id, value));

  useEffect(() => {
    if (value) {
      const data = computeRRuleFromString(state.data, value);
      setState(prevState => ({ ...prevState, data }));
    }
  }, [value]);

  const handleChange = ({ target }) => {
    const newData = cloneDeep(state.data);
    set(newData, target.name, target.value);

    const rrule = computeRRuleToString(newData);

    setState(prevState => ({ ...prevState, data: newData }));
    onChange(rrule);
  };

  const startDate = new Date(state.data.start.onDate.date);
  return (
    <div>
      {!state.data.options.hideError && state.data.error && (
        <div className="alert alert-danger">
          {translateLabel(translations, 'invalid_rrule', { value: state.data.error.value })}
        </div>
      )}

      <div className="px-0 pt-3 border rounded">
        {!state.data.options.hideStart && (
          <div>
            <Start
              id={`${state.id}-start`}
              start={state.data.start}
              handleChange={handleChange}
              translations={translations}
            />
            <hr />
          </div>
        )}

        <div>
          <Repeat
            id={`${state.id}-repeat`}
            repeat={state.data.repeat}
            handleChange={handleChange}
            translations={translations}
            startDate={startDate}
          />
        </div>

        {!state.data.options.hideEnd && (
          <div>
            <hr />
            <End
              id={`${state.id}-end`}
              end={state.data.end}
              handleChange={handleChange}
              translations={translations}
            />
          </div>
        )}
      </div>
    </div>
  );
}

ReactRRuleGenerator.propTypes = {
  id: PropTypes.string,
  config: PropTypes.shape({
    frequency: PropTypes.arrayOf(PropTypes.oneOf(['Yearly', 'Monthly', 'Weekly', 'Daily', 'Hourly'])),
    yearly: PropTypes.oneOf(['on','on the']),
    monthly: PropTypes.oneOf(['on', 'on the']),
    end: PropTypes.arrayOf(PropTypes.oneOf(['Never', 'After', 'On date'])),
    hideStart: PropTypes.bool,
    hideEnd: PropTypes.bool,
    hideError: PropTypes.bool,
    weekStartsOnSunday: PropTypes.bool,
  }),
  value: PropTypes.string,
  onChange: PropTypes.func,
  calendarComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  translations: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ReactRRuleGenerator.defaultProps = {
  id: null,
  value: '',
  config: {},
  onChange() {},
  calendarComponent: null,
  translations: translations.english,
};

export default ReactRRuleGenerator;
