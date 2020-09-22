/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

//Prefer importing entire lodash library, e.g. import { get } from "lodash"
// eslint-disable-next-line no-restricted-imports
import { getOr } from 'lodash/fp';
import React from 'react';
import { manageQuery } from '../../../common/components/page/manage_query';
import { TlsTable } from '../../components/tls_table';
import { useNetworkTls } from '../../containers/tls';
import { TlsQueryTableComponentProps } from './types';

const TlsTableManage = manageQuery(TlsTable);

export const TlsQueryTable = ({
  endDate,
  filterQuery,
  flowTarget,
  ip,
  setQuery,
  skip,
  startDate,
  type,
}: TlsQueryTableComponentProps) => {
  const [
    loading,
    { id, inspect, isInspected, tls, totalCount, pageInfo, loadPage, refetch },
  ] = useNetworkTls({
    endDate,
    filterQuery,
    flowTarget,
    ip,
    skip,
    startDate,
    type,
  });

  return (
    <TlsTableManage
      data={tls}
      id={id}
      inspect={inspect}
      isInspect={isInspected}
      fakeTotalCount={getOr(50, 'fakeTotalCount', pageInfo)}
      loading={loading}
      loadPage={loadPage}
      showMorePagesIndicator={getOr(false, 'showMorePagesIndicator', pageInfo)}
      refetch={refetch}
      setQuery={setQuery}
      totalCount={totalCount}
      type={type}
    />
  );
};

TlsQueryTable.displayName = 'TlsQueryTable';
