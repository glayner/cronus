import { MyDate } from "./myDate";
import {vacations} from './vacations'

interface IHolliday {
  m: MyDate;
  dia: string;
  d: string;
}

export function calculateEaster(year: number) {
  const yearInMetonicCycle = year % 19;
  const century = Math.floor(year / 100);
  const yearInCentury = year % 100;
  const centuryDiv4 = Math.floor(century / 4);
  const centuryMod4 = century % 4;
  const f = Math.floor((century + 8) / 25);
  const g = Math.floor((century - f + 1) / 3);
  const h = (19 * yearInMetonicCycle + century - centuryDiv4 - g + 15) % 30;
  const yearInCenturyDiv4 = Math.floor(yearInCentury / 4);
  const yearInCenturyMod4 = yearInCentury % 4;
  const L = (32 + 2 * centuryMod4 + 2 * yearInCenturyDiv4 - h - yearInCenturyMod4) % 7;
  const m = Math.floor((yearInMetonicCycle + 11 * h + 22 * L) / 451);
  const month = Math.floor((h + L - 7 * m + 114) / 31);
  const day = ((h + L - 7 * m + 114) % 31) + 1;

  return{ 
    easterDate: new MyDate().year(year).month(month).day(day),
    easterDay: day,
    easterMonth: month
  }
}

// export function calculateEaster(year: number) {
//   const yearInMetonicCycle = year % 19;
//   const century = Math.floor(year / 100);
//   const yearInCentury = year % 100;
//   const centuryDiv4 = Math.floor(century / 4);
//   const centuryMod4 = century % 4;
//   const f = Math.floor((century + 8) / 25);
//   const g = Math.floor((century - f + 1) / 3);
//   const h = (19 * yearInMetonicCycle + century - centuryDiv4 - g + 15) % 30;
//   const yearInCenturyDiv4 = Math.floor(yearInCentury / 4);
//   const yearInCenturyMod4 = yearInCentury % 4;
//   const L = (32 + 2 * centuryMod4 + 2 * yearInCenturyDiv4 - h - yearInCenturyMod4) % 7;
//   const m = Math.floor((yearInMetonicCycle + 11 * h + 22 * L) / 451);
//   const month = Math.floor((h + L - 7 * m + 114) / 31);
//   const day = ((h + L - 7 * m + 114) % 31) + 1;

//   return moment([year, month - 1, day])
// }

function getHolidaysBr(y: number): IHolliday[] {
  const {
    easterDate,easterDay,easterMonth
  } =  calculateEaster(y)
  
  var anoNovo = new MyDate().day(1).month(1);
  var carnaval1 = new MyDate().day(easterDay).month(easterMonth).subDays(48);
  var carnaval2 = new MyDate().day(easterDay).month(easterMonth).subDays(47);
  var paixaoCristo = new MyDate().day(easterDay).month(easterMonth).subDays(2);
  var pascoa = easterDate;
  var tiradentes = new MyDate().day(21).month(4);
  var corpusChristi = new MyDate().day(easterDay).month(easterMonth).addDays(60);
  var diaTrabalho = new MyDate().day(1).month(5);
  var diaIndependencia = new MyDate().day(7).month(9);
  var nossaSenhora = new MyDate().day(12).month(10);
  var finados = new MyDate().day(2).month(11);
  var proclamaRepublica = new MyDate().day(15).month(11);
  var diaEvangelico = new MyDate().day(30).month(11);
  var natal = new MyDate().day(25).month(12);
  return [
    { m: anoNovo, dia: "Ano Novo", d: anoNovo.toLocaleDateString("pt-BR") },
    { m: carnaval1, dia: "Carnaval", d: carnaval1.toLocaleDateString("pt-BR") },
    { m: carnaval2, dia: "Carnaval", d: carnaval2.toLocaleDateString("pt-BR") },
    {
      m: paixaoCristo,
      dia: "Paixão de Cristo",
      d: paixaoCristo.toLocaleDateString("pt-BR"),
    },
    { m: pascoa, dia: "Páscoa", d: pascoa.toLocaleDateString("pt-BR") },
    { m: tiradentes, dia: "Tiradentes", d: tiradentes.toLocaleDateString("pt-BR") },
    {
      m: corpusChristi,
      dia: "Corpus Christi",
      d: corpusChristi.toLocaleDateString("pt-BR"),
    },
    {
      m: diaTrabalho,
      dia: "Dia do Trabalho",
      d: diaTrabalho.toLocaleDateString("pt-BR"),
    },
    {
      m: diaIndependencia,
      dia: "Dia da Independência do Brasil",
      d: diaIndependencia.toLocaleDateString("pt-BR"),
    },
    {
      m: nossaSenhora,
      dia: "Nossa Senhora Aparecida",
      d: nossaSenhora.toLocaleDateString("pt-BR"),
    },
    { m: finados, dia: "Finados", d: finados.toLocaleDateString("pt-BR") },
    {
      m: proclamaRepublica,
      dia: "Proclamação da República",
      d: proclamaRepublica.toLocaleDateString("pt-BR"),
    },
    {
      m: diaEvangelico,
      dia: "Dia do Evangélico",
      d: diaEvangelico.toLocaleDateString("pt-BR"),
    },
    { m: natal, dia: "Natal", d: natal.toLocaleDateString("pt-BR") },
  ];
}

