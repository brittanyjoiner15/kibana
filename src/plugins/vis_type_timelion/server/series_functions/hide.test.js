/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import fn from './hide';

// Prefer importing individual modules, e.g. import get from "lodash/get"
// eslint-disable-next-line no-restricted-imports
import _ from 'lodash';
const expect = require('chai').expect;
import invoke from './helpers/invoke_series_fn.js';

describe('hide.js', () => {
  let seriesList;
  beforeEach(() => {
    seriesList = require('./fixtures/series_list.js')();
  });

  it('hides a series', () => {
    return invoke(fn, [seriesList, true]).then((r) => {
      _.each(r.output.list, (series) => expect(series._hide).to.equal(true));
    });
  });

  it('unhides a series', () => {
    return invoke(fn, [seriesList, false]).then((r) => {
      _.each(r.output.list, (series) => expect(series._hide).to.equal(false));
    });
  });
});
