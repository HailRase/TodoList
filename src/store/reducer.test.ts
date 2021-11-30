import {ActionType, calculator, sum} from "./reducer";


test("sum", () => {
    //1. Тестовые данные
    const num1 = 10
    const num2 = 12
    //2. Выполнение тестируемого кода
    const result = sum(num1,num2)
    //3. Сравнение с ожидаемм результатом
    expect(result).toBe(22)

})
test("sum of calculator", () => {
    //1. Тестовые данные
    const num1 = 120
    const num2 = 12
    //2. Выполнение тестируемого кода
    const actionSum: ActionType = {type:"SUM",number: num2}
    const resultSum = calculator(num1, actionSum)
    const actionMult: ActionType = {type:"MULT",number: num2}
    const resultMult = calculator(num1, actionMult)
    const actionSub: ActionType = {type:"SUB",number: num2}
    const resultSub = calculator(num1, actionSub)
    const actionDiv: ActionType = {type:"DIV",number: num2}
    const resultDiv = calculator(num1, actionDiv)
    const actionExp: ActionType = {type:"EXP",number: num2}
    const resultExp = calculator(num1, actionExp)
    //3. Сравнение с ожидаемм результатом
    expect(resultSum).toBe(132)
    expect(resultMult).toBe(1440)
    expect(resultSub).toBe(108)
    expect(resultDiv).toBe(10)
    expect(resultExp).toBe(8.916100448256e+24)

})