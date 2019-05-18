import { Goal } from './goal';
import { Group } from './group';
import { MatchResult } from './matchresult';
import { Team } from './team';

export class Match {
  public matchId: number;
  public matchDateTime: Date;
  public leagueId: number;
  public leagueName: string;
  public group: Group;
  public team1: Team;
  public team2: Team;
  public lastUpdated: Date;
  public isMatchFinished: boolean;
  public matchResults: MatchResult[];
  public goals: Goal[];
  public location: string;
  public numberOfViewers: number;
}