// function getHolidaysBr(y: number): IHolliday[] {
//   var anoNovo = moment("01/01/" + y, "DD/MM/YYYY");
//   var carnaval1 = calculateEaster(y).add(-48, "d");
//   var carnaval2 = calculateEaster(y).add(-47, "d");
//   var paixaoCristo = calculateEaster(y).add(-2, "d");
//   var pascoa = calculateEaster(y);
//   var tiradentes = moment("21/04/" + y, "DD/MM/YYYY");
//   var corpusChristi = calculateEaster(y).add(60, "d");
//   var diaTrabalho = moment("01/05/" + y, "DD/MM/YYYY");
//   var diaIndependencia = moment("07/09/" + y, "DD/MM/YYYY");
//   var nossaSenhora = moment("12/10/" + y, "DD/MM/YYYY");
//   var finados = moment("02/11/" + y, "DD/MM/YYYY");
//   var proclamaRepublica = moment("15/11/" + y, "DD/MM/YYYY");
//   var diaEvangelico = moment("30/11/" + y, "DD/MM/YYYY");
//   var natal = moment("25/12/" + y, "DD/MM/YYYY");
//   return [
//     { m: anoNovo, dia: "Ano Novo", d: anoNovo.format("DD/MM/YYYY") },
//     { m: carnaval1, dia: "Carnaval", d: carnaval1.format("DD/MM/YYYY") },
//     { m: carnaval2, dia: "Carnaval", d: carnaval2.format("DD/MM/YYYY") },
//     {
//       m: paixaoCristo,
//       dia: "Paixão de Cristo",
//       d: paixaoCristo.format("DD/MM/YYYY"),
//     },
//     { m: pascoa, dia: "Páscoa", d: pascoa.format("DD/MM/YYYY") },
//     { m: tiradentes, dia: "Tiradentes", d: tiradentes.format("DD/MM/YYYY") },
//     {
//       m: corpusChristi,
//       dia: "Corpus Christi",
//       d: corpusChristi.format("DD/MM/YYYY"),
//     },
//     {
//       m: diaTrabalho,
//       dia: "Dia do Trabalho",
//       d: diaTrabalho.format("DD/MM/YYYY"),
//     },
//     {
//       m: diaIndependencia,
//       dia: "Dia da Independência do Brasil",
//       d: diaIndependencia.format("DD/MM/YYYY"),
//     },
//     {
//       m: nossaSenhora,
//       dia: "Nossa Senhora Aparecida",
//       d: nossaSenhora.format("DD/MM/YYYY"),
//     },
//     { m: finados, dia: "Finados", d: finados.format("DD/MM/YYYY") },
//     {
//       m: proclamaRepublica,
//       dia: "Proclamação da República",
//       d: proclamaRepublica.format("DD/MM/YYYY"),
//     },
//     {
//       m: diaEvangelico,
//       dia: "Dia do Evangélico",
//       d: diaEvangelico.format("DD/MM/YYYY"),
//     },
//     { m: natal, dia: "Natal", d: natal.format("DD/MM/YYYY") },
//   ];
// }


export function isHolliday() {
  const today = new MyDate()
  const year = today.getFullYear()
  const hollidays = getHolidaysBr(year);
  const isHolliday = hollidays.find(day => day.d === today.toLocaleDateString('pt-BR'))
  return isHolliday
}

const getVacations = () => {
  return vacations.map(v => {
    const [startDay, startMonth, startYear] = v.start.split('/')
    const [endDay, endMonth, endYear] = v.end.split('/')
    return {
      start: new MyDate().day(+startDay).month(+startMonth).year(+startYear).startOfDay(),
      end: new MyDate().day(+endDay).month(+endMonth).year(+endYear).endOfDay()
    }
  })
}

export function isVacation() {
  let isVacation = false;

  const myVacations = getVacations()

  myVacations.forEach(v => {
    if (new MyDate().isBetween(v.start, v.end)) isVacation = true
  })
  console.log(vacations, isVacation)
  return isVacation
}