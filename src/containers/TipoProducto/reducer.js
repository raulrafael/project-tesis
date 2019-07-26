import { fromJS } from 'immutable';

import * as ACTIONS from './constants';

const initialState = fromJS({
	tipoProductoData: undefined,
});

export default function(state = initialState, action) {
	switch (action.type) {
		case ACTIONS.SET_TIPOPRODUCTO_DATA: {
			return state.set('data', action.datos);
		}
		case ACTIONS.ID_SELECTED_TIPOPRODUCTO: {
			return state.set('idSelected', action.id);
		}
		case ACTIONS.CREACION_REGISTRO_TIPOPRODUCTO: {
			return state.set('idSelected', action.erase);
		}
		default:
			return state;
	}
}
