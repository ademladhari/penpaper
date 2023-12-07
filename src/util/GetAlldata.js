import  { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./FireBase";

function OtherCharacterDetails({setCharacterData, collection,collection2 }) {
  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const characterRef = doc(db, 'database', 'all', collection, collection2);
        const characterSnap = await getDoc(characterRef);
       
        if (characterSnap.exists()) {
          const characterData = characterSnap.data();
          setCharacterData(characterData);
          console.log(characterData)
        } else {
          console.log("No character data found.");
        }
      } catch (error) {
        console.error("Error fetching character data:", error);
      }
    };

    fetchCharacterData();
  }, [collection, collection2]);


}

export default OtherCharacterDetails;
