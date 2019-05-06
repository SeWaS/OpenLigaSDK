import { RESPONSE_TYPE } from "./response.type.enum";
import { LEAGUE } from "./league.enum";

export interface ClientOptions {
    responseType?: RESPONSE_TYPE;
    defaultLeague?: LEAGUE
}