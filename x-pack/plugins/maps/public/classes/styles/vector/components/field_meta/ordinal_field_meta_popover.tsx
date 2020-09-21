/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
/* eslint-disable @typescript-eslint/consistent-type-definitions */

// Prefer importing individual modules, e.g. import get from "lodash/get"
// eslint-disable-next-line no-restricted-imports
import _ from 'lodash';
import React, { ChangeEvent, Fragment, MouseEvent } from 'react';
import { EuiFormRow, EuiRange, EuiSwitch, EuiSwitchEvent } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import { DEFAULT_SIGMA } from '../../vector_style_defaults';
import { FieldMetaPopover } from './field_meta_popover';
import { FieldMetaOptions } from '../../../../../../common/descriptor_types';
import { VECTOR_STYLES } from '../../../../../../common/constants';

function getIsEnableToggleLabel(styleName: string) {
  switch (styleName) {
    case VECTOR_STYLES.FILL_COLOR:
    case VECTOR_STYLES.LINE_COLOR:
      return i18n.translate('xpack.maps.styles.fieldMetaOptions.isEnabled.colorLabel', {
        defaultMessage: 'Calculate color ramp range from indices',
      });
    case VECTOR_STYLES.LINE_WIDTH:
      return i18n.translate('xpack.maps.styles.fieldMetaOptions.isEnabled.widthLabel', {
        defaultMessage: 'Calculate border width range from indices',
      });
    case VECTOR_STYLES.ICON_SIZE:
      return i18n.translate('xpack.maps.styles.fieldMetaOptions.isEnabled.sizeLabel', {
        defaultMessage: 'Calculate symbol size range from indices',
      });
    default:
      return i18n.translate('xpack.maps.styles.fieldMetaOptions.isEnabled.defaultLabel', {
        defaultMessage: 'Calculate symbolization range from indices',
      });
  }
}

type Props = {
  fieldMetaOptions: FieldMetaOptions;
  styleName: VECTOR_STYLES;
  onChange: (fieldMetaOptions: FieldMetaOptions) => void;
  switchDisabled: boolean;
};

export function OrdinalFieldMetaPopover(props: Props) {
  const onIsEnabledChange = (event: EuiSwitchEvent) => {
    props.onChange({
      ...props.fieldMetaOptions,
      isEnabled: event.target.checked,
    });
  };

  const onSigmaChange = (event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>) => {
    props.onChange({
      ...props.fieldMetaOptions,
      sigma: parseInt(event.currentTarget.value, 10),
    });
  };

  return (
    <FieldMetaPopover>
      <Fragment>
        <EuiFormRow display="columnCompressedSwitch">
          <EuiSwitch
            label={getIsEnableToggleLabel(props.styleName)}
            checked={props.fieldMetaOptions.isEnabled}
            onChange={onIsEnabledChange}
            compressed
            disabled={props.switchDisabled}
          />
        </EuiFormRow>

        <EuiFormRow
          label={i18n.translate('xpack.maps.styles.fieldMetaOptions.sigmaLabel', {
            defaultMessage: 'Sigma',
          })}
          display="columnCompressed"
        >
          <EuiRange
            min={1}
            max={5}
            step={0.25}
            value={_.get(props.fieldMetaOptions, 'sigma', DEFAULT_SIGMA)}
            onChange={onSigmaChange}
            disabled={!props.fieldMetaOptions.isEnabled}
            showTicks
            tickInterval={1}
            compressed
          />
        </EuiFormRow>
      </Fragment>
    </FieldMetaPopover>
  );
}
