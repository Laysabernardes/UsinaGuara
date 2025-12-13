import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { PeopleService } from "./people.service";
import type { PeopleResponseType } from "./people.types";
import PeopleCard from "./components/PeopleCard";

const PeoplePage: React.FC = () => {
    const [people, setPeople] = useState<PeopleResponseType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPeople = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await PeopleService.getAllPeople(); 
            setPeople(data);
        } catch (err) {
            console.error("Error fetching people:", err);
            setError("Error loading people.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPeople();
    }, []);

    if (error) {
        return (
            <div className="text-red-500 p-8 bg-gray-900 min-h-screen">
                <h1>API Error</h1>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <>
            <Header />

            <article className="bg-gray-900 min-h-screen text-gray-100">

                {/* Banner */}
                <section
                    className="relative w-full h-[40vh] flex flex-col items-center justify-center text-center bg-cover bg-center text-white"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/images/banner-people.jpg)"
                    }}
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-3">Pessoas</h2>
                    <p className="max-w-3xl mx-auto text-lg px-4">
                        Conheça a comunidade e seus protagonistas.
                    </p>

                    {loading && (
                        <div className="loading-spinner absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                            <div className="spinner"></div>
                        </div>
                    )}
                </section>

                {/* Área de listagem */}
                <div className="max-w-7xl mx-auto p-6 md:p-10">

                    {loading && (
                        <p className="text-center text-gray-400 text-lg">Carregando...</p>
                    )}

                    {!loading && people.length === 0 && (
                        <p className="text-center text-gray-400 text-lg">
                            Nenhuma pessoa encontrada.
                        </p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {people.map(person => (
                            <PeopleCard key={person._id} person={person} />
                        ))}
                    </div>
                </div>
            </article>
        </>
    );
};

export default PeoplePage;
