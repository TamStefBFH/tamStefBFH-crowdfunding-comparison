  export const checkForm = (params: any) => {
        // check if all attributes are set
        const allAttributesSet = params.every((param: { criteria: string; weight: number; }) => param.criteria !== '' && param.weight !== undefined);
        const correctType = params.every((param: { weight: string; }) => !isNaN(Number(param.weight)));
        const correctSumOfWeights = params.reduce((sum: number, param: { weight: string; }) => sum + Number(param.weight), 0) == 100;
        const doubleCriteria = !params.every((param: { criteria: string; }) => params.filter((p: { criteria: string; }) => p.criteria === param.criteria).length === 1);

        // check if form is correct and give specific error messages
        if (allAttributesSet && correctType && correctSumOfWeights && !doubleCriteria)  {
        console.log('All attributes are set - Calculating...');
        } else if (!allAttributesSet) {
        return ('Some attributes are not set - Please check your input');
        } else if (!correctType) {
        return ('Some attributes are not numbers - Please check your input');
        } else if (!correctSumOfWeights) {
        return ('Sum of weights is not 100% - Please check your input');
        } else if (doubleCriteria) {
        return ('Some criteria are double - Please check your input');
        }

        return allAttributesSet && correctType && correctSumOfWeights && !doubleCriteria;
    };

    export const calculateUtilityAnalysis = (params:any, crowdfundingProviderData: any) =>{   
        crowdfundingProviderData.map((provider: any, index: number) => {
          const scoreReach = (provider.reach / 100) * Number(params.find((param: { criteria: string; }) => param.criteria === 'reach')?.weight);
          const scoreCosts = (provider.cost / 100) * Number(params.find((param: { criteria: string; }) => param.criteria === 'cost')?.weight);
          const scoreTrustworthiness = (provider.trustworthiness / 100) * Number(params.find((param: { criteria: string; }) => param.criteria === 'trustworthiness')?.weight);  
                  
          // add new attriute score to provider
          provider.score = Number(scoreReach + scoreCosts + scoreTrustworthiness).toFixed(2);
        });

      return crowdfundingProviderData;
    };



