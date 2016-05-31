export default function({ dispatch }) {
  return next => action => {
    if(!action.payload || !action.payload.then) {
      return next(action);
    }
    //upewnij sie ze obietnica została rozwiązana
    action.payload
      .then(function(response) {
        //wez wszystko co jest w action i wstaw za payload 'response' - odpowiedź
        const newAction = { ...action, payload: response }
        //wyślij akcję znowu do wszystkich middlewares
        dispatch(newAction);
      });
  }
}
