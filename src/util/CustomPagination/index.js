import React from 'react';
import {Pagination} from 'react-native-swiper-flatlist';
import styles from './styles';

export const CustomPagination = props => {
  return (
    <Pagination
      {...props}
      paginationStyle={styles.paginationContainer}
      paginationStyleItem={styles.pagination}
      paginationDefaultColor="grey"
      paginationActiveColor="#8085FF"
    />
  );
};
