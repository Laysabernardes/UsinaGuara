import { Link } from "react-router-dom";

interface CardCarouselProps {
  variant: "long" | "short";
  theme?: "dark" | "light";
  date?: string;
  title: string;
  subtitle: string;
  img: string;
  slug: string;
  collection: "project" | "perspective";
}

const CardCarousel = ({variant, theme, date, title, subtitle, img, slug, collection}: CardCarouselProps) => {
  return (
    <>
    {variant === "long" ? (
    <div className="group max-w-sm w-full rounded-lg overflow-hidden transition duration-300 hover:shadow-[0px_5px_10px_5px_rgba(0,0,0,0.25)] mx-auto border border-gray-3">
      <div className="relative w-full h-48 overflow-hidden">
          <img src={img} alt={title} className="w-full h-full object-cover transition duration-500 group-hover:scale-110"/>
      </div>
      <div className={`w-full h-52 flex flex-col justify-between p-6 text-gray-200 transition-colors duration-300 ${theme == "dark" ? "!bg-gray-1" : "!bg-gray-2"}`}>
        <div>
          {date != null && <p className="text-sm text-gray-400 mb-2">{date}</p>}
          <h3 className="text-xl font-bold overflow-hidden mb-2">{title}</h3>
        </div>
        <p className="text-sm text-gray-400 line-clamp-3 mb-2">{subtitle}</p>
        <Link to={collection === "project" ? `/projeto/${slug}` : `/perspectiva/${slug}`} className="w-max font-semibold transition flex items-center text-red-500 hover:text-red-300">
          Ler mais        
        </Link>
      </div>
    </div>
  ) : (
    <div className="group max-w-sm w-full rounded-lg overflow-hidden transition duration-300 hover:shadow-[0px_5px_10px_5px_rgba(0,0,0,0.25)] mx-auto border border-gray-3">
      <div className="relative w-full h-45 overflow-hidden">
          <img src={img} alt={title} className="w-full h-full object-cover transition duration-500 group-hover:scale-110"/>
      </div>
      <div className={`w-full h-40 flex flex-col justify-between p-6 text-gray-200 transition-colors duration-300 ${theme == "dark" ? "!bg-gray-1" : "!bg-gray-2"}`}>
        <div>
          <h3 className="text-2xl font-bold overflow-hidden mb-2">{title}</h3>
        </div>
        <Link to={collection === "project" ? `/projeto/${slug}` : `/perspectiva/${slug}`} className="w-max font-semibold transition flex items-center text-red-500 hover:text-red-300">
          Ler mais        
        </Link>
      </div>
    </div>
    )}  
    </>
  );
};

export default CardCarousel;