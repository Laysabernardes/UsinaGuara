import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import bg_sobre from "../assets/bg_sobre.jpg";
import guara from "../assets/guara.png";
import sobre1 from "../assets/sobre1.png";
import sobre2 from "../assets/sobre2.png";
import sobre3 from "../assets/sobre3.png";

function About() {
    return (
        <>
            <Header />

            {/* BANNER */}
            <section
                id="banner"
                className="relative w-full h-[55vh] md:h-[45vh] lg:h-[55vh]"
            >
                <img
                    src={bg_sobre}
                    alt="Banner Usina Guará"
                    className="w-full h-full object-cover"
                />
            </section>

            {/* CONTEÚDO */}
            <section className="w-full bg-[#0f1b2d] py-1 md:py-1 lg:py-5">
                <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">

                    {/* SOBRE O COLETIVO */}
                    <section className="w-full max-w-4xl mt-10">
                        <h2 className="text-white text-3xl font-semibold mb-10">
                            Sobre o coletivo
                        </h2>

                        <div className="text-gray-200 text-base leading-relaxed text-justify indent-8 space-y-2">
                            <p>
                                A Usina Guará é um coletivo formado por profissionais de Arquitetura e
                                Urbanismo, Design e Artes que acreditam que todas as cidades carregam
                                histórias que merecem ser vistas, cuidadas e contadas.
                           
                                Nosso propósito é aproximar as pessoas de seus territórios, criando
                                caminhos para que a população reconheça o valor dos lugares onde vive
                                e participe da construção de futuros mais justos e acolhedores.
                           
                                A Usina Guará existe porque acreditamos que as cidades brasileiras
                                tendem a ganhar mais qualidade com a difusão de conhecimento e a
                                colaboração na construção de iniciativas que promovam a arquitetura,
                                o urbanismo, a paisagem e as técnicas presentes nos territórios que as
                                pertencem.
                            </p>

                            <p>
                                Trabalhamos para difundir conhecimento de forma acessível, promover
                                conversas importantes e fortalecer vínculos entre comunidade,
                                patrimônio e cidade. Para nós, urbanismo não é só técnica:
                                é convivência, memória, cultura e imaginação coletiva.
                            </p>
                        </div>

                        {/* IMAGEM + CITAÇÃO */}
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            <div className="flex justify-center">
                                <img
                                    src={guara}
                                    alt="Usina Guará"
                                    className="max-w-sm w-full"
                                />
                            </div>

                            <blockquote
                                className="relative pl-5 text-white text-lg md:text-xl text-justify font-medium leading-[1.6] tracking-wide"
                            >
                                <span className="absolute left-0 top-0 text-3xl text-white/30 leading-none">
                                    “
                                </span>

                                A Usina Guará existe porque acreditamos que as cidades brasileiras
                                tendem a ganhar mais qualidade com a difusão de conhecimento e a
                                colaboração na construção de iniciativas que promovam a arquitetura,
                                o urbanismo, a paisagem e as técnicas presentes nos territórios que
                                as pertencem.”
                            </blockquote>
                        </div>
                    </section>

                    {/* O QUE FAZEMOS */}
                    <section className="w-full max-w-4xl mt-12 md:mt-20">
                        <h2 className="text-white text-3xl font-semibold mb-10">
                            O que fazemos e como atuamos
                        </h2>

                        <div className="text-gray-200 text-base leading-relaxed text-justify indent-8 space-y-2">
                            <p>
                                A Usina Guará nasce de encontros pautados em discutir, experimentar e
                                projetar ideias para melhorar a qualidade urbana na Baixada Santista.
                            </p>

                            <p>
                                Entre 2023 e 2025, escolhemos como objeto de estudo e afeto a Vila
                                Operária Fabril, em Cubatão — um território histórico marcado pela
                                presença da antiga Companhia Santista de Papel e pela força do
                                trabalho, da memória coletiva e da cultura popular.
                            </p>

                            <p>
                                Nosso trabalho buscou iluminar as camadas que formam a vida das vilas
                                operárias, equilibrando passado, presente e possibilidades de futuro.
                                Mais do que analisar, buscamos provocar reflexão, fortalecer
                                pertencimento e abrir espaço para projetos que respeitem as potências
                                do território.
                            </p>
                        </div>

                        {/* IMAGENS */}
                        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <figure className="flex flex-col items-center">
                                <img
                                    src={sobre1}
                                    alt="Vila Operária Fabril – preservada"
                                    className="w-full object-cover rounded-lg shadow-lg"
                                />
                                <figcaption className="mt-3 text-sm text-gray-300 text-center">
                                    Simulação da Restauração dos edifícios históricos
                                </figcaption>
                            </figure>

                            <figure className="flex flex-col items-center">
                                <img
                                    src={sobre2}
                                    alt="Vila Operária Fabril – descaracterização"
                                    className="w-full object-cover rounded-lg shadow-lg"
                                />
                                <figcaption className="mt-3 text-sm text-gray-300 text-center">
                                    Simulação do Cenário de Demolição da Vila
                                </figcaption>
                            </figure>
                        </div>
                    </section>

                    {/* VISÃO E FUTURO */}
                    <section className="w-full max-w-4xl mt-12 md:mt-20">
                        <h2 className="text-white text-3xl font-semibold mb-10">
                            Nossa visão, ambição e futuro
                        </h2>

                        <div className="text-gray-200 text-base leading-relaxed text-justify indent-8 space-y-2">
                            <p>
                                A Usina Guará entende o território como uma usina simbólica: um lugar
                                onde memória, cultura, arquitetura, natureza e tecnologia podem
                                operar juntas para produzir novos sentidos de cidade e novos modos
                                de vida.
                            </p>

                            <p>
                                Queremos construir uma plataforma escalável de difusão de
                                conhecimento urbano, reunindo projetos, acervos, entrevistas,
                                pesquisas, notícias, mapas, intervenções artísticas e ferramentas
                                digitais.
                            </p>

                            <p>
                                Acreditamos na cidade como resultado de processos coletivos e na
                                importância de criar ambientes que estimulem participação,
                                imaginação e cuidado.
                            </p>

                            <p>
                                A Usina Guará é, antes de tudo, um convite: pensar o território com
                                profundidade, reconhecer suas lutas e imaginar futuros possíveis.
                            </p>

                            {/* IMAGEM FINAL */}
                            <figure className="mt-8">
                                <img
                                    src={sobre3}
                                    alt="Vila Operária Fabril"
                                    className="w-full aspect-[3/1] object-cover rounded-lg"
                                />
                                <figcaption className="mt-2 text-sm text-gray-400 text-center">
                                   Imagem Ilustrativa
                                </figcaption>
                            </figure>
                        </div>
                    </section>

                </div>
            </section>

            <Footer />
        </>
    );
}

export default About;
