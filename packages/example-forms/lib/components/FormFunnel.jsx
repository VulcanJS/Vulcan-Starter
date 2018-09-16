import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent } from 'meteor/vulcan:core';

const funnel = ['lead', 'prospect', 'customer'];

class FormFunnel extends PureComponent {
  update = stage => {
    this.context.updateCurrentValues({ [this.props.path]: stage });
  };

  render() {
    return (
      <div className="form-group row form-funnel">
        <label className="control-label col-sm-3">{this.props.label}</label>
        <div className="col-sm-9">
          <ul className="form-funnel-wrapper">
            {funnel.map((stage, i) => (
              <li key={i}>
                <Components.Button
                  onClick={() => {
                    this.update(stage);
                  }}
                  variant={this.props.value === stage ? 'primary' : 'default'}
                >
                  {stage}
                </Components.Button>
                {i < funnel.length - 1 && <div className="form-funnel-separator">▶</div>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

FormFunnel.contextTypes = {
  updateCurrentValues: PropTypes.func,
};

registerComponent({ name: 'FormFunnel', component: FormFunnel });
