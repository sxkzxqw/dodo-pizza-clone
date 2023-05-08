import React, { FC } from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: FC = () => {
    return (
        <div className={styles.root}>
            <span className={styles.span}>😕</span>
            <br />
            <h1>Ничего не найдено</h1>
            <p className={styles.description}>К сожалению данная страница остуствует в нашем интернет-магазине</p>
        </div>
    );
};

export default NotFoundBlock;