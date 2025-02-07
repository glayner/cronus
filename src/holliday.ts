import { MyDate } from "./myDate";
import { vacations } from "./vacations";

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
  const L =
    (32 + 2 * centuryMod4 + 2 * yearInCenturyDiv4 - h - yearInCenturyMod4) % 7;
  const m = Math.floor((yearInMetonicCycle + 11 * h + 22 * L) / 451);
  const month = Math.floor((h + L - 7 * m + 114) / 31);
  const day = ((h + L - 7 * m + 114) % 31) + 1;

  return {
    easterDate: new MyDate().year(year).month(month).day(day),
    easterDay: day,
    easterMonth: month,
  };
}

function getHolidaysBr(y: number): IHolliday[] {
  const { easterDate } = calculateEaster(y);

  var anoNovo = new MyDate().month(1).day(1);
  var carnaval1 = new MyDate(easterDate).subDays(48);
  var carnaval2 = new MyDate(easterDate).subDays(47);
  var paixaoCristo = new MyDate(easterDate).subDays(2);
  var pascoa = easterDate;
  var tiradentes = new MyDate().month(4).day(21);
  var corpusChristi = new MyDate(easterDate).addDays(60);
  var diaTrabalho = new MyDate().month(5).day(1);
  var diaIndependencia = new MyDate().month(9).day(7);
  var nossaSenhora = new MyDate().month(10).day(12);
  var finados = new MyDate().month(11).day(2);
  var proclamaRepublica = new MyDate().month(11).day(15);
  var concienciaNegra = new MyDate().month(11).day(20);
  var diaEvangelico = new MyDate().month(11).day(30);
  var natal = new MyDate().month(12).day(25);
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
    {
      m: tiradentes,
      dia: "Tiradentes",
      d: tiradentes.toLocaleDateString("pt-BR"),
    },
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
      m: concienciaNegra,
      dia: "Dia Nacional da Consciência Negra",
      d: concienciaNegra.toLocaleDateString("pt-BR"),
    },
    {
      m: diaEvangelico,
      dia: "Dia do Evangélico (DF)",
      d: diaEvangelico.toLocaleDateString("pt-BR"),
    },
    { m: natal, dia: "Natal", d: natal.toLocaleDateString("pt-BR") },
  ];
}

export function isHolliday() {
  const today = new MyDate();
  const year = today.getFullYear();
  const hollidays = getHolidaysBr(year);
  const isHolliday = hollidays.find(
    (day) => day.d === today.toLocaleDateString("pt-BR")
  );
  return isHolliday;
}

const getVacations = () => {
  return vacations.map((v) => {
    const [startDay, startMonth, startYear] = v.start.split("/");
    const [endDay, endMonth, endYear] = v.end.split("/");
    return {
      start: new MyDate()
        .day(+startDay)
        .month(+startMonth)
        .year(+startYear)
        .startOfDay(),
      end: new MyDate().day(+endDay).month(+endMonth).year(+endYear).endOfDay(),
    };
  });
};

export function isVacation() {
  let isVacation = false;
  if (vacations[0]) {
    const myVacations = getVacations();

    myVacations.forEach((v) => {
      if (new MyDate().isBetween(v.start, v.end)) isVacation = true;
    });
    console.log(vacations, isVacation);
  }
  return isVacation;
}
