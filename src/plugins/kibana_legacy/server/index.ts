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

import {
  ConfigDeprecationLogger,
  CoreSetup,
  CoreStart,
  PluginConfigDescriptor,
} from 'kibana/server';
import { get } from 'lodash';
import { configSchema, ConfigSchema } from '../config';

export const config: PluginConfigDescriptor<ConfigSchema> = {
  exposeToBrowser: {
    defaultAppId: true,
  },
  schema: configSchema,
  deprecations: ({ renameFromRoot }) => [
    // TODO: Remove deprecation once defaultAppId is deleted
    renameFromRoot('kibana.defaultAppId', 'kibana_legacy.defaultAppId', true),
    (completeConfig: Record<string, any>, rootPath: string, log: ConfigDeprecationLogger) => {
      if (
        get(completeConfig, 'kibana.defaultAppId') === undefined &&
        get(completeConfig, 'kibana_legacy.defaultAppId') === undefined
      ) {
        return completeConfig;
      }
      log(
        `kibana.defaultAppId is deprecated and will be removed in 8.0. Please use the \`defaultRoute\` advanced setting instead`
      );
      return completeConfig;
    },
  ],
};

class Plugin {
  public setup(core: CoreSetup) {}

  public start(core: CoreStart) {}
}

export const plugin = () => new Plugin();
