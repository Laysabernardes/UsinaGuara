import homeBanner from "../../assets/homeBanner.png";
import Header from "../../components/header";
import { DestaqueSection } from "../../components/DestaqueSection";
import Slider from "react-slick";
import CardCarousel from "../../components/CardCarousel";
import Parceiros from "../../components/Parceiros";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";

const projetos = [
  {
    title: "Projeto Exemplo 1",
    subtitle: "Comunidade se reúne para discutir melhorias urbanas e projetos futuros...",
    date: "10/20/2025",
    img: "https://static.vecteezy.com/ti/fotos-gratis/t2/57068323-solteiro-fresco-vermelho-morango-em-mesa-verde-fundo-comida-fruta-doce-macro-suculento-plantar-imagem-foto.jpg",
    slug: "fabril",
    collection: "projetos",
  },
  {
    title: "Projeto Exemplo 2",
    subtitle: "Comunidade se reúne para discutir melhorias urbanas e projetos futuros...",
    date: "10/20/2025",
    img: "https://static.vecteezy.com/ti/fotos-gratis/t2/57068323-solteiro-fresco-vermelho-morango-em-mesa-verde-fundo-comida-fruta-doce-macro-suculento-plantar-imagem-foto.jpg",
    slug: "fabril-2",
    collection: "projetos",
  },
  {
    title: "Projeto Exemplo 3",
    subtitle: "Comunidade se reúne para discutir melhorias urbanas e projetos futuros...",
    date: "10/20/2025",
    img: "https://static.vecteezy.com/ti/fotos-gratis/t2/57068323-solteiro-fresco-vermelho-morango-em-mesa-verde-fundo-comida-fruta-doce-macro-suculento-plantar-imagem-foto.jpg",
    slug: "fabril-3",
    collection: "projetos",
  },
  {
    title: "Projeto Exemplo 4",
    subtitle: "Comunidade se reúne para discutir melhorias urbanas e projetos futuros...",
    date: "10/20/2025",
    img: "https://static.vecteezy.com/ti/fotos-gratis/t2/57068323-solteiro-fresco-vermelho-morango-em-mesa-verde-fundo-comida-fruta-doce-macro-suculento-plantar-imagem-foto.jpg",
    slug: "fabril-4",
    collection: "projetos",
  },
  {
    title: "Projeto Exemplo 5",
    subtitle: "Comunidade se reúne para discutir melhorias urbanas e projetos futuros...",
    date: "10/20/2025",
    img: "https://static.vecteezy.com/ti/fotos-gratis/t2/57068323-solteiro-fresco-vermelho-morango-em-mesa-verde-fundo-comida-fruta-doce-macro-suculento-plantar-imagem-foto.jpg",
    slug: "fabril-5",
    collection: "projetos",
  },
];

