import { NavLink } from "react-router-dom";

export function DestaqueSection() {
  return (
      <section className="w-full py-16 flex flex-col items-center justify-center bg-red-1 ">
        <div className="flex flex-col justify-center items-center gap-5">
          <h2 className="text-white text-3xl font-bold">#manguezalvivo</h2>
          <p className="text-white text-xl text-center">Urbanização da Vila Esperança - Preservando ecossistemas enquanto desenvolvemos comunidades</p>
          <NavLink to="/" className="bg-white text-gray-800 text-md font-bold px-8 py-3 border-0 rounded-xl transition hover:bg-gray-5">Acessar Página</NavLink>
        </div>
      </section>
  );
}