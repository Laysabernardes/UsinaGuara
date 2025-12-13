import { Controller, Get, Query, Route, Tags } from "tsoa";
import { CarouselResponseType, PaginatedCarouselResponse } from "../dtos/carousel.dto";
import { CarouselService } from "../services/carousel.service";

@Route("carousel")
@Tags("Carousel")
export class CarouselController extends Controller {

  /**
   * Retorna os itens do carrossel com paginação
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
   * Retorna uma lista ordenada dos itens que estão no carrossel.
   * @summary
   */
  @Get("/")
  public async getAllCarouselFlat(): Promise<CarouselResponseType[]> {
    return CarouselService.getAllCarouselFlat();
  }

  @Get("/inactive")
  public async getAllInactiveCarouselItems(): Promise<CarouselResponseType[]> {
    return await CarouselService.getAllInactiveCarouselItems();
  }

  @Get("/all")
  public async getAllCarouselCandidates(): Promise<CarouselResponseType[]> {
    return await CarouselService.getAllCarouselCandidates();
  }

}
