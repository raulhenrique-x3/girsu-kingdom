export interface IUserModel {
  userName: string;
  userEmail: string;
  userPassword: string;

  userCredits: {
    yugiohCredits: number;
    pokemonCredits: number;
    magicTheGatheringCredits: number;
  };

  userTournaments: {
    yugiohTournament: [
      {
        tournamentDate: number;
        tournamentPlacement: number;
        earnedCredits: number;
      }
    ];
    magicTheGatheringTournament: [
      {
        tournamentDate: number;
        tournamentPlacement: number;
        earnedCredits: number;
      }
    ];
    PokemonTournament: [
      {
        tournamentDate: number;
        tournamentPlacement: number;
        earnedCredits: number;
      }
    ];
  };

  userExchanges: [
    {
      product: string;
      valueInCredits: number;
      exchangeDate: number;
    }
  ];
}
