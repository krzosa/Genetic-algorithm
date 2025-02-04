import ExtremeType from "../../enum/ExtremeType";
import Selection from "./Selection"

export default class RouletteWhell implements Selection {


    private extreme: ExtremeType

    constructor(extreme: ExtremeType){
        this.extreme = extreme;
    }

    setExtremeType(extreme: ExtremeType) {
        this.extreme = extreme
    }
    
    selectBest(evaluatedIndividuals: number[]): number[][] {
        let individuals = this.changeIndiviudal(evaluatedIndividuals)
        let sum = individuals.reduce((sum, num)=>sum+num, 0)
        let probabilites = individuals.map(it=>it/sum)
        let distributors = this.calculateDistributors(probabilites)
        let best = [[], []]
        for(let i = 0; i<evaluatedIndividuals.length; i++) {
            let p = Math.random()
            for(let j = 0; j<distributors.length; j++) {
                if(p<distributors[j]){
                    best[0].push(evaluatedIndividuals[j])
                    best[1].push(j)
                    break
                }
            }
        }
        return best
    }


    private changeIndiviudal(evaluatedIndividuals: number[]): number[]{
        switch(this.extreme) {
            case ExtremeType.MIN:
                return evaluatedIndividuals.map((it)=>1/it)
            case ExtremeType.MAX:
                return evaluatedIndividuals  
        }
    }

    private calculateDistributors(probabilites: number[]) {
        let distributors = []
        let distributor = 0
        for(let i = 0; i< probabilites.length; i++) {
            distributor += probabilites[i]
            distributors.push(distributor)
        }
        return distributors;
    }
}
