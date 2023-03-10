interface MapOfValues {
    [key: string]: any
}

export type CalculationFunction = (a:MapOfValues, utils:Object)=>any
