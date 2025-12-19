interface PersonProps {
  id: string;
  name: string;
  kind: string;
  contact?: string;
  imageUrl?: string;
  description: string[];
}


const Person: React.FC<PersonProps> = ({ name, kind, contact, imageUrl, description }) => {
  return (
    <div className='w-full flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-gray-2 p-4 rounded-lg sm:h-40'>
      <div className='w-24 h-24 sm:w-25 sm:h-25 rounded-full overflow-hidden flex-shrink-0'>
        <img src={imageUrl} alt={name} className='w-full h-full object-cover' />
      </div>

      <div className='flex flex-col items-center sm:items-start gap-1 w-full h-full overflow-y-auto'>
        <h3 className='font-semibold text-lg text-center sm:text-left'>{name}</h3>

        <div className='flex flex-wrap gap-2 justify-center sm:justify-start'>
          <p className='font-normal text-sm bg-red-2/30 px-4 py-1.5 rounded-full'>{kind}</p>
          {contact && <p className='font-normal text-sm bg-red-2/30 px-4 py-1.5 rounded-full'>{contact}</p>}
        </div>

        <p className='w-full font-normal text-sm bg-gray-3 px-4 py-1.5 rounded-2xl'>
          {description.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default Person;
