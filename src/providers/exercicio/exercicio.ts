export class ExercicioProvider {

  public video: string;
  public nome: string;
  public musculo: string;
  public reps: string;
  public series: string;
  public carga: string;

  constructor() {
    this.reps = "";
    this.series = "";
    this.carga = "";
  }

  organizaSaida(v: any[]) {
    let saida = [];
    v.forEach((item) => {
      if(saida.some((i) => i.musculo === item.musculo)) {
        saida.find((i) => i.musculo === item.musculo).exercicios.push(
          {
            nome: item.nome,
            reps: item.reps,
            series: item.series,
            carga: item.carga
          }
        )
      } else {
        saida.push({
          musculo: item.musculo,
          exercicios: [
            {
              nome: item.nome,
              reps: item.reps,
              series: item.series,
              carga: item.carga
            }
          ]
        })
      }
    })
    saida = saida.sort((a, b) => (a.musculo < b.musculo ? -1 : 1))
    return saida;
  }

}
