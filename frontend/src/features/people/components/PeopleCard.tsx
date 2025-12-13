import React from "react";
import type { PeopleResponseType } from ".././people.types";

interface Props {
    person: PeopleResponseType;
}

const PeopleCard: React.FC<Props> = ({ person }) => {
    return (
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition border border-gray-700">
            
            {/* Imagem */}
            {person.imageUrl && (
                <img
                    src={person.imageUrl}
                    alt={person.name}
                    className="w-full h-48 object-cover"
                />
            )}

            {/* Conteúdo */}
            <div className="p-4 flex flex-col gap-2">

                <h3 className="text-xl font-bold text-white">
                    {person.name}
                </h3>

                <p className="text-sm text-red-400 font-semibold">
                    {person.kind}
                </p>

                {person.contact && (
                    <p className="text-sm text-gray-300 break-words">
                        <strong>Contato:</strong> {person.contact}
                    </p>
                )}

                {/* Description é um array */}
                {person.description?.length > 0 && (
                    <ul className="text-gray-400 text-sm list-disc ml-5 mt-2">
                        {person.description.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default PeopleCard;
