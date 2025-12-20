import background from "../assets/bg_home.png";
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
import { type PaginatedProjectsResponse, type ProjectResponseType } from "../features/projects/project.types";
import LoadingOverlay from '../components/LoadingOverlay'; // 1. Importe o componente


function Home() {
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [carouselData, setCarouselData] = useState<CarouselResponseType[]>([]);
  const [lastProjectsData, setLastProjectsData] = useState<PaginatedProjectsResponse>();
  const [loading, setLoading] = useState(true);

  // 2. Agrupar as chamadas em uma função principal
  const loadPageData = async () => {
    try {
      setLoading(true);
      
      // Executa as duas buscas em paralelo para ganhar tempo
      await Promise.all([
        getAllCarousel(),
        getAllProjectsAndOrderByDate()
      ]);
      
    } catch (e) {
      console.error("Error loading home data:", e);
    } finally {
      // 3. Desativa o spinner após o término de ambas (ou erro)
      setLoading(false);
    }
  };

  const getAllCarousel = async () => {
    try {
      const carouselNumbers = await CarouselService.getAllCarouselPublic();
      
      const ordered = [...carouselNumbers].sort(
        (a, b) => (a.orderCarousel ?? Infinity) - (b.orderCarousel ?? Infinity)
      ).filter(item => item.orderCarousel !== null && item.orderCarousel !== undefined && item.orderCarousel <= 10);

      setCarouselData(ordered);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllProjectsAndOrderByDate = async () => {
    try {
      const projects = await ProjectService.getAllProjects(1, 99999);
      
      // TIPAGEM ADICIONADA: (a: ProjectResponseType, b: ProjectResponseType)
      const sortedProjects = projects.data
        .filter((project: ProjectResponseType) => project.status === "published")
        .sort((a: ProjectResponseType, b: ProjectResponseType) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 7);

      setLastProjectsData({ ...projects, data: sortedProjects });
    } catch (e) {
      console.log(e);
      throw e;
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
    loadPageData();

    const handleResize = () => {
      if (window.innerWidth < 640) setSlidesToShow(1);
      else if (window.innerWidth < 1024) setSlidesToShow(2);
      else setSlidesToShow(3);
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
    dots: true,
    cssEase: "ease-in-out",
  };

  const carouselSettings = {
    ...settings,
    dots: carouselData.length <= 7,
  };

  return (
    <>
      <Header />
      {loading && <LoadingOverlay />}
      <section className="relative w-full min-h-[82vh] h-full py-5 flex flex-col items-center justify-center text-center bg-cover bg-center text-white"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${background})` }}>
        <h2 className="h-max max-w-5xl text-white text-center text-3xl sm:text-4xl lg:text-5xl font-bold px-4 mb-3">Transformando Comunidades Através da Economia Criativa e do Urbanismo</h2>
        <p className="mx-2 h-max max-w-3xl text-white text-center text-base sm:text-lg font-bold px-6 py-2 bg-gray-700/70 rounded-2xl">
          Promovemos projetos que conectam arte, urbanismo e desenvolvimento social
          para criar espaços mais humanos e sustentáveis.
        </p>
      </section>
      <section className="w-full flex flex-col items-center justify-center bg-gray-800 p-6">
        <div id="destaques" className="w-full max-w-[1380px] mt-20 mb-15">
          <h2 className="text-white text-3xl font-bold text-center mb-7">
            Projetos em Destaque
          </h2>
          <Slider {...carouselSettings}>
            {carouselData.map((card, index) => (
              <CardCarousel
                key={index}
                variant="short"
                theme="dark"
                title={card.title}
                subtitle={card.title}
                img={card.banner ? card.banner : "https://static.vecteezy.com/ti/fotos-gratis/t2/57068323-solteiro-fresco-vermelho-morango-em-mesa-verde-fundo-comida-fruta-doce-macro-suculento-plantar-imagem-foto.jpg"}
                slug={card.slug}
                collection={card.collection_type}
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
                collection={"project"}
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