function Home() {
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: true,
    cssEase: "ease-in-out",
  };

  return (
    <>
      <Header />
      <section id="banner" className="relative">
        <img
          src={homeBanner}
          alt="Banner Usina Guará"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 w-full h-full flex flex-col items-center justify-center bg-black/50">
          <h2 className="max-w-5xl text-white text-center text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 px-4">
            Transformando Comunidades Através da Economia Criativa e do Urbanismo
          </h2>
          <p className="max-w-3xl text-white text-center text-base sm:text-lg font-bold px-6 py-2 bg-gray-700/70 rounded-2xl">
            Promovemos projetos que conectam arte, urbanismo e desenvolvimento social
            para criar espaços mais humanos e sustentáveis.
          </p>
        </div>
      </section>
      <section className="w-full flex flex-col items-center justify-center bg-gray-800 p-6">
        <div id="destaques" className="w-full max-w-[1380px] mt-20 mb-15">
          <h2 className="text-white text-3xl font-bold text-center mb-7">
            Projetos em Destaque
          </h2>
          <Slider {...settings}>
            {projetos.map((projeto, index) => (
              <CardCarousel
                key={index}
                variant="dark"
                title={projeto.title}
                subtitle={projeto.subtitle}
                img={projeto.img}
                slug={projeto.slug}
                collection={projeto.collection as "projetos" | "perspectivas"}
              />
            ))}
          </Slider>
        </div>
      </section>
      <DestaqueSection />
      <Parceiros />
      <section className="w-full flex flex-col items-center justify-center bg-gray-1 p-6">
        <div id="novidades" className="w-full max-w-[1380px] mt-20 mb-15">
          <h2 className="text-white text-3xl font-bold text-center mb-7">
            Últimas Novidades
          </h2>
          <Slider {...settings}>
            {projetos.map((projeto, index) => (
              <CardCarousel
                key={index}
                variant="light"
                date={projeto.date}
                title={projeto.title}
                subtitle={projeto.subtitle}
                img={projeto.img}
                slug={projeto.slug}
                collection={projeto.collection as "projetos" | "perspectivas"}
              />
            ))}
          </Slider>
        </div>
      </section>
      <footer className="flex flex-col items-center bg-gray-1 py-16">
        <div className="w-full max-w-7xl flex flex-col items-start justify-between sm:flex-row pb-12 border-b border-blue-2">
            <div className="w-72 flex flex-col gap-4">
              <h2 className="w-max font-semibold text-white">Institucional</h2>
              <div className="flex flex-col gap-2">
                <p className="w-max transition text-blue-2 font-light text-sm cursor-pointer hover:text-gray-4">A Usina Guará</p>
                <p className="w-max transition text-blue-2 font-light text-sm cursor-pointer hover:text-gray-4">Nossa Equipe</p>
              </div>
            </div>
            <div className="w-72 flex flex-col gap-4">
              <h2 className="w-max font-semibold text-white">Projetos</h2>
              <div className="flex flex-col gap-2">
                <p className="w-max transition text-blue-2 font-light text-sm cursor-pointer hover:text-gray-4">Vila Operária Fabril</p>
                <p className="w-max transition text-blue-2 font-light text-sm cursor-pointer hover:text-gray-4">Marina Caraguatá</p>
                <p className="w-max transition text-blue-2 font-light text-sm cursor-pointer hover:text-gray-4">Vila dos Pescadores</p>
              </div>
            </div>
            <div className="w-72 flex flex-col gap-4">
              <h2 className="w-max font-semibold text-white">Parceiros</h2>
              <p className="w-max transition text-blue-2 font-light text-sm cursor-pointer hover:text-gray-4">Nossos Parceiros</p>
            </div>
            <div className="w-72 flex flex-col gap-4">
              <h2 className="w-max font-semibold text-white">Fale Conosco</h2>
              <div className="flex flex-col gap-2">
                <a href="/" target="_blank" className="w-max transition text-blue-2 font-light text-sm cursor-pointer hover:text-gray-4">usinaguara@gmail.com</a>
                <a href="/" target="_blank" className="w-max transition text-blue-2 font-light text-sm cursor-pointer hover:text-gray-4">Instagram</a>
              </div>
            </div>
        </div>
        <div className="mt-8 mb-6 w-full max-w-7xl">
          <p className="w-full p-4 rounded-lg bg-blue-1 text-white text-lg font-bold text-center">Projeto viabilizado pela Lei Paulo Gustavo (Edital 123456)</p>
        </div>
        <div className="flex justify-between w-full max-w-7xl">
          <div className="flex gap-6">
            <p className="w-max transition text-blue-2 font-light text-sm cursor-pointer hover:text-gray-4">Política de Privacidade</p>
            <p className="w-max transition text-blue-2 font-light text-sm cursor-pointer hover:text-gray-4">Termos e Condições</p>
          </div>
          <p className="w-max transition text-sm text-gray-4">Copyright 2025 Usina Guará. Powered by WordPress.</p>
        </div>
      </footer>
    </>
  );
}

export default Home;
