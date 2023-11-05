import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./FireBase";

function CharacterDetails({ database, user, setCharacterData, collection }) {
  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const characterRef = doc(db, database, user, "character", "character", "details", collection);
        const characterSnap = await getDoc(characterRef);
       
        if (characterSnap.exists()) {
          const characterData = characterSnap.data();
          setCharacterData(characterData);
       
        } else {
          console.log("No character data found.");
        }
      } catch (error) {
        console.error("Error fetching character data:", error);
      }
    };

    fetchCharacterData();
  }, [collection, database, setCharacterData, user]);


}

export default CharacterDetails;
