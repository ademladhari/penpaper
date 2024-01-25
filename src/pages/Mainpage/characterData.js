const CharacterData = ({ isLoading, data }) => {
    return (
      <div className='bg-[#798EC8] h-[30%] my-[2%] rounded-3xl'>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <>
            <h1 className='text-xl pl-[2%] pt-[2%]'>Alter: {data.alter}</h1>
            <h1 className='text-xl pl-[2%]'>Geburtstag: {data.geburtstag}</h1>
            <h1 className='text-xl pl-[2%]'>Rasse: {data.rasse}</h1>
            <h1 className='text-xl pl-[2%]'>ursprunglsas: {data.ursprungisas}</h1>
            <h1 className='text-xl pl-[2%]'>sprachen : {data.sprachen}</h1>
            <h1 className='text-xl pl-[2%]'>blossom rank : {data.blossomRank}</h1>
          </>
        )}
      </div>
    );
  };
  
  export default CharacterData;