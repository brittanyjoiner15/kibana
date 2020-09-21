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

// Prefer importing individual modules, e.g. import get from "lodash/get"
// eslint-disable-next-line no-restricted-imports
import _ from 'lodash';

export function unset(object, rawPath) {
  if (!object) return;
  const path = _.toPath(rawPath);

  switch (path.length) {
    case 0:
      return;

    case 1:
      delete object[rawPath];
      break;

    default:
      const leaf = path.pop();
      const parentPath = path.slice();
      const parent = _.get(object, parentPath);
      unset(parent, leaf);
      if (!_.size(parent)) {
        unset(object, parentPath);
      }
      break;
  }
}
