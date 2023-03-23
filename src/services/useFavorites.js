import { useEffect, useReducer } from "react";


function useFavorites(itemName, initialValue){
  const [state, dispatch] = useReducer(reducer, initialState({initialValue}))
  const{
    items,
    loading,
    error
  } = state;  

  const onError =(error)=>{dispatch({type:actionTypes.error, payload: error})}
  const onSuccess =(itemParsed)=>{dispatch({type:actionTypes.success, payload: itemParsed})}
  const onSave=(newItem)=>{dispatch({type:actionTypes.save, payload: newItem})}

  useEffect(()=>{
    try {
      const localStorageItem = localStorage.getItem(itemName);
      let itemParsed;
      if(!localStorageItem){
        localStorage.setItem(itemName, JSON.stringify(initialValue));
        itemParsed = initialValue;
      }else{
        itemParsed = JSON.parse(localStorageItem)
        // console.log(itemParsed);
      }
      onSuccess(itemParsed)
    } catch (error) {
      onError(error)
    }
  }, [loading])

  const unsaveItem = (item)=>{
    const stgItem = JSON.stringify(item);
    const deleteindex = items.indexOf(stgItem)
    // console.log(deleteindex);
    items.splice(deleteindex, 1);
    localStorage.setItem(itemName, JSON.stringify(items))
    onSave(item)
  }

  const saveItem = (newItem)=>{
    try {
      // console.log('items',items);
      const stgItem = JSON.stringify(newItem);
      items.push(stgItem);
      localStorage.setItem(itemName, JSON.stringify(items))
      onSave(newItem)
    } catch (error) {
      onError(error)
    }
  }

  return {items, loading, error, saveItem, unsaveItem}
}

const actionTypes={
  error:'ERROR',
  success:'SUCCESS',
  save:'SAVE'
}

const reducer = (state, action)=>{
  return reducerObject(state, action.payload)[action.type] || state;
}
const initialState = ({initialValue})=> ({
  error: false,
  loading: true,
  item: initialValue,
})

const reducerObject = (state, payload)=>({
  [actionTypes.error]:{
    ...state,
    error : true,
  },
  [actionTypes.success]:{
    ...state,
    error:false,
    loading:false,
    items:payload
  },
  [actionTypes.save]:{
    ...state,
    loading:true,
    items: payload
  }
})

export default useFavorites;