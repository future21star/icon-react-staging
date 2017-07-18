import React, {Component, PropTypes} from 'react';
import {includes} from 'lodash';
import {connect} from "react-redux";
import {Menubar, NoAccess} from "../../components";

@connect(
	state => ({
		vaultAccess: state.authStore.user.vaultAccess
	})
)

export default (level) => (WrappedComponent) => {
	return class CheckAccessLevel extends Component {
		render() {
			const {vaultAccess} = this.props;
			let hasAccess = includes(vaultAccess, level);

			return (hasAccess ? <WrappedComponent {...this.props}/> : (
				<div>
					<Menubar
						className="gradient-turquoise menu-color-white"
						title="Sorry"
					/>
					<NoAccess/>
				</div>
			));
		}
	}
};