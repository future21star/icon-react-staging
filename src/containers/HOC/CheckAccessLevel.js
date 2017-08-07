import React, {Component, PropTypes} from 'react';
import {includes} from 'lodash';
import {connect} from "react-redux";
import {Menubar, NoAccessSubscriptionUpgradeCard} from "../../components";

@connect(
	state => ({
		vaultAccess: state.authStore.user ? state.authStore.user.vaultAccess : []
	})
)

export default (level) => (WrappedComponent) => {
	return class CheckAccessLevel extends Component {
		render() {
			const {vaultAccess} = this.props;
			let hasAccess = false;
			if (this.props.params.type && this.props.params.type === 'podcast') {
				hasAccess = true;
			} else {
				hasAccess = includes(vaultAccess, level);
			}

			return (hasAccess ? <WrappedComponent {...this.props}/> : (
				<div>
					<Menubar
						className="gradient-turquoise menu-color-white"
						title="Sorry"
						backButton={true}
					/>
					<NoAccessSubscriptionUpgradeCard permissionName={level}/>
				</div>
			));
		}
	}
};
