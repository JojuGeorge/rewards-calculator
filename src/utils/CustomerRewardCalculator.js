import { Config } from "./Config";
import { logger } from "../logger";

// Calculates the Reward points based on the amount of purchase and returns it
export const CustomerRewardCalculator = (amount) => {

    let rewardPoints = 0;
    let {OVER100, BTW50_100} = Config

    // If amount > 100 then ((amount - 100) * 2 ) + 50 * 1
    if(amount > OVER100){
        rewardPoints = ((amount - OVER100) * 2 ) + (BTW50_100 * 1);

    // If amount between 50 and 100 then amount - 50 will be the reward points
    }else if(amount > BTW50_100){
        rewardPoints = (amount - BTW50_100) * 1

    }
    logger.log(`Reward points for amount ${amount} : ${rewardPoints}`)
    return rewardPoints;
}

export default CustomerRewardCalculator