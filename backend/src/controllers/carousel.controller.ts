import { Controller, Get, Route, Tags } from "tsoa";
import { CarouselResponseType } from "../dtos/carousel.dto";
import { CarouselService } from "../services/carousel.service";

@Route("carousel")
@Tags("Carousel")
export class CarouselController extends Controller {
  /**
   * Retorna uma lista ordenada dos itens que estão no carrossel.
   * @summary
   */
  @Get("/")
  public async getAllCarouselOrder(): Promise<CarouselResponseType[]> {
    return await CarouselService.getAllCarouselOrder();
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
