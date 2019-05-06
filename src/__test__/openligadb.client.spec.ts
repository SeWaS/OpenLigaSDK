import { RESPONSE_TYPE } from "../types/response.type.enum";
import { LEAGUE } from "../types/league.enum";
import { OpenLigaDB } from "../openligadb";
import * as nock from 'nock';
import { Match } from "../types/match";

describe('The OpenLigaDb SKD', () => {

    it('should be initialized with default values', () => {
        const expectedResponseType = RESPONSE_TYPE.JSON;
        const expectedLeague = LEAGUE.BUNDESLIGA_1;

        const testCient = new OpenLigaDB();

        expect(testCient.responseType).toBe(expectedResponseType)
        expect(testCient.defaultLeague).toBe(expectedLeague);
    });

    it('should be initialized with custom values', () => {
        const expectedResponseType = RESPONSE_TYPE.XML;
        const expectedLeague = LEAGUE.BUNDESLIGA_2;

        const testCient = new OpenLigaDB({
            defaultLeague: expectedLeague,
            responseType: expectedResponseType
        });

        expect(testCient.responseType).toBe(expectedResponseType)
        expect(testCient.defaultLeague).toBe(expectedLeague);
    });

    describe(`should be able to make calls based on 'getMatchData'`, () => {

        const OPENLIGADB_API: string = 'https://www.openligadb.de/api/getmatchdata';

        describe('getMatchData for league', () => {

            it('should be able to get the current matchday of default league', async () => {

                const mockReturn: any = [
                    { matchId: 1 },
                    { matchId: 2 },
                    { matchId: 3 }
                ];
    
                nock(OPENLIGADB_API)
                    .get(`/${LEAGUE.BUNDESLIGA_2}`)
                    .reply(200, mockReturn);
    
                const testCient = new OpenLigaDB({
                    defaultLeague: LEAGUE.BUNDESLIGA_2
                });
    
                const resultForCurrentMatchDay = await testCient.getCurrentMatchDay();
    
                expect(resultForCurrentMatchDay).toHaveLength(3);
                expect(resultForCurrentMatchDay).toEqual(mockReturn);
            });

            it('should be able to get the current matchday of given league', async () => {

                const mockReturn: any = [
                    { matchId: 1 },
                    { matchId: 2 },
                    { matchId: 3 }
                ];
    
                nock(OPENLIGADB_API)
                    .get(`/${LEAGUE.BUNDESLIGA_1}`)
                    .reply(200, mockReturn);
    
                const testCient = new OpenLigaDB();
    
                const resultForCurrentMatchDay = await testCient.getCurrentMatchDay(LEAGUE.BUNDESLIGA_1);
    
                expect(resultForCurrentMatchDay).toHaveLength(3);
                expect(resultForCurrentMatchDay).toEqual(mockReturn);
            });

        });

        describe('getMatchData for season', () => {

            it('should be able to get the season for a given league', async () => {

                const mockReturn: any = [
                    { matchId: 1 },
                    { matchId: 2 },
                    { matchId: 3 }
                ];
    
                nock(OPENLIGADB_API)
                    .get(`/${LEAGUE.BUNDESLIGA_1}/2017`)
                    .reply(200, mockReturn);
    
                const testCient = new OpenLigaDB();
    
                const resultForCurrentMatchDay = await testCient.getSeason('2017');
    
                expect(resultForCurrentMatchDay).toHaveLength(3);
                expect(resultForCurrentMatchDay).toEqual(mockReturn);
            });

            it(`should be able to get the season for a given league even if it's an empty list`, async () => {

                const mockReturn: any = [];
    
                nock(OPENLIGADB_API)
                    .get(`/${LEAGUE.BUNDESLIGA_2}/9999`)
                    .reply(200, mockReturn);
    
                const testCient = new OpenLigaDB();
    
                const resultForCurrentMatchDay = await testCient.getSeason('9999', LEAGUE.BUNDESLIGA_2);
    
                expect(resultForCurrentMatchDay).toHaveLength(0);
                expect(resultForCurrentMatchDay).toEqual(mockReturn);
            });

        });

        describe('getMatchData for matchday', () => {

            it('should be able to get matchday for a matchday number', async () => {

                const mockReturn: any = [
                    { matchId: 1 },
                    { matchId: 2 },
                    { matchId: 3 }
                ];
    
                nock(OPENLIGADB_API)
                    .get(`/${LEAGUE.BUNDESLIGA_1}/8`)
                    .reply(200, mockReturn);
    
                const testCient = new OpenLigaDB();
    
                const resultForCurrentMatchDay = await testCient.getMatchDay(8);
    
                expect(resultForCurrentMatchDay).toHaveLength(3);
                expect(resultForCurrentMatchDay).toEqual(mockReturn);
            });

            it(`should be able to get matchday for a matchday number even if it's an empty list`, async () => {

                const mockReturn: any = [];
    
                nock(OPENLIGADB_API)
                    .get(`/${LEAGUE.BUNDESLIGA_2}/80`)
                    .reply(200, mockReturn);
    
                const testCient = new OpenLigaDB();
    
                const resultForCurrentMatchDay = await testCient.getMatchDay(80, LEAGUE.BUNDESLIGA_2);
    
                expect(resultForCurrentMatchDay).toHaveLength(0);
                expect(resultForCurrentMatchDay).toEqual(mockReturn);
            });

        });

        describe('getMatchData by MatchId', () => {

            it('should be able to get matchday for a matchday number', async () => {

                const mockReturn: any = { matchId: 555 };
    
                nock(OPENLIGADB_API)
                    .get(`/${mockReturn.matchId}`)
                    .reply(200, mockReturn);
    
                const testCient = new OpenLigaDB();
    
                const resultForCurrentMatchDay = await testCient.getMatchByNumber(mockReturn.matchId);
    
                expect(resultForCurrentMatchDay).toEqual(mockReturn);
            });

        });

    });
});