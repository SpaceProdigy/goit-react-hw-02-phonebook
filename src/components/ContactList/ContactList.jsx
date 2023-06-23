import { IoIosContact } from 'react-icons/io';
import { AiOutlineDelete } from 'react-icons/ai';
import PropTypes from 'prop-types';

import React from 'react';
import css from './ContactList.module.css';

export const ContactList = ({ arr, deleteContact }) => {
  return (
    <>
      {arr.length > 0 && (
        <ul className={css.contact}>
          {arr.map(({ id, name, number }) => (
            <li className={css.contactItem} key={id}>
              <IoIosContact className={css.contactIcon} />
              <div className={css.contactText}>
                {' '}
                {name}: {number}
              </div>

              <AiOutlineDelete
                onClick={() => deleteContact(id)}
                className={css.contactIcon}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

ContactList.propTypes = {
  arr: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
