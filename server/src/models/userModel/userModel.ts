import mongoose from "mongoose";
import { IUserModel } from "./interfaceIUserModel";

const UserModelSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minlength: 2,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  },
  userPassword: {
    type: String,
    required: true,
    minlength: 8,
  },

  userTournaments: {
    yugiohTournament: [
      {
        tournamentDate: Number,
        tournamentPlacement: Number,
        earnedCredits: Number,
      },
    ],
    magicTheGatheringTournament: [
      {
        tournamentDate: Number,
        tournamentPlacement: Number,
        earnedCredits: Number,
      },
    ],
    PokemonTournament: [
      {
        tournamentDate: Number,
        tournamentPlacement: Number,
        earnedCredits: Number,
      },
    ],
  },
  userExchanges: [
    {
      product: String,
      valueInCredits: Number,
      exchangeDate: Number,
    },
  ],
});

const User = mongoose.model<IUserModel>("User", UserModelSchema);
export default User;
