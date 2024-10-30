import { RequestWithUser } from "@data/interfaces/request.interface";
import { GetHygineProductStocksUseCase } from "@domain/usecases/inventory/get_hygine_products_by_property";
import { GetKeysStockByPropertyUseCase } from "@domain/usecases/inventory/get_keys_stock_by_property";
import { GetKnifeStockByPropertyUseCase } from "@domain/usecases/inventory/get_knife_stocks_by_property";
import { GetShoppingStockListUseCase } from "@domain/usecases/inventory/get_shopping_stock_list_by_property";
import { GetStationaryStocksUseCase } from "@domain/usecases/inventory/get_stationary_stock_by_property_id";
import { GetWelcomePackStockUseCase } from "@domain/usecases/inventory/get_welcome_pack_stocks_by_property copy";
import { CheckTokenExpiry } from "@infrastructure/middlewares/token_expiry.middleware";
import {
    Authorized,
    Get,
    HttpCode,
    JsonController,
    Param,
    Req,
    UseBefore,
} from "routing-controllers";
import Container from "typedi";

@JsonController("/properties/inventory")
@UseBefore(CheckTokenExpiry)
@Authorized()
export class InventoryController {
    private getStationaryStocksUseCase = Container.get(GetStationaryStocksUseCase);
    private getHygineProductStocksUseCase = Container.get(GetHygineProductStocksUseCase);
    private getKeysStockByPropertyUseCase = Container.get(GetKeysStockByPropertyUseCase);
    private getWelcomePackStockUseCase = Container.get(GetWelcomePackStockUseCase);
    private getShoppingStockListUseCase = Container.get(GetShoppingStockListUseCase);
    private getKnifeStockByPropertyUseCase = Container.get(GetKnifeStockByPropertyUseCase);

    @Get("/stationary/:property_id")
    @HttpCode(200)
    getStationaryStockByProperty(@Req() req: RequestWithUser, @Param('property_id') property_id: string) {
        return this.getStationaryStocksUseCase.call(req, property_id);
    }

    @Get("/hygine-products/:property_id")
    @HttpCode(200)
    getHygineProductsStockByProperty(@Req() req: RequestWithUser, @Param("property_id") property_id: string) {
        return this.getHygineProductStocksUseCase.call(req, property_id);
    }

    @Get("/keys/:property_id")
    @HttpCode(200)
    getKeysListByProperty(@Req() req: RequestWithUser, @Param("property_id") property_id: string) {
        return this.getKeysStockByPropertyUseCase.call(req, property_id);
    }

    @Get("/welcome-pack/:property_id")
    @HttpCode(200)
    getWelcomePackStockByProperty(@Req() req: RequestWithUser, @Param("property_id") property_id: string) {
        return this.getWelcomePackStockUseCase.call(req, property_id);
    }

    @Get("/shopping-stock/:property_id")
    @HttpCode(200)
    getShoppingStockListByProperty(@Req() req: RequestWithUser, @Param("property_id") property_id: string) {
        return this.getShoppingStockListUseCase.call(req, property_id);
    }

    @Get("/shopping-stock/:property_id")
    @HttpCode(200)
    getKnifeStockByProperty(@Req() req: RequestWithUser, @Param("property_id") property_id: string) {
        return this.getKnifeStockByPropertyUseCase.call(req, property_id);
    }
}
