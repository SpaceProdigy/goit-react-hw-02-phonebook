import React from 'react';
import PropTypes from 'prop-types';

import css from './Filter.module.css';

export const Filter = ({ value, onChange }) => {
  return (
    <div className={css.filter}>
      {' '}
      <label className={css.label}>
        {' '}
        Find contacts by name
        <input
          className={css.input}
          value={value}
          onChange={onChange}
          type="text"
          name="filter"
          maxLength={20}
        />
      </label>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
