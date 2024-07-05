import { Config } from "./Config";


export const CustomerRewardCalculator = (amount) => {

    let rewardPoints = 0;
    let {OVER100, BTW50_100} = Config

    if(amount > OVER100){
        rewardPoints = ((amount - OVER100) * 2 ) + (BTW50_100 * 1);
    }else if(amount > BTW50_100){
        rewardPoints = (amount - BTW50_100) * 1
    }
    return rewardPoints;
}

export default CustomerRewardCalculator