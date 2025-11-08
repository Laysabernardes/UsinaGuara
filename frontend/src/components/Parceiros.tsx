
import { HiMiniBuildingOffice } from "react-icons/hi2";
import { AiFillBank } from "react-icons/ai";
import { FaHandshake } from "react-icons/fa6";
import { FaLeaf } from "react-icons/fa";

const Parceiros = () => {
  return (
    <section className="bg-gray-2 h-max">
        <div className="flex flex-col items-center justify-center gap-5 py-20">
            <h2 className="text-white text-3xl font-bold">Apoio / Parcerias</h2>
            <div className="flex flex-row flex-wrap items-center justify-center gap-12">
                <div className="p-6 rounded-[50%] bg-gray-3 border-1 border-gray-4">
                    <HiMiniBuildingOffice className="w-6 h-auto text-gray-5 z-1"/>
                </div>
                <div className="p-6 rounded-[50%] bg-gray-3 border-1 border-gray-4">
                    <AiFillBank className="w-6 h-auto text-gray-5 z-1"/>
                </div>
                <div className="p-6 rounded-[50%] bg-gray-3 border-1 border-gray-4">
                    <FaHandshake className="w-6 h-auto text-gray-5 z-1"/>
                </div>
                <div className="p-6 rounded-[50%] bg-gray-3 border-1 border-gray-4">
                    <FaLeaf className="w-6 h-auto text-gray-5 z-1"/>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Parceiros;