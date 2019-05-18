import { RESPONSE_TYPE } from './types/response.type.enum';
import { ClientOptions } from './types/client.options';
import { LEAGUE } from './types/league.enum';
import { HttpClient } from './http.client';
import { Match } from './types/match';
import { Group } from './types/group';

export class OpenLigaDB {
  private OPENLIGADB_API = 'https://www.openligadb.de/api';
  private readonly GETMATCHDATA = `/getmatchdata`;
  private readonly GETCURRENTGROUP = `getcurrentgroup`;

  private _responseType: RESPONSE_TYPE = RESPONSE_TYPE.JSON;
  private _defaultLeague: LEAGUE = LEAGUE.BUNDESLIGA_1;

  private httpClient: HttpClient;

  constructor(clientOptions: ClientOptions = {}) {
    this.applyOptions(clientOptions);
    this.httpClient = new HttpClient(this.OPENLIGADB_API, this.responseType);
  }

  private applyOptions(clientOptions: ClientOptions) {
    const { responseType, defaultLeague } = clientOptions;

    if (!!responseType) {
      this._responseType = responseType;
    }

    if (!!defaultLeague) {
      this._defaultLeague = defaultLeague;
    }
  }

  public set responseType(responseType: RESPONSE_TYPE) {
    this._responseType = responseType;
  }

  public set defaultLeague(league: LEAGUE) {
    this._defaultLeague = league;
  }

  public get responseType(): RESPONSE_TYPE {
    return this._responseType;
  }

  public get defaultLeague(): LEAGUE {
    return this._defaultLeague;
  }

  public set BaseUrl(baseUrl: string) {
    this.OPENLIGADB_API = baseUrl;
  }

  public async getCurrentMatchDay(league?: LEAGUE): Promise<Match[]> {
    const givenLeague = league || this.defaultLeague;
    return this.httpClient.get<Match[]>(`${this.GETMATCHDATA}/${givenLeague}`);
  }

  public async getSeason(season: string, league?: LEAGUE): Promise<Match[]> {
    const givenLeague = league || this.defaultLeague;
    return this.httpClient.get<Match[]>(`${this.GETMATCHDATA}/${givenLeague}/${season}`);
  }

  public async getMatchDay(matchDay: number, league?: LEAGUE): Promise<Match[]> {
    const givenLeague = league || this.defaultLeague;
    return this.httpClient.get<Match[]>(`${this.GETMATCHDATA}/${givenLeague}/${matchDay}`);
  }

  public async getMatchByNumber(matchId: number): Promise<Match> {
    return this.httpClient.get<Match>(`${this.GETMATCHDATA}/${matchId}`);
  }

  public async getCurrentGroup(league?: LEAGUE): Promise<Group> {
    const givenLeaeguee = league || this.defaultLeague;
    return this.httpClient.get<Group>(`${this.GETCURRENTGROUP}/${givenLeaeguee}`);
  }
}
