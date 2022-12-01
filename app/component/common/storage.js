import AsyncStorage from "@react-native-async-storage/async-storage"


 export const getStoredValue = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('root')
      let returnval = jsonValue != null ? JSON.parse(jsonValue) : null;
      if(returnval == null){
        setStoredValue({name:"Mettexlab"})
      } 
      return returnval;
    } catch(e) {}
  
  }


  export const setStoredValue = async (value) => {
    try {
      let previousValue = await getStoredValue();
      previousValue = {...previousValue, ...value};
      const jsonValue = JSON.stringify(previousValue)
      await AsyncStorage.setItem('root', jsonValue)
    } catch(e) {}
  
  }

  
  