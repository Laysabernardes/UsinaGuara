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
    <div className='w-full min-h-37 flex items-center gap-4 bg-gray-2 p-4 rounded-lg'>
      <img className='w-25 h-25 object-cover rounded-[100%]' src={imageUrl} alt={name} />
      <div className='flex flex-col items-start gap-1 w-full h-full'>
        <h3 className="font-semibold text-lg">{name}</h3>
        <div className='flex gap-2 items-start'>
          <p className="font-normal text-sm bg-red-2/30 px-4 py-1.5 rounded-full">{kind}</p>
          <p className="font-normal text-sm bg-red-2/30 px-4 py-1.5 rounded-full">{contact}</p>
        </div>
        <p className="w-full h-23 overflow-y-scroll font-normal text-sm bg-gray-3 px-4 py-1.5 rounded-2xl">
          {description.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default Person;
