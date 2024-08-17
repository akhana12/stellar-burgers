import { FC, memo } from 'react';

import styles from './modal.module.css';

import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { TModalUIProps } from './type';
import { ModalOverlayUI } from '@ui';
import { SELECTORS } from '../../../../cypress/support/SELECTORS';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children }) => (
    <>
      <div data-testid={SELECTORS.MODAL} className={styles.modal}>
        <div className={styles.header}>
          <h3 className={`${styles.title} text text_type_main-large`}>
            {title}
          </h3>
          <button
            data-testid={SELECTORS.MODAL_CLOSE_BUTTON}
            className={styles.button}
            type='button'
          >
            <CloseIcon type='primary' onClick={onClose} />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlayUI onClick={onClose} />
    </>
  )
);
