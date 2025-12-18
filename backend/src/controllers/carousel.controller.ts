import { Controller, Get, Query, Route, Tags } from "tsoa";
import { CarouselResponseType, PaginatedCarouselResponse } from "../dtos/carousel.dto";
import { CarouselService } from "../services/carousel.service";

@Route("carousel")
@Tags("Carousel")
export class CarouselController extends Controller {

  /**
   * Obtém itens do carrossel com suporte a paginação.
   * Útil para listagens longas no painel administrativo.
   * * @param page Página atual (padrão: 1)
   * @param limit Itens por página (padrão: 10)
   * @summary Lista paginada do carrossel
   */
  @Get("/page")
  public async getAllCarouselOrder(
    @Query() page?: number,
    @Query() limit?: number
  ): Promise<PaginatedCarouselResponse> {
    return CarouselService.getAllCarouselOrder(
      page ?? 1,
      limit ?? 10
    );
  }

  /**
   * Retorna apenas os itens ativos e ordenados para exibição no site (formato flat).
   * @summary Lista simplificada para o frontend público
   */
  @Get("/")
  public async getAllCarouselFlat(): Promise<CarouselResponseType[]> {
    return CarouselService.getAllCarouselFlat();
  }

  /**
   * Recupera itens que estão marcados como inativos ou ocultos.
   */
  @Get("/inactive")
  public async getAllInactiveCarouselItems(): Promise<CarouselResponseType[]> {
    return await CarouselService.getAllInactiveCarouselItems();
  }

  /**
   * Retorna todos os itens que podem ser adicionados ao carrossel (Candidatos).
   * Geralmente usado em seletores de busca no admin.
   */
  @Get("/all")
  public async getAllCarouselCandidates(): Promise<CarouselResponseType[]> {
    return await CarouselService.getAllCarouselCandidates();
  }

}
