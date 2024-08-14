interface CarbonFootprintState {
    house: number;
    flight: number;
    car: number;
    motorbike: number;
    busRail: number;
  }
  
  interface Action {
    type: string;
    payload: number;
  }
  
  const initialState: CarbonFootprintState = {
    house: 0,
    flight: 0,
    car: 0,
    motorbike: 0,
    busRail: 0,
  };
  
  export const carbonFootprintReducer = (state = initialState, action: Action): CarbonFootprintState => {
    switch (action.type) {
      case 'UPDATE_HOUSE':
        return { ...state, house: action.payload };
      case 'UPDATE_FLIGHT':
        return { ...state, flight: action.payload };
      case 'UPDATE_CAR':
        return { ...state, car: action.payload };
      case 'UPDATE_MOTORBIKE':
        return { ...state, motorbike: action.payload };
      case 'UPDATE_BUSRAIL':
        return { ...state, busRail: action.payload };
      default:
        return state;
    }
  };
  