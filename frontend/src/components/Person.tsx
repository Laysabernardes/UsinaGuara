const Person = () => {
  return (
    <div className='w-full min-h-37 flex items-center gap-4 bg-gray-2 p-4 rounded-lg'>
      <img className='w-25 h-25 object-cover rounded-[100%]' src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyZmlsfGVufDB8fDB8fHww" alt="" />
      <div className='flex flex-col items-start gap-1 w-full h-full'>
        <h3 className="font-semibold text-lg">Nome</h3>
        <div className='flex gap-2 items-start'>
          <p className="font-normal text-sm bg-red-2/30 px-4 py-1.5 rounded-full">Cargo</p>
          <p className="font-normal text-sm bg-red-2/30 px-4 py-1.5 rounded-full">Contato</p>
        </div>
        <p className="w-full h-23 overflow-y-scroll font-normal text-sm bg-gray-3 px-4 py-1.5 rounded-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad odio libero ipsam ullam accusamus, excepturi odit obcaecati harum sit, labore, eos molestiae error! Fugit repudiandae laudantium cupiditate sint doloribus ducimus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum quas quisquam illo, cumque, facilis totam, fugiat error eos delectus quaerat nemo molestias quis velit! Animi perspiciatis numquam labore aperiam suscipit.</p>
      </div>
    </div>
  );
};

export default Person;