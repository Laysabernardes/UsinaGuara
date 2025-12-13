import homeBanner from "../assets/homeBanner.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { DestaqueSection } from "../components/DestaqueSection";
import Slider from "react-slick";
import CardCarousel from "../components/CardCarousel";
import Parceiros from "../components/Parceiros";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import { CarouselService, type CarouselResponseType } from "../service/carousel.service";
import { ProjectService } from "../service/projects/project.service";
import { type PaginatedProjectsResponse } from "../service/projects/project.types";

function Home() {
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [carouselData, setCarouselData] = useState<CarouselResponseType[]>([]);
  const [lastProjectsData, setLastProjectsData] = useState<PaginatedProjectsResponse>();

  const getAllCarousel = async () => {
    try {
      const carouselNumbers = await CarouselService.getAllCarouselOrder();
      setCarouselData(carouselNumbers);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllProjectsAndOrderByDate = async () => {
    try {
      const projects = await ProjectService.getAllProjects(1, 99999);
      projects.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setLastProjectsData(projects);
    } catch (e) {
      console.log(e);
    }
  };

  function convertDate(isoString: string): string {
  return new Date(isoString).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}


  useEffect(() => {
    getAllCarousel();
    getAllProjectsAndOrderByDate();

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
    autoplay: true,
    autoplaySpeed: 5000,
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
            {carouselData.map((card, index) => (
              <CardCarousel
                key={index}
                variant="short"
                theme="dark"
                title={card.title}
                subtitle={card.title}
                img={card.banner ? card.banner : "https://static.vecteezy.com/ti/fotos-gratis/t2/57068323-solteiro-fresco-vermelho-morango-em-mesa-verde-fundo-comida-fruta-doce-macro-suculento-plantar-imagem-foto.jpg"}
                slug={card.slug}
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
            {lastProjectsData?.data.map((card, index) => (
              <CardCarousel
                key={index}
                variant="long"
                theme="light"
                date={convertDate(card.createdAt)}
                title={card.title}
                subtitle={card.subtitle? card.subtitle : ""}
                img={card.banner ? card.banner : "https://static.vecteezy.com/ti/fotos-gratis/t2/57068323-solteiro-fresco-vermelho-morango-em-mesa-verde-fundo-comida-fruta-doce-macro-suculento-plantar-imagem-foto.jpg"}
                slug={card.slug}
              />
            ))}
          </Slider>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
