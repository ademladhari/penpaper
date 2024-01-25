import { doc, getDoc } from "firebase/firestore";
import { db } from "./FireBase";

export async function GetCharacterDetails({  user, collection,group }) {
      try {
        const characterRef = doc(db, 'database','groups',group, user,  "character", collection);
        const characterSnap = await getDoc(characterRef);
        if (characterSnap.exists()) {
          const characterData = characterSnap.data();
          console.log(characterData)
          return characterData
        
        } else {
          console.log("No character data found.",collection);
        }
      } catch (error) {
        console.error("Error fetching character data:", error);
      }}




export async function GetWeaponsData({  user, collection,group }) {
        try {
          const characterRef = doc(db, 'database','groups',group, user, "weapons", collection);
          const characterSnap = await getDoc(characterRef);
          if (characterSnap.exists()) {
            const characterData = characterSnap.data();
            console.log(characterData)
            return characterData
          
          } else {
            console.log("No character data found.",collection);
          }
        } catch (error) {
          console.error("Error fetching character data:", error);
        }
    

   


}
export async function GetInventoryData({  user,group }) {
  try {
    const characterRef = doc(db, 'database','groups',group, user, "inventory", "inventory");
    const characterSnap = await getDoc(characterRef);
    if (characterSnap.exists()) {
      const characterData = characterSnap.data();
      console.log(characterData)
      return characterData
    
    } else {
      console.log("No inventory data found.");
    }
  } catch (error) {
    console.error("Error fetching inventory data:", error);
  }





}
export async function GetSpiritsData({  user,group }) {
  try {
    const characterRef = doc(db, 'database','groups',group, user, "spirits", "spirits");
    const characterSnap = await getDoc(characterRef);
    if (characterSnap.exists()) {
      const characterData = characterSnap.data();
      return characterData
    
    } else {
      console.log("No inventory data found.");
    }
  } catch (error) {
    console.error("Error fetching inventory data:", error);
  }





}

